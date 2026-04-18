<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of all DIY projects.
     */
    public function index()
    {
        // Load projects with their linked bundle and product components
        $projects = Project::with(['bundle.products'])->latest()->get();
        return response()->json($projects);
    }

    /**
     * Display a specific project with its full hardware list.
     */
    public function show($slug)
    {
        $project = Project::with(['bundle.products'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'project' => $project,
            // Explicitly returning components for frontend convenience
            'components' => $project->bundle ? $project->bundle->products : []
        ]);
    }
}
