import { clone } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { PrimaryLink } from '../../components/Anchor';
import { SearchBar } from '../../components/Input';
import { ExercisesTable } from '../../components/Table';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { deleteAccents } from '../../utils';
import { StyledExercises, StyledNotFoundExercises } from './style';

export default function Exercises() {
    /** Exercises Context */
    const { exercises, fetchExercises } = useContext(ExercisesContext);

    /** Oculta la pantalla. Útil sobretodo para esperar al fetch inicial. */
    const [hide, setHide] = useState(true);
    /** Ejercicios a mostrar, después de ser aplicados los filtros */
    const [filteredExercises, setFilteredExercises] = useState([]);
    /** Valor del campo búsqueda sobre el que filtrar ejercicios */
    const [search, setSearch] = useState('');

    // ComponentDidMount para pedir ejercicios
    useEffect(() => {
        const fetch = async () => {
            if(exercises === null) {
                await fetchExercises();
            }
            setHide(false);
        }

        fetch();
    }, []);

    // componentDidUpdate. Actualiza los ejercicios mostrados si cambian los exercises.
    useEffect(() => {
        if(exercises !== null) {
            setFilteredExercises(applyFilters(exercises));
        }
    }, [exercises, search]);

    // Devuelve los ejercicios pasadas por parámetro que cumplan con los filtros de la aplicación.
    const applyFilters = exercises => {
        let exs = clone(exercises);

        if(search !== '') {
            exs = exs.filter(ex => {
                const { name, description, category_name } = ex;
                const values = Object.values({ name, description, category_name });
                return values.some(value => (value && deleteAccents(value.toString().toLowerCase()).includes(deleteAccents(search.toLowerCase()))));
            });
        }

        return exs;
    }

    // Oculta la pantalla principal
    if(hide) {
        return '';
    }

    return (
        <StyledExercises>
            <PrimaryLink className="add-exercise-link" to="/exercises/add">Añadir ejercicio</PrimaryLink>

            <h1 className="title">Ejercicios</h1>

            {exercises && exercises.length > 0 && <SearchBar 
                placeholder="Filtrar ejercicios..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                onClear={() => setSearch('')} 
            />}

            {exercises && exercises.length > 0 && 
                <ExercisesTable exercises={filteredExercises} />
            }

            {/** Mensaje en caso de no haber resultados filtrados */}
            {exercises && exercises.length > 0 && filteredExercises.length === 0 && (
                <StyledNotFoundExercises>No existen ejercicios coincidentes con '{search}'</StyledNotFoundExercises>
            )}

            {/** Si todavía no hay ejercicios asociados al usuario... */}
            {exercises && exercises.length === 0 && (
                <StyledNotFoundExercises>
                    <span>Todavía no has añadido ningún ejercicio.</span>
                    <span>Puedes empezar pulsando el botón 'Añadir ejercicio'.</span>
                </StyledNotFoundExercises>
            )}
        </StyledExercises>
    );
}
