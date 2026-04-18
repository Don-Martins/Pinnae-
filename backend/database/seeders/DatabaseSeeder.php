<?php

namespace Database\Seeders;

use App\Models\Bundle;
use App\Models\Category;
use App\Models\Product;
use App\Models\Project;
use App\Models\Seller;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create ADMIN (donmartinz725@gmail.com / Chimzaram13?)
        $admin = User::create([
            'name' => 'Main Admin',
            'email' => 'donmartinz725@gmail.com',
            'password' => Hash::make('Chimzaram13?'),
            'role' => 'admin',
        ]);

        // 2. Create SELLER
        $sellerUser = User::create([
            'name' => 'Tezla Maker Lab',
            'email' => 'seller@example.com',
            'password' => Hash::make('password'),
            'role' => 'seller',
        ]);

        Seller::create([
            'user_id' => $sellerUser->id,
            'store_name' => 'Tezla Maker Lab',
            'bio' => 'Premium hardware for the modern engineer.',
            'is_verified' => true
        ]);

        // 3. Create CATEGORIES
        $cat1 = Category::create(['name' => 'Microcontrollers', 'slug' => 'microcontrollers']);
        $cat2 = Category::create(['name' => 'Sensors', 'slug' => 'sensors']);
        $cat3 = Category::create(['name' => 'Actuators', 'slug' => 'actuators']);

        // 4. Create PRODUCTS
        $p1 = Product::create([
            'user_id' => $sellerUser->id,
            'category_id' => $cat1->id,
            'name' => 'Arduino Uno R4 WiFi',
            'slug' => 'arduino-uno-r4',
            'description' => 'The latest Uno with WiFi and Bluetooth.',
            'price' => 38.50,
            'stock' => 50,
            'image_url' => 'https://picsum.photos/seed/uno/600/600',
            'rating' => 4.9,
            'reviews_count' => 120
        ]);

        $p2 = Product::create([
            'user_id' => $sellerUser->id,
            'category_id' => $cat2->id,
            'name' => 'Ultrasonic Sensor HC-SR04',
            'slug' => 'ultrasonic-sensor',
            'description' => 'Distance measurement sensor.',
            'price' => 4.99,
            'stock' => 200,
            'image_url' => 'https://picsum.photos/seed/sensor/600/600',
            'rating' => 4.7
        ]);

        $p3 = Product::create([
            'user_id' => $sellerUser->id,
            'category_id' => $cat3->id,
            'name' => 'Mini Servo SG90',
            'slug' => 'mini-servo',
            'description' => 'Lightweight 9g servo motor.',
            'price' => 3.50,
            'stock' => 500,
            'image_url' => 'https://picsum.photos/seed/servo/600/600'
        ]);

        // 5. Create BUNDLES
        $bundle = Bundle::create([
            'name' => 'Smart Plant Kit',
            'description' => 'Everything for your first IoT project.',
            'discount_percentage' => 10
        ]);

        // Attach products to bundle
        $bundle->products()->attach([$p1->id, $p2->id]);

        // 6. Create PROJECTS
        Project::create([
            'bundle_id' => $bundle->id,
            'title' => 'Smart Plant Monitor',
            'slug' => 'smart-plant-monitor',
            'description' => 'Build an automated plant watering alert system.',
            'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'difficulty' => 'Beginner',
            'time_estimate' => '2 Hours',
            'image_url' => 'https://picsum.photos/seed/plant/800/600'
        ]);
    }
}
