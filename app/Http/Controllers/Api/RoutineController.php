<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Routine;
use App\Models\RoutineExercise;
use App\Models\Exercise;
use App\Models\Category;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoutineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Recogemos el usuario y pedimos las rutinas asociadas a este
        $user = Auth::user();
        $routines = Routine::where('user_id', $user->id)
            ->orderBy('name', 'asc')
            ->get();

        // Añadimos los ejercicios a cada rutina
        foreach($routines as $routine) {
            // Recogemos todos los ejerciciosXrutinas
            $exerciseXroutines = RoutineExercise::where('routine_id', $routine->id)
                ->orderBy('order', 'asc')
                ->get();

            // Convertimos dichos valores a ejercicios
            $exercises = [];
            foreach($exerciseXroutines as $fer) {
                $exercise = Exercise::find($fer->exercise_id);
                $category = Category::find($exercise->category_id);

                array_push($exercises, [
                    'id' => $exercise->id,
                    'name' => $exercise->name,
                    'description' => $exercise->description,
                    'image' => $exercise->image,
                    'category_id' => $category->id,
                    'category_name' => $category->name,
                    'order' => $fer->order,
                    'series' => $fer->series,
                    'weight' => $fer->weight,
                    'repetitions' => $fer->repetitions,
                    'contraction' => $fer->contraction,
                    'rest' => $fer->rest
                ]);
            }

            // Añadimos los ejercicios a la rutina
            $routine->exercises = $exercises;
        }

        // Devolvemos las rutinas
        return response()->json([
            'routines' => $routines
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
        // Validamos los campos
        $this->validate($request, [
            'name' => 'required',
            'exercises' => 'required'
        ]);

        // Insertamos la rutina en la BBDD
        $user = Auth::user();
        $routine = Routine::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => $user->id
        ]);

        // Insertamos los ejercicios
        $requestExercises = $request->input('exercises');
        foreach($requestExercises as $exercise) {
            // Agregamos el id de la rutina
            $exercise['routine_id'] = $routine->id;
            DB::table('routine_exercises')->insert($exercise);
        }

        // Recogemos todos los ejerciciosXrutinas
        $exerciseXroutines = RoutineExercise::where('routine_id', $routine->id)
            ->orderBy('order', 'asc')
            ->get();

        // Insertamos los ejercicios en la rutina y la devolvemos
        // Convertimos dichos valores a ejercicios
        $exercises = [];
        foreach($exerciseXroutines as $fer) {
            $exercise = Exercise::find($fer->exercise_id);
            $category = Category::find($exercise->category_id);

            array_push($exercises, [
                'id' => $fer->id,
                'exercise_id' => $fer->exercise_id,
                'name' => $exercise->name,
                'description' => $exercise->description,
                'image' => $exercise->image,
                'category_id' => $category->id,
                'category_name' => $category->name,
                'order' => $fer->order,
                'series' => $fer->series,
                'weight' => $fer->weight,
                'repetitions' => $fer->repetitions,
                'contraction' => $fer->contraction,
                'rest' => $fer->rest
            ]);
        }
        $routine->exercises = $exercises;

        return response()->json([
            'routine' => $routine
        ], 200);
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
            // Buscamos la rutina
            $routine = Routine::findOrFail($id);

            // Buscamos los ejercicios asociados
            $exerciseXroutines = RoutineExercise::where('routine_id', $routine->id)
                ->orderBy('order', 'asc')
                ->get();

            // Convertimos dichos valores a ejercicios
            $exercises = [];
            foreach($exerciseXroutines as $fer) {
                $exercise = Exercise::find($fer->exercise_id);
                $category = Category::find($exercise->category_id);

                array_push($exercises, [
                    'id' => $fer->id,
                    'exercise_id' => $fer->exercise_id,
                    'name' => $exercise->name,
                    'description' => $exercise->description,
                    'image' => $exercise->image,
                    'category_id' => $category->id,
                    'category_name' => $category->name,
                    'order' => $fer->order,
                    'series' => $fer->series,
                    'weight' => $fer->weight,
                    'repetitions' => $fer->repetitions,
                    'contraction' => $fer->contraction,
                    'rest' => $fer->rest
                ]);
            }

            // Añadimos los ejercicios a la rutina
            $routine->exercises = $exercises;
        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The routine does not exist'], 401);
        }

        return response()->json([
            'routine' => $routine
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
            'exercises' => 'required'
        ]);

        $routine = Routine::find($id);
        $routine->name = $request->name;
        $routine->description = $request->description;
        $routine->save();

        // Eliminamos los ejercicios que haya ahora mismo
        $deleted = RoutineExercise::where('routine_id', $routine->id)->delete();

        // Insertamos los ejercicios recibidos por parámetro
        $requestExercises = $request->input('exercises');
        foreach($requestExercises as $exercise) {
            // Agregamos el id de la rutina
            $exercise['routine_id'] = $routine->id;
            DB::table('routine_exercises')->insert($exercise);
        }

        // Recogemos todos los ejerciciosXrutinas
        $exerciseXroutines = RoutineExercise::where('routine_id', $routine->id)
            ->orderBy('order', 'asc')
            ->get();

        // Insertamos los ejercicios en la rutina y la devolvemos
        // Convertimos dichos valores a ejercicios
        $exercises = [];
        foreach($exerciseXroutines as $fer) {
            $exercise = Exercise::find($fer->exercise_id);
            $category = Category::find($exercise->category_id);

            array_push($exercises, [
                'id' => $fer->id,
                'exercise_id' => $fer->exercise_id,
                'name' => $exercise->name,
                'description' => $exercise->description,
                'image' => $exercise->image,
                'category_id' => $category->id,
                'category_name' => $category->name,
                'order' => $fer->order,
                'series' => $fer->series,
                'weight' => $fer->weight,
                'repetitions' => $fer->repetitions,
                'contraction' => $fer->contraction,
                'rest' => $fer->rest
            ]);
        }
        $routine->exercises = $exercises;

        return response()->json([
            'routine' => $routine
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
            $routine = Routine::findOrFail($id);

            // Eliminamos los ejercicios que haya ahora mismo
            $deleted = RoutineExercise::where('routine_id', $routine->id)->delete();

            if($deleted) {
                $routine->delete();
            }
        } catch(ModelNotFoundException $e) {
            return response()->json(['error' => 'The routine does not exist'], 404);
        }

        return response()->json(null, 204);
    }
}
