<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bundle extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'discount_percentage'
    ];

    /**
     * The products included in this bundle.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'bundle_items');
    }

    /**
     * The projects that use this bundle.
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
