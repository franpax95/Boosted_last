<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\Category;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $categories = Category::where('user_id', $user->id)->orderBy('name', 'asc')->get();

        return response()->json([
            'categories' => $categories
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        $user = Auth::user();
        $category = Category::create([
            'name' => $request->name,
            'user_id' => $user->id
        ]);

        return response()->json([
            'category' => $category
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $category = Category::findOrFail($id);
            $exercises = Exercise::where('category_id', $id)->orderBy('name', 'asc')->get();
            $category->exercises = $exercises;
        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The category does not exist'], 401);
        } 

        return response()->json([
            'category' => $category
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        try {
            $category = Category::findOrFail($id);
            $category->update($request->all());
        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The category does not exist'], 401);
        } 

        return response()->json([
            'category' => $category
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();
        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The category does not exist'], 404);
        }

        return response()->json(null, 204);
    }
}
