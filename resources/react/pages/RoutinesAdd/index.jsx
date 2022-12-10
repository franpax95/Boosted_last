import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../components/Button';
import { Input } from '../../components/Input';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { RoutinesContext } from '../../contexts/RoutinesContext';
import { clone, deleteArrayElement } from '../../utils';
import { StyledRoutinesAdd } from './style';

export default function RoutinesAdd() {
    /** Navigate effect */
    const navigate = useNavigate();

    /** Categories Context */
    const { categories, fetchCategories } = useContext(CategoriesContext);
    /** Exercises Context */
    const { exercises, fetchExercises } = useContext(ExercisesContext);
    /** Routines Context */
    const { insertRoutine } = useContext(RoutinesContext);

    /** Form values */
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [routineExercises, setRoutineExercises] = useState([]);

    useEffect(() => {
        if(categories === null) {
            fetchCategories();
        }

        if(exercises === null) {
            fetchExercises();
        }
    }, []);

    // useEffect(() => console.dir({routineExercises}), [routineExercises]);


    /**
     * Devuelve un ejercicio de rutina vacío
     */
    const getEmptyRoutineExercise = () => ({
        category_id: exercises[0].category_id,  // Id de la categoría
        exercise_id: exercises[0].id,                    // Id del ejercicio
        categories: categories,          // Opciones de categorías disponibles según el filtro
        exercises: exercises.filter(ex => ex.category_id === exercises[0].category_id),            // Opciones de ejercicios disponibles según la categoría elegida y el filtro
        // order: routineExercises.length,      // Orden del ejercicio (se seteará en el submit)
        series: 1,                              // Número de series
        repetitions: 0,                         // Repeticiones por serie
        contraction: 0,                         // Tiempo contrayendo (0 para que no haya timer)
        rest: 0,                                // Tiempo descansando (0 para que no haya timer)
        weight: 0,                              // Peso (en Kg)
    });

    /**
     * Añade un ejercicio de rutina vacío para cumplimentar
     */
    const onAddRoutineExerciseClick = event => {
        setRoutineExercises(prev => [...prev, getEmptyRoutineExercise()]);
    }

    /**
     * Clona un ejercicio, añadiéndolo por el final
     */
    const onCloneRoutineExerciseClick = (event, index) => {
        setRoutineExercises(prev => [...prev, prev[index]]);
    }

    /**
     * Elimina un ejercicio de rutina
     */
    const onRemoveRoutineExerciseClick = (event, index) => {
        setRoutineExercises(prev => deleteArrayElement(prev, index));
    }

    /**
     * Manejador de eventos al cambiar de categoría
     */
    const onCategoryChange = (event, index) => {
        const { value } = event.target;

        setRoutineExercises(prev => {
            const category_id = Number(value);
            const exs = exercises.filter(ex => ex.category_id === category_id );
            const exercise_id = exs.length ? exs[0].id : 0;

            return prev.map((ex, pos) => pos !== index ? ex : { ...ex, category_id, exercises: exs, exercise_id });
        });
    }

    /**
     * Manejador de evento al cambiar de ejercicio
     */
    const onExerciseChange = (event, index) => {
        const { value } = event.target;
        const exercise_id = Number(value);
        setRoutineExercises(prev => prev.map((e, i) => i !== index ? e : { ...e, exercise_id }));
    }

    /**
     * Manejador de eventos al cambiar el número de series de un ejercicio de rutina
     */
    const onSeriesChange = (event, index) => {
        const { value } = event.target;
        const series = Number(value);
        setRoutineExercises(prev => prev.map((e, i) => i !== index ? e : { ...e, series }));
    }

    /**
     * Manejador de eventos al cambiar el número de repeticiones de un ejercicio de rutina
     */
    const onRepetitionsChange = (event, index) => {
        const { value } = event.target;
        const repetitions = Number(value);
        setRoutineExercises(prev => prev.map((e, i) => i !== index ? e : { ...e, repetitions }));
    }

    /**
     * Manejador de eventos al cambiar el peso de un ejercicio de rutina
     */
    const onWeightChange = (event, index) => {
        const { value } = event.target;
        const weight = Number(value);
        setRoutineExercises(prev => prev.map((e, i) => i !== index ? e : { ...e, weight }));
    }

    /**
     * Manejador de eventos al cambiar el tiempo de contracción de un ejercicio de rutina
     */
    const onContractionChange = (event, index) => {
        const { value } = event.target;
        const contraction = Number(value);
        setRoutineExercises(prev => prev.map((e, i) => i !== index ? e : { ...e, contraction }));
    }

    /**
     * Manejador de eventos al cambiar el tiempo de descanso de un ejercicio de rutina
     */
    const onRestChange = (event, index) => {
        const { value } = event.target;
        const rest = Number(value);
        setRoutineExercises(prev => prev.map((e, i) => i !== index ? e : { ...e, rest }));
    }

    /**
     * Manejador de eventos submit del formulario
     */
    const onSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        console.dir(clone(routineExercises))

        const exs = routineExercises.map((ex, pos) => ({ 
            exercise_id: ex.exercise_id,
            series: ex.series,
            repetitions: ex.repetitions,
            contraction: ex.contraction,
            rest: ex.rest,
            weight: ex.weight,
            order: pos 
        }));

        const ok = await insertRoutine({ name, description, exercises: exs });
        if(ok) {
            navigate("/routines");
        }
    }

    return (
        <StyledRoutinesAdd>
            <PrimaryButton onClick={onAddRoutineExerciseClick}>Añadir ejercicio</PrimaryButton>

            <form onSubmit={onSubmit}>
                <Input 
                    name="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Nombre de la rutina" 
                />

                <Input 
                    name="description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Descripción de la rutina" 
                />

                {routineExercises.map((ex, key) => (
                    <div className="row" key={key}>
                        {/** Category */}
                        <div className="group">
                            <label>Categoría</label>
                            <select value={ex.category_id} onChange={e => onCategoryChange(e, key)}>
                                {ex.categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        {/** Exercise */}
                        <div className="group">
                            <label>Ejercicio</label>
                            <select value={ex.exercise_id} onChange={e => onExerciseChange(e, key)}>
                                {ex.exercises.map(exercise => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                        </div>

                        {/** Series */}
                        <div className="group">
                            <label>Series</label>
                            <input type="number" min="1" value={ex.series} onChange={e => onSeriesChange(e, key)} />
                        </div>

                        {/** Repetitions */}
                        <div className="group">
                            <label>Repeticiones</label>
                            <input type="number" min="0" value={ex.repetitions} onChange={e => onRepetitionsChange(e, key)} />
                        </div>

                        {/** Contraction Time */}
                        <div className="group">
                            <label>Tiempo de contracción</label>
                            <input type="number" min="0" value={ex.contraction} onChange={e => onContractionChange(e, key)} />
                        </div>

                        {/** Rest Time */}
                        <div className="group">
                            <label>Tiempo de descanso</label>
                            <input type="number" min="0" value={ex.rest} onChange={e => onRestChange(e, key)} />
                        </div>

                        {/** Weight */}
                        <div className="group">
                            <label>Peso (en Kg)</label>
                            <input type="number" min="0" value={ex.weight} onChange={e => onWeightChange(e, key)} />
                        </div>

                        <div className="group">
                            {/** Clone Btn */}
                            <button type="button" onClick={event => onCloneRoutineExerciseClick(event, key)}>Clonar</button>

                            {/** Remove Btn */}
                            <button type="button" onClick={event => onRemoveRoutineExerciseClick(event, key)}>Eliminar</button>
                        </div>      
                    </div>
                ))}

                <PrimaryButton>Insertar rutina</PrimaryButton>
            </form>
        </StyledRoutinesAdd>
    );
}
