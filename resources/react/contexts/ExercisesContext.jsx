import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clone } from '../utils';
import { SettingsContext } from './SettingsContext';
import { UserContext } from './UserContext';
import { THEME } from '../states/theming';


const ExercisesContext = React.createContext([{}, () => {}]);

function ExercisesProvider({ children }) {
    /** Settings */
    const { setLoading, theme } = useContext(SettingsContext);
    /** Auth */
    const { token } = useContext(UserContext);

    /** Ejercicios cargados en la aplicación */
    const [exercises, setExercisesState] = useState(null);
    /** Ejercicio cargado en la aplicación (para ver detalles de un ejercicio o editarlo) */
    const [exercise, setExerciseState] = useState(null);


    /**
     * Parsea las variables opcionales del ejercicio para corregir los null que llegan en la llamada
     */
    const parseExercise = exercise => ({
        ...exercise,
        description: exercise.description || '',
        image: exercise.image || ''
    });

    /**
     * Consulta los ejercicios disponibles para el usuario y las setea en la aplicación, si no estuvieran.
     * Devuelve una copia de los ejercicios cargados en la aplicación.
     */
    async function fetchExercises({ loading: haveLoading = true, toast: haveToast = true } = {}) {
        if(haveLoading) {
            setLoading(true);
        }

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const cs = await axios.get('/api/exercises', config)
            .then(response => {
                console.dir(response);

                const { exercises } = response.data;
                const parsedExercises = exercises.map(exercise => parseExercise(exercise));
                setExercisesState(parsedExercises);
                return parsedExercises;
            })
            .catch(error => {
                console.error(error);

                if(haveToast) {
                    toast.error(error.response.data.message, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: theme === THEME.DARK ? 'dark' : 'light'
                    });
                }

                setExercisesState([]);
                return [];
            });

        if(haveLoading) {
            setLoading(false);
        }

        return cs;
    }

    /**
     * Devuelve un ejercicio según el id pasado por parámetro, o null si no se encuentra.
     * Si se especifica force a true, realiza la llamada independientemente del valor de category.
     */
    async function fetchExercise({ id, force = false, loading: haveLoading = true, toast: haveToast = true } = {}) {
        // Pedimos ejercicio si no hay seteado o si el que hay seteado no es el que se está pidiendo
        if(force === true || exercise === null || (exercise !== null && exercise.id !== id)) {
            if(haveLoading) {
                setLoading(true);
            }

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const ex = await axios.get(`/api/exercises/${id}`, config)
                .then(response => {
                    console.dir(response);

                    const { exercise } = response.data;
                    const parsedExercise = parseExercise(exercise);
                    setExerciseState(parsedExercise);
                    return parsedExercise;
                })
                .catch(error => {
                    console.error(error);

                    if(haveToast) {
                        toast.error(error.response.data.message, {
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                            theme: theme === THEME.DARK ? 'dark' : 'light'
                        });
                    }

                    setExerciseState(null);
                    return null;
                });

            if(haveLoading) {
                setLoading(false);
            }

            return ex;
        }

        return exercise;
    }

    /**
     * Inserta un ejercicio. Si se inserta correctamente, vuelve a pedir los ejercicios.
     * Devuelve true o false indicando si la inserción ha tenido éxito.
     */
    async function insertExercise({ exercise, loading: haveLoading = true, toast: haveToast = true } = {}) {
        if(haveLoading) {
            setLoading(true);
        }

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const ex = await axios.post('/api/exercises', exercise, config)
            .then(res => {
                console.dir(res);

                const { exercise } = res.data;

                if(haveToast) {
                    toast.success('Ejercicio insertado con éxito', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: theme === THEME.DARK ? 'dark' : 'light'
                    });
                }

                return exercise;
            })
            .catch(err => {
                console.error(err);

                if(haveToast) {
                    toast.error('No se ha podido insertar el ejercicio', {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: theme === THEME.DARK ? 'dark' : 'light'
                    });
                }
                
                return null;
            });
        
        // Si se ha insertado correctamente, volvemos a pedir los ejercicios
        if(ex !== null) {
            await fetchExercises({ loading: false });
        }

        if(haveLoading) {
            setLoading(false);
        }

        return ex;
    }

    /**
     * Edita un ejercicio. Si se edita correctamente, vuelve a pedir el ejercicio.
     * Devuelve true o false indicando si la edición ha tenido éxito.
     */
    async function updateExercise({ exercise, loading: haveLoading = true, toast: haveToast = true } = {}) {
        const showErrorToast = () => {
            toast.error('No se ha podido editar el ejercicio. Inténtelo de nuevo más tarde.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });
        }

        // Comprobamos que se ha seteado un id correcto en el ejercicio
        if(typeof exercise.id !== "number") {
            console.error("INTENTANDO EDITAR UN EJERCICIO SIN ID");
            if(haveToast) {
                showErrorToast();
            }
            return false;
        }   

        if(haveLoading) {
            setLoading(true);
        }

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const edited = await axios.put(`/api/exercises/${exercise.id}`, exercise, config)
            .then(res => {
                console.dir(res);

                if(haveToast) {
                    toast.success('Ejercicio editado con éxito', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: theme === THEME.DARK ? 'dark' : 'light'
                    });
                }

                return true;
            })
            .catch(err => {
                console.error(err);
                if(haveToast) {
                    showErrorToast();
                }
                return false;
            });
        
        // Si se ha editado correctamente, volvemos a pedir el ejercicio
        if(edited) {
            fetchExercises({ force: true, loading: false, haveToast: false });
            await fetchExercise({ id: exercise.id, force: true, loading: false, haveToast: false });
        }

        if(haveLoading) {
            setLoading(false);
        }

        return edited;
    }

    /**
     * Elimina un ejercicio. Si se elimina correctamente, vuelve a pedir los ejercicios.
     * Devuelve true o false indicando si el borrado ha tenido éxito.
     */
    async function deleteExercise({ id, loading: haveLoading = true, toast: haveToast = true } = {}) {
        const showErrorToast = () => {
            toast.error('No se ha podido eliminar el ejercicio. Inténtelo de nuevo más tarde.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });
        }

        // Comprobamos que se ha pasado un id correcto por parámetro
        if(typeof id !== "number") {
            console.error("ID PASADO POR PARÁMETRO INCORRECTO. NO SE ELIMINA EL EJERCICIO.");
            if(haveToast) {
                showErrorToast();
            }
            return false;
        } 

        if(haveLoading) {
            setLoading(true);
        }

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const deleted = await axios.delete(`/api/exercises/${id}`, config)
            .then(res => {
                console.dir(res);

                if(haveToast) {
                    toast.success('Ejercicio eliminado con éxito', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: theme === THEME.DARK ? 'dark' : 'light'
                    });
                }

                return true;
            })
            .catch(err => {
                console.error(err);
                if(haveToast) {
                    showErrorToast();
                }
                return false;
            });

        // Si se ha editado correctamente, volvemos a pedir los ejercicios
        if(deleted) {
            await fetchExercises({ loading: false });
        }

        if(haveLoading) {
            setLoading(false);
        }
        
        return deleted;
    }

    const value = {
        exercises, exercise, fetchExercises, fetchExercise, insertExercise, updateExercise, deleteExercise
    };

    return <ExercisesContext.Provider value={value}>{children}</ExercisesContext.Provider>;
}

export { ExercisesContext, ExercisesProvider };
