<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\SellerController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

// Protected Routes (Requires Auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Cart Routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add-product', [CartController::class, 'addProduct']);
    Route::post('/cart/add-bundle', [CartController::class, 'addBundle']);
    Route::put('/cart/items/{id}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/items/{id}', [CartController::class, 'removeProduct']);
    Route::post('/cart/clear', [CartController::class, 'clear']);

    // Checkout & Order Routes
    Route::get('/checkout/summary', [OrderController::class, 'checkoutSummary']);
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // Payment Routes
    Route::post('/payment/initialize', [PaymentController::class, 'initialize']);
    Route::get('/payment/callback', [PaymentController::class, 'verify'])->name('payment.callback');

    // Seller Routes
    Route::middleware('role.seller')->prefix('seller')->group(function () {
        Route::get('/dashboard', [SellerController::class, 'dashboard']);
        Route::get('/profile', [SellerController::class, 'profile']);
        Route::put('/profile', [SellerController::class, 'updateProfile']);
        Route::get('/products', [SellerController::class, 'products']);
        Route::post('/products', [SellerController::class, 'storeProduct']);
        Route::put('/products/{id}', [SellerController::class, 'updateProduct']);
        Route::get('/orders', [SellerController::class, 'orders']);
    });

    // Admin Routes
    Route::middleware('role.admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
        Route::post('/categories', [AdminController::class, 'storeCategory']);
        Route::post('/products', [AdminController::class, 'storeProduct']);
        Route::delete('/products/{id}', [AdminController::class, 'deleteProduct']);
        
        // Admin Management
        Route::post('/create-admin', [AdminController::class, 'storeAdmin']);
        Route::delete('/users/{id}/remove-admin', [AdminController::class, 'removeAdminPrivileges']);
    });
});
