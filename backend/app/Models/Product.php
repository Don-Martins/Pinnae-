<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', // Seller
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image_url',
        'rating',
        'reviews_count'
    ];

    /**
     * Get the seller that owns the product.
     */
    public function seller()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the category of the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * The bundles that this product belongs to.
     */
    public function bundles()
    {
        return $this->belongsToMany(Bundle::class, 'bundle_items');
    }
}
