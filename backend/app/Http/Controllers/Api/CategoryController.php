<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of all categories.
     */
    public function index()
    {
        $categories = Category::withCount('products')->get();
        return response()->json($categories);
    }

    /**
     * Display products for a specific category.
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $products = $category->products()->latest()->paginate(12);
        
        return response()->json([
            'category' => $category,
            'products' => $products
        ]);
    }
}
