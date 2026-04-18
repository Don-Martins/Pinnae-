<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SellerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && in_array($request->user()->role, ['seller', 'admin'])) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized. Seller access required.'], 403);
    }
}
