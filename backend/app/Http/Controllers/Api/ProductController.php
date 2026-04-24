<?php

namespace App\Http\Controllers\Api;
use App\Interfaces\ProductRepositoryInterface;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
     private $repo;

    public function __construct(ProductRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }
     public function index(Request $request)
    {
        return $this->repo->getFilteredProducts($request->all());
    }
}
