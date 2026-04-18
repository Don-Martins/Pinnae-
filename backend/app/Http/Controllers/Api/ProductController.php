<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of products with filtering and search.
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'seller.user']);

        // Filter by Category
        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search by name or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        // Sorting
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_low': $query->orderBy('price', 'asc'); break;
                case 'price_high': $query->orderBy('price', 'desc'); break;
                case 'rating': $query->orderBy('rating', 'desc'); break;
                default: $query->latest();
            }
        } else {
            $query->latest();
        }

        return response()->json($query->paginate(12));
    }

    /**
     * Display the specified product.
     */
    public function show($slug)
    {
        $product = Product::with(['category', 'seller.user'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($product);
    }
}
