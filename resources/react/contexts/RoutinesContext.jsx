import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clone } from '../utils';
import { SettingsContext } from './SettingsContext';
import { UserContext } from './UserContext';
import { THEME } from '../states/theming';


const RoutinesContext = React.createContext([{}, () => {}]);

function RoutinesProvider({ children }) {
    /** Settings */
    const { setLoading, theme } = useContext(SettingsContext);
    /** Auth */
    const { token } = useContext(UserContext);

    /** Rutinas cargadas en la aplicación */
    const [routines, setRoutinesState] = useState(null);
    /** Rutina cargada en la aplicación (para ver detalles de una rutina o editarla) */
    const [routine, setRoutineState] = useState(null);


    /**
     * Consulta las rutinas disponibles para el usuario y las setea en la aplicación, si no estuvieran.
     * Devuelve una copia de las rutinas cargadas en la aplicación.
     */
    async function fetchRoutines() {
        setLoading(true);

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const rs = await axios.get('/api/routines', config)
            .then(response => {
                console.dir(response);

                const { routines } = response.data;
                setRoutinesState(routines);
                return routines;
            })
            .catch(error => {
                console.error(error);

                toast.error(error.response.data.message, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: theme === THEME.DARK ? 'dark' : 'light'
                });

                setRoutinesState([]);
                return [];
            });

        setLoading(false);

        return rs;
    }

    /**
     * Devuelve una rutina según el id pasado por parámetro, o null si no se encuentra
     * entre las rutinas disponibles para el usuario. 
     * Si se especifica force a true, realiza la llamada independientemente del valor de routine.
     */
    async function fetchRoutine(id, force) {
        // Pedimos categoría si no hay seteada o si la que hay seteada no es la que se está pidiendo
        if(force === true || routine === null || (routine !== null && routine.id !== id)) {
            setLoading(true);

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const rout = await axios.get(`/api/routines/${id}`, config)
                .then(response => {
                    console.dir(response);

                    const { routine } = response.data;
                    if(routine) {
                        setRoutineState(routine);
                    }
                    return routine;
                })
                .catch(error => {
                    console.error(error);

                    toast.error(error.response.data.message, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: theme === THEME.DARK ? 'dark' : 'light'
                    });

                    setRoutineState(null);
                    return null;
                });

            setLoading(false);

            return rout;
        }

        return routine;
    }

    /**
     * Inserta una rutina. Si se inserta correctamente, vuelve a pedir las rutinas.
     * Devuelve true o false indicando si la inserción ha tenido éxito.
     */
    async function insertRoutine(routine) {
        setLoading(true);

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const inserted = await axios.post('/api/routines', routine, config)
            .then(res => {
                console.dir(res);

                toast.success('Rutina insertada con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: theme === THEME.DARK ? 'dark' : 'light'
                });

                return true;
            })
            .catch(err => {
                console.error(err);

                toast.error('No se ha podido insertar la rutina', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: theme === THEME.DARK ? 'dark' : 'light'
                });
                
                return false;
            });
        
        // Si se ha insertado correctamente, volvemos a pedir las rutinas
        if(inserted) {
            await fetchRoutines();
        }

        setLoading(false);

        return inserted;
    }

    /**
     * Edita una rutina. Si se edita correctamente, vuelve a pedir la rutina.
     * Devuelve true o false indicando si la edición ha tenido éxito.
     */
    async function updateRoutine(routine) {
        const showErrorToast = () => {
            toast.error('No se ha podido editar la rutina. Inténtelo de nuevo más tarde.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });
        }

        // Comprobamos que se ha seteado un id correcto en la rutina
        if(typeof routine.id !== "number") {
            console.error("INTENTANDO EDITAR UNA RUTINA SIN ID");
            showErrorToast();
            return false;
        }   

        setLoading(true);

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const edited = await axios.put(`/api/routines/${routine.id}`, routine, config)
            .then(res => {
                console.dir(res);

                toast.success('Rutina editada con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: theme === THEME.DARK ? 'dark' : 'light'
                });

                return true;
            })
            .catch(err => {
                console.error(err);
                showErrorToast();
                return false;
            });
        
        // Si se ha editado correctamente, volvemos a pedir la rutina
        if(edited) {
            await fetchRoutine(routine.id, true);
        }

        setLoading(false);

        return edited;
    }

    /**
     * Elimina una rutina. Si se elimina correctamente, vuelve a pedir las rutinas.
     * Devuelve true o false indicando si el borrado ha tenido éxito.
     */
    async function deleteRoutine(id) {
        const showErrorToast = () => {
            toast.error('No se ha podido eliminar la rutina. Inténtelo de nuevo más tarde.', {
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
            console.error("ID PASADO POR PARÁMETRO INCORRECTO. NO SE ELIMINA LA RUTINA.");
            showErrorToast();
            return false;
        } 

        setLoading(true);

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const deleted = await axios.delete(`/api/routines/${id}`, config)
            .then(res => {
                console.dir(res);

                toast.success('Rutina eliminada con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: theme === THEME.DARK ? 'dark' : 'light'
                });

                return true;
            })
            .catch(err => {
                console.error(err);
                showErrorToast();
                return false;
            });

        // Si se ha editado correctamente, volvemos a pedir las categorías
        if(deleted) {
            await fetchRoutines();
        }

        setLoading(false);
        
        return deleted;
    }

    const value = {
        routines, routine, fetchRoutines, fetchRoutine, insertRoutine, updateRoutine, deleteRoutine
    };

    return <RoutinesContext.Provider value={value}>{children}</RoutinesContext.Provider>;
}

export { RoutinesContext, RoutinesProvider };
