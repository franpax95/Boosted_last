import React, { useContext } from 'react';
import { SettingsContext } from './SettingsContext';
import { CategoriesContext } from './CategoriesContext';
import { ExercisesContext } from './ExercisesContext';

const ReducerContext = React.createContext([{}, () => {}]);

function ReducerProvider({ children }) {
    /** Settings */
    const { setLoading, toastConfig } = useContext(SettingsContext);

    /** Categories Context */
    const { 
        categories, 
        category, 
        fetchCategories, 
        fetchCategory,
        insertCategories,
        updateCategory: _updateCategory,
        deleteCategory: _deleteCategory,
        deleteCategories: _deleteCategories,
        refresh: refreshCategories
    } = useContext(CategoriesContext);

    /** Exercises Context */
    const {
        exercises,
        exercise,
        fetchExercises,
        fetchExercise,
        insertExercises: _insertExercises,
        updateExercise: _updateExercise,
        deleteExercise: _deleteExercise,
        deleteExercises: _deleteExercises,
        refresh: refreshExercises
    } = useContext(ExercisesContext);

    /**
     * Shortcut to update category and handle other states
     */
    const insertExercises = async ({ exercises: exercisesToInsert, loading: haveLoading = true, toast: haveToast = true } = {}) => {
        if (haveLoading) setLoading(true);

        const inserted = await _insertExercises({ exercises: exercisesToInsert, loading: false, toast: haveToast, refresh: true });
        if (inserted) {
            // If inserted successfully, refresh categories
            await refreshCategories({ single: true, collection: false });
        }

        if (haveLoading) setLoading(false);

        return inserted;
    }

    /**
     * Shortcut to update category and handle other states
     */
    const updateCategory = async ({ category: changedCategory, loading: haveLoading = true, toast: haveToast = true } = {}) => {
        if (haveLoading) setLoading(true);

        const haveExercises = category.exercises.length > 0;
        const updated = await _updateCategory({ category: changedCategory, loading: false, toast: haveToast, refresh: true });
        if (updated && haveExercises) {
            // If removed successfully, exercises and routine may have been affected
            await refreshExercises();
            // await refreshRoutines({ single: true, collection: false });
        }

        if (haveLoading) setLoading(false);

        return updated;
    }

    /**
     * Shortcut to update exercise and handle other states
     */
    const updateExercise = async ({ exercise: changedExercise, loading: haveLoading = true, toast: haveToast = true } = {}) => {
        if (haveLoading) setLoading(true);

        const haveRoutines = Array.isArray(exercise.routines) && exercise.routines.length > 0;
        const updated = await _updateExercise({ exercise: changedExercise, loading: false, toast: haveToast, refresh: true });
        if (updated) {
            // If removed successfully, category and routine may have been affected.
            refreshCategories({ single: true, collection: false });
            // if (haveRoutines) await refreshRoutines({ single: true, collection: false });
        }

        if (haveLoading) setLoading(false);

        return updated;
    }

    /**
     * Shortcut to delete category and handle other states
     */
    const deleteCategory = async ({ loading: haveLoading = true, toast: haveToast = true } = {}) => {
        if (category === null) {
            return false;
        }

        if (haveLoading) setLoading(true);

        const haveExercises = Array.isArray(category.exercises) && category.exercises.length > 0;
        const deleted = await _deleteCategory({ id: category.id, loading: false, toast: haveToast, refresh: true });

        // If deleted success and have exercises, they will be remove, so we have to refresh exercises and the routine loaded
        if (deleted && haveExercises) {
            await refreshExercises();
            // await refreshRoutines({ single: true, collection: false }); // Just single routine have exercises loaded, which have categories loaded
        }

        if (haveLoading) setLoading(false);

        return deleted;
    }

    /**
     * Shortcut to delete category and handle other states
     */
    const deleteExercise = async ({ loading: haveLoading = true, toast: haveToast = true } = {}) => {
        if (exercise === null) {
            return false;
        }

        if (haveLoading) setLoading(true);

        const haveRoutines = Array.isArray(exercise.routines) && exercise.routines.length > 0;
        const deleted = await _deleteExercise({ id: exercise.id, loading: false, toast: haveToast, refresh: true });

        // If deleted success, we have to refresh category and routine loaded because they can have exercises loaded 
        if (deleted) {
            // If removed successfully, categories and routines may have been affected
            await refreshCategories({ single: true, collection: false }); // Just single category have exercises loaded
            // if (haveRoutines) await refreshRoutines({ single: true, collection: false }); // Just single routine have exercises loaded
        }

        if (haveLoading) setLoading(false);

        return deleted;
    }

    /**
     * Shortcut to delete categories and handle other states
     */
    const deleteCategories = async ({ categories, loading: haveLoading = true, toast: haveToast = true } = {}) => {
        if (haveLoading) setLoading(true);

        const deleted = await _deleteCategories({ categories, loading: false, toast: haveToast, refresh: true });
        if (deleted) {
            // If removed successfully, exercises and routines may have been affected
            await refreshExercises();
            // await refreshRoutines({ single: true, collection: false });
        }

        if (haveLoading) setLoading(false);

        return deleted;
    }

    /**
     * Shortcut to delete exercises and handle other states
     */
    const deleteExercises = async ({ exercises, loading: haveLoading = true, toast: haveToast = true } = {}) => {
        if (haveLoading) setLoading(true);

        const deleted = await _deleteExercises({ exercises, loading: false, toast: haveToast, refresh: true });
        if (deleted) {
            // If removed successfully, categories and routines may have been affected
            await refreshCategories({ single: true, collection: false });
            // await refreshRoutines({ single: true, collection: false });
        }

        if (haveLoading) setLoading(false);

        return deleted;
    }

    const value = {
        categories, category, fetchCategories, fetchCategory, insertCategories, updateCategory, deleteCategory, deleteCategories, 
        exercises, exercise, fetchExercises, fetchExercise, insertExercises, updateExercise, deleteExercise, deleteExercises,
    };

    return <ReducerContext.Provider value={value}>{children}</ReducerContext.Provider>;
}

export { ReducerContext, ReducerProvider };
