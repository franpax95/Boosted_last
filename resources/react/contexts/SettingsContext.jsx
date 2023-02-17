import React, { useState } from 'react';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { LANG } from '../states/lang';
import { STORAGE } from '../states/storage';
import { THEME } from '../states/theming';
import { clone, deleteArrayElement, getRandomArbitrary, validateState } from '../utils';

const SettingsContext = React.createContext([{}, () => {}]);

function SettingsProvider({ children }) {
    /** Storage access */
    const storage = {
        get: key => {
            if (validateState(STORAGE,key)) {
                return localStorage.getItem(key);
            }

            return null;
        },
        set: (key, value) => {
            if (validateState(STORAGE, key)) {
                localStorage.setItem(key, value);
            }
        },
        remove: key => {
            if (validateState(STORAGE,key)) {
                localStorage.removeItem(key);
            }
        }
    };

    /** Tema actual de la aplicación (LIGHT / DARK) */
    const [theme, setThemeState] = useState(storage.get(STORAGE.THEME) || THEME.DARK);
    /** Lenguaje actual de la aplicación (ESP / ENG) */
    const [lang, setLangState] = useState(storage.get(STORAGE.LANGUAGE) || LANG.ESP);
    /** Muestra un spinner de carga a pantalla completa si está activo */
    const [loading, setLoadingState] = useState(false);
    /** Array con los modales */
    const [modals, setModals] = useState([]);

    /**
     * Función para devolver la configuración del toast
     */
    const toastConfig = ({ 
        position = 'top-center', 
        autoClose = 5000, 
        hideProgressBar = false, 
        closeOnClick = true,
        pauseOnHover = true,
        draggable = false,
        progress = undefined,
    } = {}) => {
        const toastTheme = theme === THEME.DARK ? 'dark' : 'light';

        return ({
            position,
            autoClose,
            hideProgressBar,
            closeOnClick,
            pauseOnHover,
            draggable,
            progress,
            theme: toastTheme
        });
    }

    /**
     * Cambia el tema de la aplicación por el pasado por parámetro, si es válido.
     * Si no se especifica tema, hace toggle con el seteado actualmente.
     * @param newTheme (optional) 
     */
    function setTheme(newTheme) {
        // Si se pasa el tema a setear por parámetro y es válido...
        if (newTheme && validateState(THEME, newTheme)) {
            setThemeState(newTheme);
            storage.set(STORAGE.THEME, newTheme);
        }

        // Si NO se pasa el tema a setear por parámetro...
        else if (!newTheme) {
            // Hacemos toggle
            const themeToSet = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
            setThemeState(themeToSet);
            storage.set(STORAGE.THEME, themeToSet);
        }
    }

    /**
     * Cambia el lenguaje de la aplicación por el pasado por parámetro, si es válido.
     * Si no se especifica lenguaje, hace toggle con el seteado actualmente.
     * @param {*} newLang (optional)
     */
    function setLang(newLang) {
        // Si se pasa el lenguaje por parámetro y es válido...
        if (newLang && validateState(LANG, newLang)) {
            setLangState(newLang);
            storage.set(STORAGE.LANGUAGE, newLang);
        }

        // Si NO se pasa el tema a setear por parámetro...
        else {
            // Hacemos toggle
            const langToSet = lang === LANG.ESP ? LANG.ENG : LANG.ESP;
            setLangState(langToSet);
            storage.set(STORAGE.LANGUAGE, langToSet);
        }
    }

    /**
     * Abre el spinner de carga de pantalla completa
     * @param {*} newLoading (optional)
     */
    function setLoading(newLoading) {
        const _loading = !!newLoading;
        setLoadingState(_loading);
    }

    /**
     * Open a modal.
     */
    function openModal({ title, content, onAccept, onCancel, align }) {
        let id = getRandomArbitrary(1, 100000);
        while (modals.some(modal => modal.id === id)) {
            id = getRandomArbitrary(1, 100000);
        }

        if (Array.isArray(content)) {
            setModals(prev => [...prev, { id, title, content, onAccept, onCancel, closeAnimation: false, align }]);
        }
    }

    /**
     * Fire close animation of a modal. 
     * Internally, when the animation ends, the modal is destroyed.
     */
    function closeModal(id) {
        setModals(prev => {
            if (prev.length === 0) {
                return [];
            } 

            const pos = prev.some(modal => modal.id === id) ? prev.findIndex(modal => modal.id === id) : prev.length - 1;
            let currentModals = [...prev];
            currentModals[pos].closeAnimation = true;
            return currentModals;
        });

        setTimeout(() => destroyModal(id), 500);
    }

    /** 
     * Close all opened modals.
     */
    function closeAllModal() {
        setModals(prev => prev.map(modal => ({ ...modal, closeAnimation: true })));
        setTimeout(() => setModals([]), 500);
    }

    /** 
     * Close a modal based on the id passed as argument.
     * If no id specified, close the last modal opened.
     */
    function destroyModal(id) {
        setModals(prev => {
            if (prev.length === 0) {
                return [];
            } 

            const pos = prev.some(modal => modal.id === id) ? prev.findIndex(modal => modal.id === id) : prev.length - 1;
            return deleteArrayElement(prev, pos);
        });
    }

    /**
     * Variables, estados y funciones a exportar en el contexto
     */
    const value = {
        storage,
        theme, setTheme, 
        lang, setLang, 
        loading, setLoading,
        modals, openModal, closeModal, closeAllModal,
        toastConfig, 
    };

    return (
        <SettingsContext.Provider value={value}>
            <ThemeProvider theme={{ mode: theme }}>
                {children}
            </ThemeProvider>
        </SettingsContext.Provider>
    );
}

export { SettingsContext, SettingsProvider };
