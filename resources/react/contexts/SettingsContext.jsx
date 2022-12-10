import React, { useState } from 'react';

import { ThemeProvider } from 'styled-components';
import { THEME } from '../states/theming';
import { LANG } from '../states/lang';
import { deleteArrayElement, validateState } from '../utils';


const SettingsContext = React.createContext([{}, () => {}]);

function SettingsProvider({ children }) {
    /** Tema actual de la aplicación (LIGHT / DARK) */
    const [theme, setThemeState] = useState(localStorage.getItem('theme') || THEME.DARK);
    /** Lenguaje actual de la aplicación (ESP / ENG) */
    const [lang, setLangState] = useState(localStorage.getItem('language') || LANG.ESP);
    /** Muestra un spinner de carga a pantalla completa si está activo */
    const [loading, setLoadingState] = useState(false);
    /** Array con los modales */
    const [modals, setModals] = useState([]);

    /**
     * Cambia el tema de la aplicación por el pasado por parámetro, si es válido.
     * Si no se especifica tema, hace toggle con el seteado actualmente.
     * @param newTheme (optional) 
     */
    function setTheme(newTheme) {
        // Si se pasa el tema a setear por parámetro y es válido...
        if(newTheme && validateState(THEME, newTheme)) {
            setThemeState(newTheme);
            localStorage.setItem('theme', newTheme);
        }

        // Si NO se pasa el tema a setear por parámetro...
        else if(!newTheme) {
            // Hacemos toggle
            const themeToSet = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
            setThemeState(themeToSet);
            localStorage.setItem('theme', themeToSet);
        }
    }

    /**
     * Cambia el lenguaje de la aplicación por el pasado por parámetro, si es válido.
     * Si no se especifica lenguaje, hace toggle con el seteado actualmente.
     * @param {*} newLang (optional)
     */
    function setLang(newLang) {
        // Si se pasa el lenguaje por parámetro y es válido...
        if(newLang && validateState(LANG, newLang)) {
            setLangState(newLang);
            localStorage.setItem('language', newLang);
        }

        // Si NO se pasa el tema a setear por parámetro...
        else {
            // Hacemos toggle
            const langToSet = lang === LANG.ESP ? LANG.ENG : LANG.ESP;
            setLangState(langToSet);
            localStorage.setItem('language', langToSet);
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
     * Abre un modal
     */
    function openModal({ title, content, onAccept, onCancel }) {
        console.dir(content);
        if(Array.isArray(content)) {
            setModals(prev => [...prev, { title, content, onAccept, onCancel }]);
        }
    }

    /** 
     * Cierra el último modal abierto, en caso de haber más de uno
     */
    function closeModal() {
        setModals(prev => prev.length ? deleteArrayElement(prev, prev.length - 1) : prev);
    }

    /** 
     * Cierra todos los mdoales abiertos
     */
    function closeAllModal() {
        setModals([]);
    }

    /**
     * Variables, estados y funciones a exportar en el contexto
     */
    const value = {
        theme, setTheme, lang, setLang, loading, setLoading,
        modals, openModal, closeModal, closeAllModal,
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
