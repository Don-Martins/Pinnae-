<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SellerController extends Controller
{
    /**
     * Get seller's store profile or create it if it doesn't exist.
     */
    private function getOrCreateSellerProfile($user)
    {
        return \App\Models\Seller::firstOrCreate(
            ['user_id' => $user->id],
            [
                'store_name' => $user->name . "'s Tech Hub",
                'bio' => 'Professional tech components vendor on Pinnacle Tech Market.',
                'is_verified' => false
            ]
        );
    }

    /**
     * Get seller-specific dashboard stats.
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $this->getOrCreateSellerProfile($user); // Ensure profile exists
        
        $userId = $user->id;
        
        return response()->json([
            'my_products_count' => Product::where('user_id', $userId)->count(),
            'my_sales_count' => Order::whereHas('items.product', function($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'paid')->count(),
            'my_revenue' => Order::whereHas('items.product', function($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'paid')->sum('total_amount'),
            'recent_orders' => $this->getOrdersQuery($userId)->take(3)->get()
        ]);
    }

    /**
     * Get seller store profile.
     */
    public function profile(Request $request)
    {
        return response()->json($this->getOrCreateSellerProfile($request->user()));
    }

    /**
     * Update seller store profile.
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'store_name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'payout_info' => 'nullable|string'
        ]);

        $seller = $this->getOrCreateSellerProfile($request->user());
        $seller->update($request->only('store_name', 'bio', 'payout_info'));

        return response()->json([
            'message' => 'Profile updated successfully',
            'seller' => $seller
        ]);
    }

    /**
     * Manage seller's own products.
     */
    public function products(Request $request)
    {
        return response()->json(Product::where('user_id', $request->user()->id)->latest()->get());
    }

    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'required|string',
            'image_url' => 'nullable|url'
        ]);

        $product = Product::create($validated + [
            'slug' => Str::slug($request->name) . '-' . uniqid(),
            'user_id' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'Product listed successfully',
            'product' => $product
        ], 201);
    }

    public function updateProduct(Request $request, $id)
    {
        $product = Product::where('user_id', $request->user()->id)->findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'category_id' => 'sometimes|exists:categories,id',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'description' => 'sometimes|string',
            'image_url' => 'nullable|url'
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . uniqid();
        }

        $product->update($validated);
        
        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    /**
     * View orders containing seller's products.
     */
    public function orders(Request $request)
    {
        $orders = $this->getOrdersQuery($request->user()->id)->get();
        return response()->json($orders);
    }

    private function getOrdersQuery($userId)
    {
        return Order::whereHas('items.product', function($q) use ($userId) {
            $q->where('user_id', $userId);
        })->with(['items' => function($q) use ($userId) {
            $q->whereHas('product', function($p) use ($userId) {
                $p->where('user_id', $userId);
            })->with('product');
        }, 'user'])->latest();
    }
}
