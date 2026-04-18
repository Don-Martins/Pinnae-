<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    /**
     * Initialize Paystack Payment.
     */
    public function initialize(Request $request)
    {
        $request->validate(['order_id' => 'required|exists:orders,id']);
        
        $order = Order::where('user_id', $request->user()->id)
            ->where('status', 'pending')
            ->findOrFail($request->order_id);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.paystack.secret_key'),
            'Content-Type' => 'application/json',
        ])->post('https://api.paystack.co/transaction/initialize', [
            'amount' => $order->total_amount * 100, // Paystack uses kobo/cents
            'email' => $request->user()->email,
            'reference' => 'PT-' . uniqid() . '-' . $order->id,
            'callback_url' => route('payment.callback')
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $order->update(['paystack_reference' => $data['data']['reference']]);
            
            return response()->json([
                'authorization_url' => $data['data']['authorization_url'],
                'reference' => $data['data']['reference']
            ]);
        }

        return response()->json(['message' => 'Could not initialize payment'], 500);
    }

    /**
     * Verify Paystack Payment Callback.
     */
    public function verify(Request $request)
    {
        $reference = $request->reference;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.paystack.secret_key'),
        ])->get("https://api.paystack.co/transaction/verify/{$reference}");

        if ($response->successful()) {
            $data = $response->json();
            
            if ($data['data']['status'] === 'success') {
                // Extract order ID from reference (e.g., PT-xyz-ORDERID)
                $parts = explode('-', $reference);
                $orderId = end($parts);
                
                $order = Order::findOrFail($orderId);
                $order->update([
                    'status' => 'paid',
                    'payment_status' => 'paid'
                ]);

                // NOW clear the cart
                $order->user->cart->items()->delete();

                return response()->json(['message' => 'Payment successful', 'order' => $order]);
            }
        }

        return response()->json(['message' => 'Payment verification failed'], 400);
    }
}
