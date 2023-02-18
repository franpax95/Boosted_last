<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\Category;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $exercises = Exercise::with('image', 'category', 'user')->where('user_id', $user->id)->orderBy('name', 'asc')->get();
        return response()->json($exercises, 200);
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
            'name' => 'required',
            'category_id' => 'required'
        ]);

        $user = Auth::user();
        $exercise = Exercise::create(['user_id' => $user->id] + $request->all());

        return response()->json([$exercise], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            // Buscamos el ejercicio
            $exercise = Exercise::findOrFail($id);

            // Buscamos la categoría asociada al ejercicio
            $category = Category::findOrFail($exercise->category_id);

            // Añadimos el nombre de la categoría al ejercicio
            $exercise->category_name = $category->name;

        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The exercise does not exist'], 401);
        } 

        return response()->json([
            'exercise' => $exercise
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'category_id' => 'required'
        ]);

        try {
            $exercise = Exercise::findOrFail($id);
            $exercise->update($request->all());
        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The exercise does not exist'], 401);
        } 

        return response()->json([
            'exercise' => $exercise
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $exercise = Exercise::findOrFail($id);
            $exercise->delete();
        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The exercise does not exist'], 404);
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
        $exercises = json_decode($request->exercises);

        foreach ($exercises as $id) {
            try {
                $exercise = Exercise::findOrFail($id);
                $exercise->delete();
            } catch (ModelNotFoundException $e) {
                array_push($notDeleted, $id);
            }
        }

        return response()->json($notDeleted, 200);
    }
}
