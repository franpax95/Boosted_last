import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { SettingsContext } from './SettingsContext';
import { clone } from '../utils';
import { toast } from 'react-toastify';
import { THEME } from '../states/theming';
import md5 from 'md5';


const UserContext = React.createContext([{}, () => {}]);

function UserProvider({ children }) {
    /** Settings */
    const { setLoading, theme } = useContext(SettingsContext);

    /** Información del usuario cargada en la aplicación */
    const [user, setUser] = useState(null);
    /** Indica si el usuario está actualmente autenticado en la aplicación */
    const [isAuth, setIsAuth] = useState(null);
    /** Token recibido durante el login para intercambiar con el servidor */
    const [token, setToken] = useState(null);


    /** Efecto que actualiza la información de sesión guardada cuando se actualizan las variables token o user */
    useEffect(() => {
        if(user !== null && token !== null) {
            saveSession();
        } else {
            removeSession();
        }
    }, [user, token]);

    /**
     * Comprueba si hay sesión almacenada y la recupera
     */
    function checkSession() {
        const sessionToken = localStorage.getItem('token');
        const sessionUser = localStorage.getItem('user');

        if(sessionToken !== null && sessionUser !== null) {
            setToken(sessionToken);
            setUser(JSON.parse(sessionUser));
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }

    /**
     * Guarda la sesión 
     */
    function saveSession() {
        if(user !== null && token !== null) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    /**
     * Elimina la sesión
     */
    function removeSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    /**
     * Realiza el registro
     */
    async function signup(name, email, password, passwordConfirmation) {
        setLoading(true);

        const body = { name, email, password: md5(password), password_confirmation: md5(passwordConfirmation) };
        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        await axios.post('/api/register', body, config)
            .then(response => {
                const { user, token } = response.data;
                setUser(user);
                setToken(token);
                setIsAuth(true);

                toast.success('Te has registrado en la aplicación con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: theme === THEME.DARK ? 'dark' : 'light'
                });
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
            });

        setLoading(false);
    }

    /**
     * Realiza el inicio de sesión
     */
    async function login(email, password) {
        setLoading(true);

        const body = { email, password: md5(password) };
        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        await axios.post('/api/login', body, config)
            .then(response => {
                const { user, token } = response.data;
                setUser(user);
                setToken(token);
                setIsAuth(true);

                toast.success('Has iniciado sesión con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: theme === THEME.DARK ? 'dark' : 'light'
                });
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
            });

        setLoading(false);
    }

    /**
     * Realiza el cierre de sesión
     */
    async function logout() {
        setLoading(true);

        const config = {
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const success = await axios.post('/api/logout', config)
            .then(response => {
                setUser(null);
                setToken(null);
                setIsAuth(false);

                toast.success('Has cerrado sesión con éxito', {
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

                return false;
            });

        setLoading(false);

        return success;
    }

    /**
     * Variables, estados y funciones a exportar en el contexto
     */
    const value = {
        isAuth, user, token, checkSession, signup, login, logout
    };

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>;
}

export { UserContext, UserProvider };
