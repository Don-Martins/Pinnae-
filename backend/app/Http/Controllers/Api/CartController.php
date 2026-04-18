<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bundle;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Get the authenticated user's cart.
     */
    public function index(Request $request)
    {
        $cart = $request->user()->cart()->with('items.product')->firstOrCreate([
            'user_id' => $request->user()->id
        ]);

        return response()->json([
            'cart' => $cart,
            'total' => $cart->total
        ]);
    }

    /**
     * Add a single product to the cart.
     */
    public function addProduct(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1'
        ]);

        $cart = $request->user()->cart()->firstOrCreate(['user_id' => $request->user()->id]);
        
        $item = $cart->items()->where('product_id', $request->product_id)->first();

        if ($item) {
            $item->update(['quantity' => $item->quantity + ($request->quantity ?? 1)]);
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity ?? 1
            ]);
        }

        return $this->index($request); // Return fresh cart state
    }

    /**
     * Add an entire bundle to the cart (Core Logic).
     */
    public function addBundle(Request $request)
    {
        $request->validate([
            'bundle_id' => 'required|exists:bundles,id'
        ]);

        $bundle = Bundle::with('products')->find($request->bundle_id);
        $cart = $request->user()->cart()->firstOrCreate(['user_id' => $request->user()->id]);

        foreach ($bundle->products as $product) {
            $item = $cart->items()->where('product_id', $product->id)->first();
            
            if ($item) {
                $item->increment('quantity');
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'quantity' => 1
                ]);
            }
        }

        return response()->json([
            'message' => "Successfully added '{$bundle->name}' components to your cart.",
            'cart' => $cart->load('items.product'),
            'total' => $cart->total
        ]);
    }

    /**
     * Update item quantity in cart.
     */
    public function updateQuantity(Request $request, $itemId)
    {
        $request->validate(['quantity' => 'required|integer|min:1']);
        
        $item = CartItem::whereHas('cart', function($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($itemId);

        $item->update(['quantity' => $request->quantity]);

        return $this->index($request);
    }

    /**
     * Remove item from cart.
     */
    public function removeProduct(Request $request, $itemId)
    {
        $item = CartItem::whereHas('cart', function($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->findOrFail($itemId);

        $item->delete();

        return $this->index($request);
    }

    /**
     * Clear the cart.
     */
    public function clear(Request $request)
    {
        $cart = $request->user()->cart;
        if ($cart) {
            $cart->items()->delete();
        }
        return response()->json(['message' => 'Cart cleared']);
    }
}
