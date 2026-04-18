<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Get checkout summary (Cart items + total).
     */
    public function checkoutSummary(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        return response()->json([
            'items' => $cart->items,
            'subtotal' => $cart->total,
            'shipping' => $cart->total > 100 ? 0 : 15.00, // Example logic
            'total' => $cart->total > 100 ? $cart->total : $cart->total + 15.00
        ]);
    }

    /**
     * Create a new order from the cart (Checkout).
     */
    public function checkout(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        return DB::transaction(function () use ($user, $cart) {
            // Create the Order
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $cart->total,
                'status' => 'pending',
                'payment_reference' => 'TXN-' . strtoupper(\Illuminate\Support\Str::random(10)), // Temp reference
                'shipping_address' => $request->shipping_address ?? 'User Primary Address'
            ]);

            // Create Order Items (Price Snapshot)
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price_at_purchase' => $item->product->price
                ]);
            }

            // After Checkout: Clear the cart
            $cart->items()->delete();

            return response()->json([
                'message' => 'Order created successfully. Please proceed to payment.',
                'order' => $order->load('items.product')
            ], 201);
        });
    }

    /**
     * Get all orders for the authenticated user.
     */
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('items.product')->latest()->get();
        return response()->json($orders);
    }

    /**
     * Get a specific order details.
     */
    public function show(Request $request, $id)
    {
        $order = $request->user()->orders()->with('items.product')->findOrFail($id);
        return response()->json($order);
    }
}
