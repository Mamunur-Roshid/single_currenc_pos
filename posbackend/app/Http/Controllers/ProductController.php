<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;

class ProductController extends Controller
{
    private $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function GetProducts(Request $req)
    {
        $products = $this->productRepo->Get($req->all());
        return response()->json(['products' => $products], 200);
    }

    public function AddProduct(Request $req)
    {
        
        $product = new Product();

        $productKeys = ['name', 'code', 'category_id', 'brand_id', 'unit_id', 'purchase_rate', 'sale_rate', 'wholesale_rate', 'low_stock_qty', 'barcode'];
        foreach($productKeys as $key) {
            $product->$key = $req->$key;
        }
        
        $res = $this->productRepo->Insert($product);
        return response()->json(['message' => $res->message], $res->code);
    }

    public function UpdateProduct(Request $req)
    {
        $product = $this->productRepo->GetById($req->id);

        $productKeys = ['name', 'code', 'category_id', 'brand_id', 'unit_id', 'purchase_rate', 'sale_rate', 'wholesale_rate', 'low_stock_qty', 'barcode'];
        foreach($productKeys as $key) {
            $product->$key = $req->$key;
        }
        
        $res = $this->productRepo->Update($product);
        return response()->json(['message' => $res->message], $res->code);
    }

    public function DeleteProduct($id)
    {
        $res = $this->productRepo->Delete($id);
        return response()->json(['message' => $res->message], $res->code);
    }

    public function GenerateProductCode()
    {
        $code = $this->productRepo->GenerateProductCode();
        return response()->json(['code' => $code], 200);
    }

    public function lowStockProducts(Request $request) {
        $products = $this->productRepo->lowStockProducts($request->all());
        return response()->json(['products' => $products], 200);

    }

    public function GetCurrentStock(Request $req)
    {
        $stock = $this->productRepo->GetCurrentStock($req->all());
        return response()->json(['stock' => $stock], 200);
    }

    public function GetTotalStock(Request $req)
    {
        $stock = $this->productRepo->GetTotalStock($req->all());
        return response()->json(['stock' => $stock], 200);
    }

    public function GetProductLeder(Request $req)
    {
        $res = $this->productRepo->Ledger($req->all());
        return response()->json(['ledgers'  => $res->ledgers, 'openingStock' => $res->openingStock], 200);
    }
}
