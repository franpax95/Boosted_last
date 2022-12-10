import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clone } from '../utils';
import { SettingsContext } from './SettingsContext';
import { UserContext } from './UserContext';
import { THEME } from '../states/theming';


const CategoriesContext = React.createContext([{}, () => {}]);

function CategoriesProvider({ children }) {
    /** Settings */
    const { setLoading, theme } = useContext(SettingsContext);
    /** Auth */
    const { token } = useContext(UserContext);

    /** Categorías cargadas en la aplicación */
    const [categories, setCategoriesState] = useState(null);
    /** Categoría cargada en la aplicación (para ver detalles de una categoría o editarla) */
    const [category, setCategoryState] = useState(null);


    /**
     * Consulta las categorías disponibles para el usuario y las setea en la aplicación, si no estuvieran.
     * Devuelve una copia de las categorías cargadas en la aplicación.
     */
    async function fetchCategories({ loading: haveLoading = true, toast: haveToast = true } = {}) {
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

        const cs = await axios.get('/api/categories', config)
            .then(response => {
                console.dir(response);

                const { categories } = response.data;
                setCategoriesState(categories);
                return categories;
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

                setCategoriesState([]);
                return [];
            });

        if(haveLoading) {
            setLoading(false);
        }

        return cs;
    }

    /**
     * Devuelve una categoría según el id pasado por parámetro, o null si no se encuentra
     * entre las categorías disponibles para el usuario. 
     * Si se especifica force a true, realiza la llamada independientemente del valor de category.
     */
    async function fetchCategory({ id, force = false, loading: haveLoading = true, toast: haveToast = true } = {}) {
        // Pedimos categoría si no hay seteada o si la que hay seteada no es la que se está pidiendo
        if(force === true || category === null || (category !== null && category.id !== id)) {
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

            const cat = await axios.get(`/api/categories/${id}`, config)
                .then(response => {
                    console.dir(response);

                    const { category } = response.data;
                    setCategoryState(category);
                    return category;
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

                    setCategoryState(null);
                    return null;
                });

            if(haveLoading) {
                setLoading(false);
            }

            return cat;
        }

        return category;
    }

    /**
     * Inserta una categoría. Si se inserta correctamente, vuelve a pedir las categorías.
     * Devuelve true o false indicando si la inserción ha tenido éxito.
     */
    async function insertCategory({ category, loading: haveLoading = true, toast: haveToast = true } = {}) {
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

        const cat = await axios.post('/api/categories', category, config)
            .then(res => {
                console.dir(res);

                const { category } = res.data;

                if(haveToast) {
                    toast.success('Categoría insertada con éxito', {
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

                return category;
            })
            .catch(err => {
                console.error(err);

                if(haveToast) {
                    toast.error('No se ha podido insertar la categoría', {
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
        
        // Si se ha insertado correctamente, volvemos a pedir las categorías
        if(cat) {
            await fetchCategories({ loading: false });
        }

        if(haveLoading) {
            setLoading(false);
        }

        return cat;
    }

    /**
     * Edita una categoría. Si se edita correctamente, vuelve a pedir la categoría.
     * Devuelve true o false indicando si la edición ha tenido éxito.
     */
    async function updateCategory({ category, loading: haveLoading = true, toast: haveToast = true } = {}) {
        const showErrorToast = () => {
            toast.error('No se ha podido editar la categoría. Inténtelo de nuevo más tarde.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });
        }

        // Comprobamos que se ha seteado un id correcto en la categoría
        if(typeof category.id !== "number") {
            console.error("INTENTANDO EDITAR UNA CATEGORÍA SIN ID");
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

        const edited = await axios.put(`/api/categories/${category.id}`, category, config)
            .then(res => {
                console.dir(res);

                if(haveToast) {
                    toast.success('Categoría editada con éxito', {
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
                showErrorToast();
                return false;
            });
        
        // Si se ha editado correctamente, volvemos a pedir la categoría
        if(edited) {
            await fetchCategory({ id: category.id, force: true, loading: false });
        }

        if(haveLoading) {
            setLoading(false);
        }

        return edited;
    }

    /**
     * Elimina una categoría. Si se elimina correctamente, vuelve a pedir las categorías.
     * Devuelve true o false indicando si el borrado ha tenido éxito.
     */
    async function deleteCategory({ id, loading: haveLoading = true, toast: haveToast = true } = {}) {
        const showErrorToast = () => {
            toast.error('No se ha podido eliminar la categoría. Inténtelo de nuevo más tarde.', {
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
            console.error("ID PASADO POR PARÁMETRO INCORRECTO. NO SE ELIMINA LA CATEGORÍA.");
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

        const deleted = await axios.delete(`/api/categories/${id}`, config)
            .then(res => {
                console.dir(res);

                if(haveToast) {
                    toast.success('Categoría eliminada con éxito', {
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
                showErrorToast();
                return false;
            });

        // Si se ha editado correctamente, volvemos a pedir las categorías
        if(deleted) {
            await fetchCategories({ loading: false });
        }

        if(haveLoading) {
            setLoading(false);
        }
        
        return deleted;
    }

    const value = {
        categories, category, fetchCategories, fetchCategory, insertCategory, updateCategory, deleteCategory
    };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

export { CategoriesContext, CategoriesProvider };
