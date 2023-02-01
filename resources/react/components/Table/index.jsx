import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { beautifyDate, clone, compareStringArray } from '../../utils';
import { PrimaryCheckbox } from '../Input';
import { StyledCategoriesTable, StyledExercisesTable } from './style';
import { BsChevronDown } from 'react-icons/bs';
import useLanguage from '../../hooks/useLanguage';

export const CategoriesTable = memo(({ categories = [], selectionMode = false, onSelectedChange }) => {
    /** Atributos de cabecera */
    const HEADERS = { NAME: 'name', CREATED_AT: 'created_at', UPDATED_AT: 'updated_at' };

    /** Categories to show in the table */
    const [data, set] = useState([]);
    /** Atributo por el que ordenar */
    const [sortBy, setSortBy] = useState('');
    /** Language */
    const { components: { Table: texts }} = useLanguage();

    useEffect(() => {
        set(sort(categories));
    }, [categories]);

    useEffect(() => {
        if (data.length > 0) {
            set(sort(data));
        }

        console.dir(sortBy);
    }, [sortBy]);

    // Parsea la colección para que tenga el atributo selected
    const parse = collection => {
        let data = clone(collection);
        return data.map(elem => ({ ...elem, selected: !!elem.selected }));
    }

    // Devuelve la colección pasada por parámetro ordenada según el estado
    const sort = collection => {
        let data = clone(collection);

        if (sortBy !== '') {
            const asc = sortBy.charAt(0) === '-';
            const attr = asc ? sortBy.substring(1) : sortBy;
            data = data.sort((a, b) => compareStringArray(a[attr], b[attr], asc));
        } else {
            data = data.sort((a, b) => (b.id - a.id));
        }

        return parse(data);
    }

    // Manejador de eventos 'change' del checkbox
    const onCheckboxChange = (event, id) => {
        if (selectionMode) {
            if (onSelectedChange) {
                onSelectedChange(id);
            }

            set(prev => {
                let data = clone(prev);
                const index = data.findIndex(elem => elem.id === id);
                
                if (index !== -1) {
                    data[index].selected = !data[index].selected;
                }

                return data;
            });
        } else {
            event.preventDefault();
        }
    }

    // Manejador de eventos 'click' de la cabecera
    const onHeaderClick = (event, header) => {
        if (sortBy === header) {
            setSortBy(`-${header}`);
        } else if (sortBy === `-${header}`) {
            setSortBy('');
        } else {
            setSortBy(header);
        }
    }

    return (
        <StyledCategoriesTable className={selectionMode ? 'selection-mode' : ''}>
            <div className="category header">
                {selectionMode ? <div className="check"></div> : ''}

                <div className="name" onClick={e => onHeaderClick(e, HEADERS.NAME)}>
                    <span>{texts.txt1}</span>

                    <div className={`icon ${(sortBy === HEADERS.NAME || sortBy === `-${HEADERS.NAME}`) ? 'active' : ''} ${(sortBy === `-${HEADERS.NAME}`) ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>

                <div className="created_at" onClick={e => onHeaderClick(e, HEADERS.CREATED_AT)}>
                    <span>{texts.txt2}</span>

                    <div className={`icon ${sortBy === HEADERS.CREATED_AT || sortBy === `-${HEADERS.CREATED_AT}` ? 'active' : ''} ${sortBy === `-${HEADERS.CREATED_AT}` ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>

                <div className="updated_at" onClick={e => onHeaderClick(e, HEADERS.UPDATED_AT)}>
                    <span>{texts.txt3}</span>

                    <div className={`icon ${sortBy === HEADERS.UPDATED_AT || sortBy === `-${HEADERS.UPDATED_AT}` ? 'active' : ''} ${sortBy === `-${HEADERS.UPDATED_AT}` ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>
            </div>

            <div className="body">
                {data.map(category => (
                    <Link key={category.id} className="category" to={`/categories/${category.id}`}>
                        {selectionMode ? <div className="check">
                            <PrimaryCheckbox value={category.selected} onChange={e => onCheckboxChange(e, category.id)} />
                        </div> : ''}

                        <div className="name">
                            <span>{category.name}</span>
                        </div>

                        <div className="created_at">
                            <span>{beautifyDate(category.created_at)}</span>
                        </div>

                        <div className="updated_at">
                            <span>{beautifyDate(category.updated_at)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </StyledCategoriesTable>
    );
});

export const ExercisesTable = memo(({ exercises = [], withCategories = true }) => {
    /** Exercises to show in the table */
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
});
