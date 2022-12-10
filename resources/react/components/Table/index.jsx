import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { beautifyDate, clone } from '../../utils';
import { StyledCategoriesTable, StyledExercisesTable } from './style';

export const CategoriesTable = ({ categories = [] }) => {
    /** Categories to show in the table */
    const [_categories, setCategories] = useState(categories);

    useEffect(() => {
        setCategories(sortCategories(categories));
    }, [categories]);

    // Devuelve las categorías pasadas por parámetros ordenadas según el estado
    const sortCategories = cats => {
        let cs = clone(cats);

        return cs;
    }

    return (
        <StyledCategoriesTable>
            <div className="category header">
                <div className="name">Nombre</div>
                <div className="created_at">Fecha de creación</div>
                <div className="updated_at">Última actualización</div>
            </div>

            {_categories.map(category => (
                <Link key={category.id} className="category" to={`/categories/${category.id}`}>
                    <div className="name">{category.name}</div>
                    <div className="created_at">{beautifyDate(category.created_at)}</div>
                    <div className="updated_at">{beautifyDate(category.updated_at)}</div>
                </Link>
            ))}
        </StyledCategoriesTable>
    );
}

export const ExercisesTable = ({ exercises = [], withCategories = true }) => {
    /** Categories to show in the table */
    const [_exercises, setExercises] = useState(exercises);

    useEffect(() => {
        setExercises(sortExercises(exercises));
    }, [exercises]);

    // Devuelve los ejercicios pasados por parámetros ordenados según el estado
    const sortExercises = cats => {
        let cs = clone(cats);

        return cs;
    }

    return (
        <StyledExercisesTable>
            <div className="exercise header">
                <div className="preview">Imagen</div>
                <div className="name">Nombre</div>
                {withCategories && <div className="category">Categoría</div>}
                <div className="created_at">Fecha de creación</div>
                <div className="updated_at">Última actualización</div>
            </div>

            {_exercises.map(exercise => (
                <Link key={exercise.id} className="exercise" to={`/exercises/${exercise.id}`}>
                    <div className="preview">
                        {exercise.image && <img src={exercise.image} alt={exercise.name} />}
                    </div>

                    <div className="name">{exercise.name}</div>

                    {withCategories && <div className="category">{exercise.category_name}</div>}

                    <div className="created_at">{beautifyDate(exercise.created_at)}</div>

                    <div className="updated_at">{beautifyDate(exercise.updated_at)}</div>
                </Link>
            ))}
        </StyledExercisesTable>
    );
}