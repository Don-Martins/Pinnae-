<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Category;
use App\Models\Project;
use App\Models\Bundle;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Get system-wide dashboard stats.
     */
    public function dashboard()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('status', 'paid')->sum('total_amount'),
            'recent_orders' => Order::with('user')->latest()->take(5)->get()
        ]);
    }

    /**
     * User management.
     */
    public function users()
    {
        return response()->json(User::latest()->get());
    }

    public function updateUserRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate(['role' => 'required|in:buyer,seller,admin']);
        
        $user->update(['role' => $request->role]);
        return response()->json(['message' => "User role updated to {$request->role}"]);
    }

    /**
     * Product Management (Admin Override).
     */
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'required|string'
        ]);

        $product = Product::create($validated + [
            'slug' => Str::slug($request->name),
            'user_id' => $request->user()->id // Admin is the creator
        ]);

        return response()->json($product, 201);
    }

    public function deleteProduct($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    /**
     * Category Management.
     */
    public function storeCategory(Request $request)
    {
        $request->validate(['name' => 'required|unique:categories']);
        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);
        return response()->json($category, 201);
    }

    /**
     * Admin Management (Create other admins).
     */
    public function storeAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json([
            'message' => 'Admin user created successfully',
            'user' => $user
        ], 201);
    }

    public function removeAdminPrivileges($id)
    {
        $user = User::findOrFail($id);
        
        // Prevent removing own admin privileges or the main admin
        if ($user->id === auth()->id() || $user->email === 'donmartinz725@gmail.com') {
            return response()->json(['message' => 'Cannot remove privileges from the main administrator'], 403);
        }

        $user->update(['role' => 'buyer']);
        return response()->json(['message' => "Admin privileges removed from {$user->name}"]);
    }
}
