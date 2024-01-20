<?php
namespace App\Repositories;

use stdClass;
use Exception;
use App\Models\Sale;
use App\Models\Customer;
use App\Models\CustomerPayment;
use App\Models\CustomerType;
use App\Models\SaleReturn;
use Illuminate\Support\Facades\DB;

class CustomerRepository 
{
    public function Get($arg = [])
    {
        $customer = Customer::with(['area'])->where('type', '!=', 'G')->where('branch_id', app('branchId'));

        // $customer = Customer::where('branch_id', app('branchId'))->get();

        // foreach ($customer as $key => $cus) {
        //     $sales = Sale::where('customer_id', $cus->id)->get();
        //     foreach ($sales as $key => $srn) {
        //         $sale_return = SaleReturn::where('invoice', $srn->invoice)->first();
        //         if($sale_return) {
        //             $sale_return->update([
        //                 'customer_id' => $srn->customer_id,
        //             ]);
        //         }
        //     }
        // }
        // return view('index');
        // return response()->json(true);
        if(isset($arg['type'])) {
            $customer = $customer->where('type', $arg['type']);
        }

        return $customer->get();
    }

    public function GetById($id)
    {
        return Customer::where('id', $id)->where('branch_id', app('branchId'))->first();
    }

    public function GetCustomerDue($arg = [])
    {
        $customer = Customer::where('type', '!=', 'G')->where('branch_id', app('branchId'));

        $customer = $customer->addSelect([
            'sale_due' => Sale::selectRaw('sum(due)')
            ->whereColumn('customer_id', 'customers.id'),

            'customer_payment' => CustomerPayment::selectRaw('sum(amount)')
            ->whereColumn('customer_id', 'customers.id')
        ]);

        if(isset($arg['customerId'])) {
            $customer = $customer->where('id', $arg['customerId']);
        }

        $customer = $customer->get()
            ->map(function($customer){
                $customer->due = ($customer->sale_due - $customer->customer_payment) + $customer->opening_balance;
                return $customer;
            });
            
        return $customer;
    }

    public function Insert(Customer $customer)
    {
        $res = new stdClass();

        try {
            $branchId = app('branchId');
            
            $validation = $this->ValidateCustomer($customer);
            if(strlen($validation) != 0) {
                $res->code = 406;
                $res->message = $validation;
                return $res;
            }

            $duplicateMobile = Customer::where('phone', $customer->phone)->where('branch_id', $branchId)->first();
            if($duplicateMobile) {
                $res->code = 409;
                $res->message = $duplicateMobile->phone . " already exists";
                return $res;
            } 

            $duplicateCustomer = Customer::where('code', $customer->code)->first();
            if($duplicateCustomer) {
                $customer->code = $this->GenerateCustomerCode();
            }

            $customer->branch_id = $branchId;
            $customer->added_by = app('userId');
            $customer->save();

            $res->code = 200;
            $res->message = "Saved successfully";
        } catch(Exception $ex) {
            $res->code = 500;
            $res->message = $ex->getMessage();
        }

        return $res;
    }

    public function Update(Customer $customer)
    {
        $res = new stdClass();

        try {
            $branchId = app('branchId');
            
            $validation = $this->ValidateCustomer($customer);
            if(strlen($validation) != 0) {
                $res->code = 406;
                $res->message = $validation;
                return $res;
            }

            $duplicateMobile = Customer::where('phone', $customer->phone)->where('id', '!=', $customer->id)->where('branch_id', $branchId)->first();
            if($duplicateMobile) {
                $res->code = 409;
                $res->message = $duplicateMobile->phone . " already exists";
                return $res;
            } 

            $duplicateCustomer = Customer::where('code', $customer->code)->where('id', '!=', $customer->id)->first();
            if($duplicateCustomer) {
                $customer->code = $this->GenerateCustomerCode();
            }

            $customer->branch_id = $branchId;
            $customer->updated_by = app('userId');
            $customer->save();

            $res->code = 200;
            $res->message = "Updated successfully";
        } catch(Exception $ex) {
            $res->code = $ex->getCode();
            $res->message = $ex->getMessage();
        }

        return $res;
    }

    public function Delete($id)
    {
        $res = new stdClass();
        try {
            $customer = $this->GetById($id);
            $customer->delete();

            $res->code = 200;
            $res->message = "Deleted successfully";
        } catch(Exception $ex) {
            $res->code = $ex->getCode();
            $res->message = $ex->getMessage();
        }

        return $res;
    }

    public function GenerateCustomerCode()
    {
        $customer = Customer::withTrashed()->orderBy('id', 'desc');
        $customerId = ($customer->count() == 0 ? 0 : $customer->first()->id) + 1;
        $zeros = 5 - strlen($customerId);
        $newCustomerCode = "C";
        for($i = 1; $i <= $zeros; $i++) $newCustomerCode .= '0';
        $newCustomerCode .= $customerId;
        return $newCustomerCode;
    }

    public function GenerateCustomerPaymentCode()
    {
        $payment = CustomerPayment::withTrashed()->orderBy('id', 'desc');
        $paymentId = ($payment->count() == 0 ? 0 : $payment->first()->id) + 1;
        $zeros = 5 - strlen($paymentId);
        $newTnxCode = "TNXCP";
        for($i = 1; $i <= $zeros; $i++) $newTnxCode .= '0';
        $newTnxCode .= $paymentId;
        return $newTnxCode;
    }

    public function ValidateCustomer(Customer $customer)
    {
        if($customer->name == '') return 'Name is required';
        
        if($customer->area_id  == '') return 'Area is required';
        
        return '';
    }

    public function GetPayments($arg = [])
    {
        $payments = CustomerPayment::with(['customer', 'bank_account'])->where('branch_id', app('branchId'));

        if(isset($arg['dateFrom']) && isset($arg['dateTo'])) {
            $payments = $payments->whereBetween('date', [$arg['dateFrom'], $arg['dateTo']]);
        }

        if(isset($arg['customerId'])) {
            $payments = $payments->where('customer_id', $arg['customerId']);
        }
        
        $payments = $payments->latest()->get();
        return $payments;
    }

    public function GetByPaymentId($id)
    {
        return CustomerPayment::where('id', $id)->first();
    }

    public function InsertPayment(CustomerPayment $payment)
    {
        $res = new stdClass();
        try {
            $payment->invoice = $this->GenerateCustomerPaymentCode();
            $payment->branch_id = app('branchId');
            $payment->added_by = app('userId');

            $payment->save();

            $res->message = 'Customer payment insert successfully';
            $res->code = 200;
        } catch (\Exception $e) {
            $res->code = $e->getCode();
            $res->message = 'fail '.$e->getMessage();
        }

        return $res;
    }

    public function UpdatePayment(CustomerPayment $payment)
    {
        $res = new stdClass();
        try {
            $payment->branch_id = app('branchId');
            $payment->updated_by  = app('userId');

            $payment->save();

            $res->message = 'Customer payment update successfully';
            $res->code = 200;
        } catch (\Exception $e) {
            $res->code = $e->getCode();
            $res->message = 'fail '.$e->getMessage();
        }

        return $res;
    }

    public function DeletePayment($id)
    {
        $res = new stdClass();
        try {
            $payment = $this->GetByPaymentId($id);
            $payment->delete();

            $res->code = 200;
            $res->message = "Deleted successfully";
        } catch(Exception $ex) {
            $res->code = $ex->getCode();
            $res->message = $ex->getMessage();
        }

        return $res;
    }

    public function Ledger($arg = [])
    {
        $res = new stdClass;
        $branchId = app('branchId');
        $customer_opening = DB::table('customers')
                    ->selectRaw("
                        'b' as sequence,
                        updated_at,
                        created_at as date,
                        concat('Previous Due') as description,
                        opening_balance as bill,
                        0 as paid,
                        opening_balance as due,
                        0.00 as returned,
                        0 as balance
                    ")
                    ->where('id', $arg['customerId'])
                    ->whereNull('deleted_at')
                    ->where('branch_id', $branchId);

        // $payments = DB::table('customer_payments as cp')
        //             ->selectRaw("
        //                 'b' as sequence,
        //                 cp.created_at,
        //                 cp.date,
        //                 concat('Received -', cp.type, '-', cp.invoice) as description,
        //                 0.00 as bill,
        //                 cp.amount as paid,
        //                 0.00 as due,
        //                 0.00 as returned,
        //                 0.00 as balance
        //             ")
        //             ->where('cp.customer_id', $arg['customerId'])
        //             ->join('customers as ca', 'ca.id', '=', 'cp.customer_id')
        //             ->join('bank_accounts as ba', 'ba.id', '=', 'cp.account_id')
        //             ->whereNull('cp.deleted_at')
        //             ->where('cp.branch_id', $branchId);
        $payments = DB::table('customer_payments as cp')
                ->selectRaw("
                    'b' as sequence,
                    cp.created_at,
                    cp.date,
                    CONCAT(
                        'Received -', 
                        CASE
                            WHEN cp.type = 'Cash' THEN CONCAT('Cash', cp.invoice)
                            WHEN cp.type = 'Bank' THEN CONCAT(ba.bank_name, '-', ba.account_number, '-', cp.invoice)
                        END
                    ) as description,
                    0.00 as bill,
                    cp.amount as paid,
                    0.00 as due,
                    0.00 as returned,
                    0.00 as balance
                ")
                ->where('cp.customer_id', $arg['customerId'])
                ->join('customers as ca', 'ca.id', '=', 'cp.customer_id')
                ->leftJoin('bank_accounts as ba', function ($join) {
                    $join->on('ba.id', '=', 'cp.account_id')
                        ->where('cp.account_id', '!=', null);
                })
                ->whereNull('cp.deleted_at')
                ->where('cp.branch_id', $branchId);
                    
        $returns = DB::table('sale_returns as sr')
                    ->selectRaw("
                        'c' as sequence,
                        sr.created_at,
                        sr.date,
                        concat('Sale return -', sr.invoice) as description,
                        0.00 as bill,
                        0.00 as paid,
                        0.00 as due,
                        sr.total as returned,
                        0.00 as balance
                    ")
                    ->join('sales as s', 's.invoice', '=', 'sr.invoice')
                    ->join('customers as ca', 'ca.id', '=', 'sr.customer_id')
                    ->where('s.customer_id', $arg['customerId'])
                    ->whereNull('sr.deleted_at')
                    ->where('sr.branch_id', $branchId);
                   
        $ledgers = DB::table('sales as sas')
                    ->selectRaw("
                        'a' as sequence,
                        sas.created_at,
                        sas.date,
                        concat('Sales -', sas.invoice) as description,
                        sas.total as bill,
                        sas.paid,
                        sas.due,
                        0.00 as returned,
                        0.00 as balance
                    ")
                    ->join('customers as ca', 'ca.id', '=', 'sas.customer_id')
                    ->where('sas.customer_id', $arg['customerId'])
                    ->where('sas.branch_id', $branchId)
                    ->whereNull('sas.deleted_at')
                    // ->union($customer_opening)
                    ->union($payments)
                    ->union($returns)
                    ->orderBy('date')
                    ->get()->toArray();
        
        $previouDue = $customer_opening->first()->due;
        $openingBalance = $customer_opening->first()->due;
        $openingDue = $customer_opening->first()->due;

        $ledgers = array_map(function($key, $ledger) use($ledgers, $previouDue) {
            $lastBalance = $key == 0 ? $previouDue : $ledgers[$key - 1]->balance;
            $ledger->balance = ($lastBalance + $ledger->bill) - ($ledger->paid + $ledger->returned);
            $ledger->date = date('Y-m-d', strtotime($ledger->date));
            return $ledger;
        }, array_keys($ledgers), $ledgers);
        // $res->openingBalance = $openingBalance;
        // return $res;
        if(isset($arg['dateFrom']) && isset($arg['dateTo'])) {
            $previousBalance = array_filter($ledgers, function($ledger) use ($arg){
                return $ledger->date < $arg['dateFrom'];
            });
            $previousBalance = (object) $previousBalance;

            $openingBalance = (count((array)$previousBalance) > 0) ? (empty($previousBalance) ? 0 : end($previousBalance)->balance) : 0;
           
            $ledgers = array_filter($ledgers, function($ledger) use ($arg){
                return $ledger->date >= $arg['dateFrom'] && $ledger->date <= $arg['dateTo'];
            });
    
            $ledgers = array_values($ledgers);
        }

        // $res->ledgers = $ledgers;
        $res->ledgers = collect($ledgers)->map(function($item) {
            // $item->date = date('d F Y', strtotime($item->date));
            return $item;
        });
        $res->openingBalance = $openingBalance;
        $res->openingDue = (int)$openingDue;
        return $res;
    }

    public function GetTypes()
    {
        return CustomerType::where('branch_id', app('branchId'))->latest()->get();
    }

    public function GetByTypeId($id)
    {
        return CustomerType::where('id', $id)->where('branch_id', app('branchId'))->first();
    }

    public function InsertType(CustomerType $type)
    {
        $res = new stdClass();
        try {
            $type->branch_id = app('branchId');
            $type->added_by = app('userId');

            $type->save();

            $res->message = 'Customer type insert successfully';
            $res->code = 200;
        } catch (\Exception $e) {
            $res->code = $e->getCode();
            $res->message = 'fail '.$e->getMessage();
        }

        return $res;
    }

    public function UpdateType(CustomerType $type)
    {
        $res = new stdClass();
        try {
            $type->branch_id = app('branchId');
            $type->updated_by  = app('userId');

            $type->save();

            $res->message = 'Customer type update successfully';
            $res->code = 200;
        } catch (\Exception $e) {
            $res->code = $e->getCode();
            $res->message = 'fail '.$e->getMessage();
        }

        return $res;
    }

    public function DeleteType($id)
    {
        $res = new stdClass();
        try {
            $type = $this->GetByTypeId($id);
            $type->delete();

            $res->code = 200;
            $res->message = "Deleted successfully";
        } catch(Exception $e) {
            $res->code = $e->getCode();
            $res->message = $e->getMessage();
        }

        return $res;
    }
}
