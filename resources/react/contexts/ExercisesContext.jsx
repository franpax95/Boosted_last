import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { SettingsContext } from './SettingsContext';
import { FetchingContext } from './FetchContext';
import useLanguage from '../hooks/useLanguage';
import { getPromise } from '../utils';

const ExercisesContext = React.createContext([{}, () => {}]);

function ExercisesProvider({ children }) {
    /** Language */
    const { contexts: { Exercises: texts }} = useLanguage();
    /** Requests */
    const { request } = useContext(FetchingContext);
    /** Settings */
    const { setLoading, toastConfig } = useContext(SettingsContext);
    /** Ejercicios cargados en la aplicación */
    const [exercises, setExercisesState] = useState(null);
    /** Ejercicio cargado en la aplicación (para ver detalles de un ejercicio o editarlo) */
    const [exercise, setExerciseState] = useState(null);

    /**
     * Parsea las variables opcionales del ejercicio para corregir los null que llegan en la llamada
     */
    const parseExercise = exercise => ({
        ...exercise,
        description: exercise.description || ''
    });

    /**
     * Consult the exercises available to the user and set them in the application, if they were not.
     * Returns a copy of the exercises loaded in the application.
     */
    async function fetchExercises({ loading: haveLoading = true, toast: haveToast = true } = {}) {
        const data = await request('GET', '/api/exercises', { haveLoading, failToast: haveToast ? '' : null })
            .then(data => {
                setExercisesState(data.map(exercise => parseExercise(exercise)));
                return data;
            })
            .catch(error => {
                setExercisesState([]);
                return [];
            });

        return data;
    }

    /**
     * Returns an exercise based on the id passed by parameter, or null if it is not among the exercises available to the user.
     * If force to true is specified, make the call regardless of the value.
     */
    async function fetchExercise({ id, force = false, loading: haveLoading = true, toast: haveToast = true } = {}) {
        if (force === true || exercise === null || (exercise !== null && exercise.id !== id)) {
            const data = await request('GET', `/api/exercises/${id}`, { haveLoading, failToast: haveToast ? '' : null })
                .then(data => {
                    setExerciseState(parseExercise(data));
                    return data;
                })
                .catch(error => {
                    setExerciseState(null);
                    return null;
                });

            return data;
        }

        return exercise;
    }

    /**
     * Insert a collection of exercises. 
     * Returns the recently inserted data.
     */
    async function insertExercises({ exercises, loading: haveLoading = true, toast: haveToast = true, shouldRefresh = true } = {}) {
        if (!Array.isArray(exercises)) {
            return null;
        }
        
        const successMessage = texts.txt1;
        const errorMessage = texts.txt2;
        if (haveLoading) setLoading(true);

        const data = await request('POST', '/api/exercises', { 
                body: exercises, 
                haveLoading: false, 
                successToast: haveToast ? successMessage : null, 
                failToast: haveToast ? errorMessage : null 
            })
            .then(data => data)
            .catch(error => {
                console.error(error);
                return null;
            });

        if (data && shouldRefresh) await refresh();
        if (haveLoading) setLoading(false);

        return data;
    }

    /**
     * Edit an exercise. If edited successfully, it asks for the exercise again.
     * Returns true or false indicating whether the edit was successful.
     */
    async function updateExercise({ exercise, loading: haveLoading = true, toast: haveToast = true, shouldRefresh = true } = {}) {
        const successMessage = texts.txt3;
        const errorMessage = texts.txt4;
        const showErrorToast = () => toast.error(errorMessage, toastConfig());

        // Check category
        if (typeof exercise.id !== 'number') {
            console.error('Bad Exercise.');
            if (haveToast) showErrorToast();
            return false;
        }   

        if (haveLoading) setLoading(true);

        const editted = await request('PUT', `/api/exercises/${exercise.id}`, { 
            body: exercise, 
            haveLoading: false, 
            successToast: haveToast ? successMessage : null, 
            failToast: haveToast ? errorMessage : null 
        })
            .then(data => true)
            .catch(error => false);

        if (editted && shouldRefresh) await refresh();
        if (haveLoading) setLoading(false);

        return editted;
    }

    /**
     * Delete an exercise. If it is removed successfully, it asks for the exercises again.
     * Returns true or false indicating whether the deletion was successful.
     */
    async function deleteExercise({ id, loading: haveLoading = true, toast: haveToast = true } = {}) {
        const successMessage = texts.txt5;
        const errorMessage = texts.txt6;
        const showErrorToast = () => toast.error(errorMessage, toastConfig());

        // Check category id
        if (typeof id !== 'number') {
            console.error('Bad Exercise Id.');
            if (haveToast) showErrorToast();
            return false;
        } 

        if (haveLoading) setLoading(true);

        const deleted = await request('DELETE', `/api/exercises/${id}`, { 
            haveLoading: false, 
            successToast: haveToast ? successMessage : null, 
            failToast: haveToast ? errorMessage : null 
        })
            .then(data => true)
            .catch(error => false);

        if (deleted) await refresh();
        if (haveLoading) setLoading(false);
        
        return deleted;
    }

    /**
     * Delete a group of exercises. If it is removed successfully, it asks for the exercises again.
     * Returns true or false indicating whether the deletion was successful.
     */
    async function deleteExercises({ exercises, loading: haveLoading = true, toast: haveToast = true } = {}) {
        const successMessage = texts.txt7;
        const errorMessage = texts.txt8;
        const showErrorToast = () => toast.error(errorMessage, toastConfig());

        // Check exercise id
        if (exercises.some(id => typeof id !== 'number')) {
            console.error('Bad Exercises Ids.');
            if (haveToast) showErrorToast();
            return false;
        } 

        if (haveLoading) setLoading(true);

        const deleted = await request('DELETE', `/api/exercises`, { 
            body: { exercises },
            haveLoading: false, 
            successToast: haveToast ? successMessage : null, 
            failToast: haveToast ? errorMessage : null 
        })
            .then(data => true)
            .catch(error => false);

        if (deleted) await refresh();
        if (haveLoading) setLoading(false);
        
        return deleted;
    }

    /**
     * Refresh the data loaded in the context
     */
    async function refresh() {
        let promises = [];

        if (exercises !== null) {
            const [exercisesProm, exercisesResolve, exercisesReject] = getPromise();
            promises.push(exercisesProm);

            fetchExercises({ loading: false, toast: false })
                .then(exs => exercisesResolve())
                .catch(exs => exercisesReject());
        }

        if (exercise !== null) {
            const [exerciseProm, exerciseResolve, exerciseReject] = getPromise();
            promises.push(exerciseProm);

            fetchExercise({ loading: false, toast: false, force: true, id: exercise.id })
                .then(ex => exerciseResolve())
                .catch(ex => exerciseReject());
        }

        await Promise.all(promises).then(values => {
            console.dir(values);
        });
    }

    const value = {
        exercises, exercise, 
        fetchExercises, fetchExercise, 
        insertExercises, updateExercise, 
        deleteExercise, deleteExercises,
        refresh,
    };

    return <ExercisesContext.Provider value={value}>{children}</ExercisesContext.Provider>;
}

export { ExercisesContext, ExercisesProvider };
