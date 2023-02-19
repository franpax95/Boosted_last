<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoutineExercisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('routine_exercises', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order')->unsigned();
            $table->bigInteger('series')->unsigned();
            $table->bigInteger('repetitions')->unsigned()->nullable();
            $table->bigInteger('weight')->unsigned()->nullable();
            $table->bigInteger('contraction')->unsigned()->nullable();
            $table->bigInteger('rest')->unsigned()->nullable();
            $table->bigInteger('routine_id')->unsigned();
            $table->foreign('routine_id')->references('id')->on('routines');
            $table->bigInteger('exercise_id')->unsigned();
            $table->foreign('exercise_id')->references('id')->on('exercises');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('routine_exercises');
    }
}
