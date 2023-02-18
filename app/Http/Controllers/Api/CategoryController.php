<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\Category;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;

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
        $categories = Category::with('exercises', 'user')->where('user_id', $user->id)->orderBy('name', 'asc')->get();
        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // $cb = function($category) use ($user) {
        //     return ([
        //         'name' => $category['name'],
        //         'user_id' => $user->id
        //     ]);
        // };

        // $validator = Validator::make($request->all(), ['name' => 'required']); //->validate();
        // if ($validator->fails()) {
        //     return response()->json([
        //         'errors' => $validator->errors(),
        //         'request' => $request->all(),
        //         'data2insert' => array_map($cb, $request->all())
        //     ], 422);
        // }
        // $validated = $validator->validated();
        // $categoriesToInsert = array_map($cb, $validated);

        // Alternative manual validation because the Validator is not working, always fail
        foreach ($request->all() as $category) {
            if (!isset($category['name']) || $category['name'] == '') {
                return response()->json(["error" => "The field 'name' is required."], 422);
            }
        }

        // If valid, insert one by one
        $categories = [];
        foreach ($request->all() as $category) {
            $category = Category::create([
                'name' => $category['name'],
                'user_id' => $user->id
            ]);

            array_push($categories, $category);
        }

        // Return inserted rows
        return response()->json($categories, 200);
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
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'The category does not exist'], 404);
        }

        return response()->json(null, 200);
    }

    /**
     * Remove a resource collection from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function remove(Request $request)
    {
        $notDeleted = [];
        $categories = json_decode($request->categories);

        foreach ($categories as $id) {
            try {
                $category = Category::findOrFail($id);
                $category->delete();
            } catch (ModelNotFoundException $e) {
                array_push($notDeleted, $id);
            }
        }

        return response()->json($notDeleted, 200);
    }
}
