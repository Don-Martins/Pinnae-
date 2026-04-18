<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'bundle_id',
        'title',
        'slug',
        'description',
        'video_url',
        'difficulty', // Beginner, Intermediate, Advanced
        'time_estimate',
        'image_url'
    ];

    /**
     * Get the bundle associated with the project.
     */
    public function bundle()
    {
        return $this->belongsTo(Bundle::class);
    }

    /**
     * Helper to get all products required for this project via its bundle.
     */
    public function getComponentsAttribute()
    {
        return $this->bundle ? $this->bundle->products : collect();
    }
}
