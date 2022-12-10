import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { StyledLayout } from './style';
import { ROUTES_WITHOUT_NAVBAR } from '../App';

/**
 * Layout de la aplicación principal.
 * Debido a la transición animada entre rutas, actualmente sólo sirve para dejar un margen superior
 * correspondiente a la altura de la barra de navegación.
 */
export const Layout = () => {
    const location = useLocation();

    return (
        <StyledLayout isNavbarVisible={!ROUTES_WITHOUT_NAVBAR.includes(location.pathname)}>
            <div className="layout-content">
                <Outlet />
            </div>
        </StyledLayout>
    );
}

export default Layout;
