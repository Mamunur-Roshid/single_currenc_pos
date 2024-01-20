<?php
namespace App\Repositories;

use App\Models\CurrentInventory;
use App\Models\DamageDetail;
use stdClass;
use Exception;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseDetail;
use App\Models\PurchaseReturndetail;
use App\Models\SaleDetail;
use App\Models\SaleReturndetail;
use Illuminate\Support\Facades\DB;

class ProductRepository 
{
    public function Get($arg = [])
    {
        $product = Product::with(['category', 'brand', 'unit'])->where('branch_id', app('branchId'));

        if(isset($arg['id'])) {
            $product = $product->where('id', $arg['id']);
        }
        
        if(isset($arg['brandId'])) {
            $product = $product->where('brand_id', $arg['brandId']);
        }

        if(isset($arg['categoryId'])) {
            $product = $product->where('category_id', $arg['categoryId']);
        }

        if(isset($arg['price'])) {
            $product = $product->whereBetween('sale_rate', $arg['price']);
        }

        return $product->get();
    }

    public function GetById($id)
    {
        return Product::where('id', $id)->first();
    }

    public function Insert(Product $product)
    {
        $res = new stdClass();

        try {
            $branchId = app('branchId');
            
            $validation = $this->ValidateProduct($product);
            if(strlen($validation) != 0) {
                $res->code = 406;
                $res->message = $validation;
                return $res;
            }

            $duplicateName = Product::where('name', $product->name)->where('branch_id', $branchId)->first();
            if($duplicateName) {
                $res->code = 409;
                $res->message = $duplicateName->name . " already exists";
                return $res;
            } 

            $duplicateProduct = Product::where('code', $product->code)->first();
            if($duplicateProduct) {
                $product->code = $this->GenerateProductCode();
            }

            $product->branch_id = $branchId;
            $product->added_by = app('userId');
            $product->save();

            $res->code = 200;
            $res->message = "Saved successfully";
        } catch(Exception $ex) {
            $res->code = $ex->getCode();
            $res->message = $ex->getMessage();
        }

        return $res;
    }

    public function Update(Product $product)
    {
        $res = new stdClass();

        try {
            $branchId = app('branchId');
            
            $validation = $this->ValidateProduct($product);
            if(strlen($validation) != 0) {
                $res->code = 406;
                $res->message = $validation;
                return $res;
            }

            $duplicateName = Product::where('name', $product->name)->where('id', '!=', $product->id)->where('branch_id', $branchId)->first();
            if($duplicateName) {
                $res->code = 409;
                $res->message = $duplicateName->name . " already exists";
                return $res;
            } 

            $duplicateProduct = Product::where('code', $product->code)->where('id', '!=', $product->id)->first();
            if($duplicateProduct) {
                $product->code = $this->GenerateProductCode();
            }

            $product->branch_id = $branchId;
            $product->updated_by = app('userId');
            $product->save();

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
            $countPurchase = PurchaseDetail::where('product_id', $id)->where('status', 'a')->count();
            if($countPurchase > 0) {
                $res->code = 451;
                $res->message = "Unable to delete. Already purchase found";
                return $res;
            }

            $countPurReturn = PurchaseReturndetail::where('product_id', $id)->where('status', 'a')->count();
            if($countPurReturn > 0) {
                $res->code = 451;
                $res->message = "Unable to delete. Already purchase return found";
                return $res;
            }

            $countSale = PurchaseDetail::where('product_id', $id)->where('status', 'a')->count();
            if($countSale > 0) {
                $res->code = 451;
                $res->message = "Unable to delete. Already sale found";
                return $res;
            }

            $countSaleReturn = SaleReturndetail::where('product_id', $id)->where('status', 'a')->count();
            if($countSaleReturn > 0) {
                $res->code = 451;
                $res->message = "Unable to delete. Already sale return found";
                return $res;
            }

            $product = $this->GetById($id);
            $product->delete();

            $res->code = 200;
            $res->message = "Deleted successfully";
        } catch(Exception $ex) {
            $res->code = $ex->getCode();
            $res->message = $ex->getMessage();
        }

        return $res;
    }

    public function GenerateProductCode()
    {
        $product = Product::orderBy('id', 'desc');
        $productId = ($product->count() == 0 ? 0 : $product->first()->id) + 1;
        $zeros = 5 - strlen($productId);
        $newProductCode = "P";
        for($i = 1; $i <= $zeros; $i++) $newProductCode .= '0';
        $newProductCode .= $productId;
        return $newProductCode;
    }

    public function lowStockProducts($arg = []) {
        $branchId = app('branchId');
        $query = Product::query();
        if(isset($arg['id'])) {
            $query->where('id', $arg['id']);
        }
        
        if(isset($arg['brandId'])) {
            $query->where('brand_id', $arg['brandId']);
        }

        if(isset($arg['categoryId'])) {
            $query->where('category_id', $arg['categoryId']);
        }

        if(isset($arg['price'])) {
            $query->whereBetween('sale_rate', $arg['price']);
        }
        $product = CurrentInventory::whereIn('product_id', $query->pluck('id'))->with(['product', 'product.category', 'product.brand'])->where('branch_id', $branchId);

        $product = $product->get()->map(function($item) {
            $item->current_quantity = ($item->purchase_quantity + $item->sale_return + $item->transfer_to_quantity) - ($item->purchase_return + $item->sale_quantity + $item->transfer_from_quantity + $item->damage_quantity);
            $item->stock_value = $item->current_quantity * $item->product->purchase_rate;
            return $item;
        })->filter(function($item) {
            if ($item->product->low_stock_qty == null) {
                return false;
            }
            if ($item->current_quantity <= $item->product->low_stock_qty) {
                return $item;
            }
            return false;
        });
        $pdt = [];
        foreach (collect($product) as $item) {
            $pdt[] = $item;
        }
        return $pdt;
    }

    public function ValidateProduct(Product $product)
    {
        if($product->name == '') return 'Name is required';
        
        if($product->category_id  == '') return 'Category is required';
       
        if($product->brand_id  == '') return 'Brand is required';
        
        if($product->unit_id  == '') return 'Unit is required';
        
        if($product->purchase_rate  == '' || $product->purchase_rate == 0) return 'Purchase rate is required';
        
        if($product->sale_rate  == '' || $product->sale_rate == 0) return 'Sale rate is required';
        
        return '';
    }

    public function GetCurrentStock($arg = [])
    {
        $branchId = app('branchId');
        $product = CurrentInventory::with(['product', 'product.category', 'product.brand'])->where('branch_id', $branchId);

        if(isset($arg['productId'])) {
            $product = $product->where('product_id', $arg['productId']);
        }

        $product = $product->get()->map(function($item) {
            if ($item->product) {
                $item->current_quantity = ($item->purchase_quantity + $item->sale_return + $item->transfer_to_quantity) - ($item->purchase_return + $item->sale_quantity + $item->transfer_from_quantity + $item->damage_quantity);
                $item->stock_value = $item->current_quantity * $item->product->purchase_rate;
                return $item;
            }
        })->filter()->toArray();

        return $product;
    }

    public function GetTotalStock($arg = []) {
        $branchId = app('branchId');
        $product = Product::with(['category', 'brand', 'unit'])->where('branch_id', $branchId);

        $product = $product->addSelect([
            'purchase_quantity' => PurchaseDetail::selectRaw('ifnull(ifnull(sum(quantity), 0), 0)')
            ->whereColumn('product_id', 'products.id'),

            'purchaes_return' => PurchaseReturndetail::selectRaw('ifnull(sum(quantity), 0)')
            ->whereColumn('product_id', 'products.id'),

            'sale_quantity' => SaleDetail::selectRaw('ifnull(sum(quantity), 0)')
            ->whereColumn('product_id', 'products.id'),

            'sale_return' => SaleReturndetail::selectRaw('ifnull(sum(quantity), 0)')
            ->whereColumn('product_id', 'products.id'),

            'damage_quantity' => DamageDetail::selectRaw('ifnull(sum(quantity), 0)')
            ->whereColumn('product_id', 'products.id')
        ]);

        if(isset($arg['productId'])) {
            $product = $product->where('id', $arg['productId']);
        }
        if(isset($arg['categoryId'])) {
            $product = $product->where('category_id', $arg['categoryId']);
        }
        if(isset($arg['brandId'])) {
            $product = $product->where('brand_id', $arg['brandId']);
        }

        $product = $product->get()->map(function($item) {
            $item->current_quantity = ($item->purchase_quantity + $item->sale_return) - ($item->purchaes_return + $item->sale_quantity + $item->damage_quantity);
            $item->stock_value = $item->current_quantity * $item->purchase_rate;
            return $item;
        });
        return $product;
    }

    public function Ledger($arg = [])
    {
        $res = new stdClass;
        $branchId = app('branchId');

        $sale = DB::table('sale_details as sd')
                    ->selectRaw("
                        'b' as sequence,
                        sm.created_at,
                        sm.date,
                        concat('Sales - ', sm.invoice, ' - ', c.name) as description,
                        sd.sale_rate as rate,
                        0 as in_quantity,
                        sd.quantity as out_quantity
                    ")
                    ->join('sales as sm', 'sm.id', '=', 'sd.sale_id')
                    ->join('customers as c', 'c.id', '=', 'sm.customer_id')
                    ->where('sd.status', 'a')
                    ->where('sd.product_id', $arg['productId'])
                    ->whereNull('sd.deleted_at')
                    ->where('sd.branch_id', $branchId);
        
        $purReturn = DB::table('purchase_returndetails as prd')
                        ->selectRaw("
                            'c' as sequence,
                            pr.created_at,
                            pr.date,
                            concat('Purchase return -', pr.invoice) as description,
                            (prd.return_amount / prd.quantity)as rate,
                            0 as in_quantity,
                            prd.quantity as out_quantity
                         ")
                        ->join('purchase_returns as pr', 'pr.id', '=', 'prd.purchase_return_id')
                        ->where('prd.status', 'a')
                        ->whereNull('prd.deleted_at')
                        ->where('prd.product_id', $arg['productId'])
                        ->where('prd.branch_id', $branchId);

        $saleReturn = DB::table('sale_returndetails as srd')
                       ->selectRaw("
                            'd' as sequence,
                            sr.created_at,
                            sr.date, 
                            concat('Sales return -', sr.invoice) as description,
                            (srd.return_amount / srd.quantity)as rate,
                            srd.quantity as in_quantity,
                            0 as out_quantity
                       ")
                       ->join('sale_returns as sr', 'sr.id', '=', 'srd.sale_return_id')
                       ->where('srd.status', 'a')
                       ->whereNull('srd.deleted_at')
                       ->where('srd.product_id', $arg['productId'])
                       ->where('srd.branch_id', $branchId);
        
        $damage = DB::table('damage_details as dd')
                    ->selectRaw("
                        'e' as sequence,
                        d.created_at,
                        d.date,
                        concat('Damage -', d.invoice) as description,
                        dd.rate,
                        0 as in_quantity,
                        dd.quantity as out_quantity
                    ")
                    ->join('damages as d', 'd.id', '=', 'dd.damage_id')
                    ->where('dd.status', 'a')
                    ->whereNull('dd.deleted_at')
                    ->where('dd.product_id', $arg['productId'])
                    ->where('dd.branch_id', $branchId);

        $ledgers = DB::table('purchase_details as pd')
                    ->selectRaw("
                        'a' as sequence,
                        pm.created_at,
                        pm.date,
                        concat('Purchase -', pm.invoice, ' - ', suppliers.name) as description,
                        pd.purchase_rate as rate,
                        pd.quantity as in_quantity,
                        0 as out_quantity
                    ")
                    ->join('purchases as pm', 'pm.id' , '=', 'pd.purchase_id')
                    ->join('suppliers', 'suppliers.id' , '=', 'pm.supplier_id')
                    ->where('pd.status', 'a')
                    ->where('pd.product_id', $arg['productId'])
                    ->where('pd.branch_id', $branchId)
                    ->whereNull('pd.deleted_at')
                    ->union($sale)
                    ->union($purReturn)
                    ->union($saleReturn)
                    ->union($damage)
                    ->orderBy('created_at')
                    ->get()->toArray();
        
        $openingStock = 0;

        $ledgers = array_map(function($key, $ledger) use($ledgers) {
            $ledger->stock = $key == 0 ? $ledger->in_quantity - $ledger->out_quantity : $ledgers[$key - 1]->stock + ($ledger->in_quantity - $ledger->out_quantity);
            return $ledger;
        }, array_keys($ledgers), $ledgers);


        if(isset($arg['dateFrom']) && isset($arg['dateTo'])) {
            $previousStock = array_filter($ledgers, function($ledger) use ($arg){
                return $ledger->date < $arg['dateFrom'];
            });
            $previousStock = (object) $previousStock;

            $openingStock = (count((array)$previousStock) > 0) ? (empty($previousStock) ? 0 : end($previousStock)->stock) : 0;
            
            $ledgers = array_filter($ledgers, function($ledger) use ($arg){
                return $ledger->date >= $arg['dateFrom'] && $ledger->date <= $arg['dateTo'];
            });
    
            $ledgers = array_values($ledgers);
        }

        // $res->ledgers = $ledgers;
        $res->ledgers = collect($ledgers)->map(function($item) {
            $item->date = date('d F Y', strtotime($item->date));
            return $item;
        });
        $res->openingStock = $openingStock;
        return $res;
    }
}
