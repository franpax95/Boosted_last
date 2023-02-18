<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\Category;
use App\Models\User;
use App\Models\Document;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

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
        $categories = Category::with('exercises', 'user', 'image')
            ->where('user_id', $user->id)
            // ->orderBy('name', 'asc')
            ->get();

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

        $categories = array_map(function ($category) use ($user) {
            return [
                'name' => $category['name'],
                'image' => $category['image'],
                'user_id' => $user->id
            ];
        }, $request->all());
        
        $errors = [];
        foreach ($categories as $category) {
            if (isset($category['image'])) {
                $validator = Validator::make($category, ['name' => ['required', Rule::unique('categories')->where(function ($query) use ($user) {
                    return $query->where('user_id', $user->id);
                })], 'image.name' => 'required', 'image.base64' => 'required']);

                if ($validator->fails()) {
                    $errorsRow = [];

                    $errName = $validator->errors()->first('name');
                    if (!empty($errName)) {
                        $errorsRow['name'] = $errName;
                    }

                    $errImgName = $validator->errors()->first('image.name');
                    $errImgB64 = $validator->errors()->first('image.base64');
                    if (!empty($errImgName) || !empty($errImgB64)) {
                        $errorsRow['image'] = 'Image bad formed.';
                    }

                    array_push($errors, $errorsRow);
                } else {
                    array_push($errors, (object)[]);
                }
            } else {
                $validator = Validator::make($category, [
                    'name' => ['required', Rule::unique('categories')->where(function ($query) use ($user) {
                        return $query->where('user_id', $user->id);
                    })]
                ]);

                if ($validator->fails()) {
                    array_push($errors, ['name' => $validator->errors()->first('name')]);
                } else {
                    array_push($errors, (object)[]);
                }
            }
        }

        // If errors, return
        $filteredErrors = array_filter($errors, function($error) {
            return count((array)$error) > 0;
        });

        if (count($filteredErrors) > 0) {
            return response()->json(["errors" => $errors], 422);
        }

        // Insert images one by one to obtain the ids easily
        $categoriesToInsert = [];
        foreach ($categories as $category) {
            $image = null;

            if (isset($category['image'])) {
                $image = Document::create([
                    'name' => $category['image']['name'],
                    'base64' => $category['image']['base64'],
                ]);
            }

            array_push($categoriesToInsert, [
                'name' => $category['name'],
                'document_id' => isset($image) ? $image['id'] : null,
                'user_id' => $user->id
            ]);
        }

        $inserted = Category::insert($categoriesToInsert);
        if (!$inserted) {
            return response()->json(null, 500);
        }

        $categoriesInserted = Category::with('exercises', 'user', 'image')
            ->where('user_id', $user->id)
            ->whereIn('name', array_map(function ($category) { return $category['name']; }, $categories))
            ->get();

        return response()->json($categoriesInserted, 200);
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
            $category = Category::findOrFail($id)->load('exercises', 'user', 'image');
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'The category does not exist'], 401);
        } 

        return response()->json($category, 200);
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
        $user = Auth::user();
        $newCategory = $request->all();
        $errors = [];

        $validator = Validator::make($newCategory, ['name' => ['required', Rule::unique('categories')->where(function ($query) use ($user, $id) {
            return $query->where('user_id', $user->id)->where('id', '!=', $id);
        })]]);

        if ($validator->fails()) {
            $errName = $validator->errors()->first('name');
            if (!empty($errName)) {
                $errors['name'] = $errName;
            }
        }

        if (isset($newCategory['image'])) {
            $validatorDoc = Validator::make($newCategory['image'], ['name' => 'required', 'base64' => 'required']);
            if ($validatorDoc->fails()) {
                $errors['image'] = 'Image bad formed.';
            }
        }

        if (count((array)$errors) > 0) {
            return response()->json($errors, 422);
        }

        try {
            $category = Category::findOrFail($id);

            $image = null;
            if (isset($newCategory['image']) && isset($category['image'])) {
                $image = Document::findOrFail($category['image']['id']);
                $image->update($newCategory['image']);

            } else if (isset($newCategory['image']) && !isset($category['image'])) {
                $image = Document::create([
                    'name' => $newCategory['image']['name'],
                    'base64' => $newCategory['image']['base64'],
                ]);

            } else if (!isset($newCategory['image']) && isset($category['image'])) {
                $document = Document::findOrFail($category['image']['id']);
                $document->delete();
            }

            $category->update([
                'name' => $newCategory['name'],
                'document_id' => $image !== null ? $image['id'] : null,
            ]);

            $category->load('exercises', 'user', 'image');
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Cannot retrieve data.'], 401);
        } 

        return response()->json($category, 200);
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
