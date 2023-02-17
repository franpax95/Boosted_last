import React, { useContext, useEffect, Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { useTransition } from 'react-spring';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal';
import { SettingsContext } from '../contexts/SettingsContext';
import { ScreenSpinner } from './Spinner';
import { UserContext } from '../contexts/UserContext';
import Sidebar from './Navbar';
import Layout from './Layout';
import { StyledAppLayout, AnimatedWrapper, StyledApp } from './AppStyle';

const NotFound = lazy(() => import('../pages/NotFound'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Categories = lazy(() => import('../pages/Categories'));
const CategoriesAdd = lazy(() => import('../pages/CategoriesAdd'));
const Category = lazy(() => import('../pages/Category'));
const Exercises = lazy(() => import('../pages/Exercises'));
const ExercisesAdd = lazy(() => import('../pages/ExercisesAdd'));
const ExercisesEdit = lazy(() => import('../pages/ExercisesEdit'));
const Exercise = lazy(() => import('../pages/Exercise'));
const RoutinesAdd = lazy(() => import('../pages/RoutinesAdd'));
const Routines = lazy(() => import('../pages/Routines'));
const Routine = lazy(() => import('../pages/Routine'));
const RoutinesEdit = lazy(() => import('../pages/RoutinesEdit'));

/** 
 * Array con las URLs en las que el Navbar no debe ser mostrado. 
 * Usado también en el Layout para aplicar un margin-top correspondiente a la altura del Navbar.
 */
export const ROUTES_WITHOUT_NAVBAR = [
    "/login",
    "/signup",
    // "/notfound"
];

/**
 * Main Application
 */
export default function App(props) {
    /** Settings Context */
    const { loading, modals } = useContext(SettingsContext);
    /** Auth */
    const { checkSession, isAuth } = useContext(UserContext);

    /** Transitioning between routes */
    const location = useLocation();
    const transition = useTransition(location, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        update: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 250 }
    });

    /** Comprueba si hay una sesión almacenada al inicio de la aplicación */
    useEffect(checkSession, []);

    // No retornamos la App principal hasta que comprobamos la sesión, es decir,
    // isAuth es un valor booleano distinto de null
    if (isAuth === null) {
        return '';
    }

    return (
        <StyledAppLayout>
            {/** Route contents */}
            <StyledApp>
                {transition((style, location) => <AnimatedWrapper style={style}>
                    <Routes location={location}>
                        {/** Login */}
                        <Route exact path="/login" element={
                            <RequireNoAuth>
                                <Login />
                            </RequireNoAuth>
                        } />

                        {/** SignUp */}
                        <Route exact path="/signup" element={
                            <RequireNoAuth>
                                <SignUp />
                            </RequireNoAuth>
                        } />

                        {/** 
                         * Routes with Layout
                         */}
                        {/* <Route element={<Layout />}> */}
                            {/** Inicio/Home */}
                            <Route exact path="/" element={
                                <Suspense>
                                    <Home />
                                </Suspense>
                            } />

                            {/**
                             * Categorías
                             */}
                            <Route exact path="/categories" element={
                                <RequireAuth>
                                    <Categories />
                                </RequireAuth>
                            } />
                            <Route exact path="/categories/:id" element={
                                <RequireAuth>
                                    <Category />
                                </RequireAuth>
                            } />
                            <Route exact path="/categories/add" element={
                                <RequireAuth>
                                    <CategoriesAdd />
                                </RequireAuth>
                            } />

                            {/**
                             * Ejercicios
                             */}
                            <Route exact path="/exercises" element={
                                <RequireAuth>
                                    <Exercises />
                                </RequireAuth>
                            } />
                            <Route exact path="/exercises/:id" element={
                                <RequireAuth>
                                    <Exercise />
                                </RequireAuth>
                            } />
                            <Route exact path="/exercises/add" element={
                                <RequireAuth>
                                    <ExercisesAdd />
                                </RequireAuth>
                            } />
                            <Route exact path="/exercises/edit/:id" element={
                                <RequireAuth>
                                    <ExercisesEdit />
                                </RequireAuth>
                            } />

                            {/**
                             * Rutinas
                             */}
                            <Route exact path="/routines" element={
                                <RequireAuth>
                                    <Routines />
                                </RequireAuth>
                            } />
                            <Route exact path="/routines/:id" element={
                                <RequireAuth>
                                    <Routine />
                                </RequireAuth>
                            } />
                            <Route exact path="/routines/add" element={
                                <RequireAuth>
                                    <RoutinesAdd />
                                </RequireAuth>
                            } />
                            <Route exact path="/routines/edit/:id" element={
                                <RequireAuth>
                                    <RoutinesEdit />
                                </RequireAuth>
                            } />

                            {/** Ruta por defecto (404: NotFound) */}
                            <Route path="*" element={<NotFound />} />
                        {/* </Route> */}
                    </Routes>
                </AnimatedWrapper>)}
            </StyledApp>

            {/** Navbar */}
            {!ROUTES_WITHOUT_NAVBAR.includes(location.pathname) && <Sidebar />}

            {/** Loading */}
            {loading && <ScreenSpinner />}

            {/** Toasts: react-toastify */}
            <ToastContainer />

            {/** Modals */}
            {modals.map((conf, index) => <Modal key={index} {...conf} level={index} />)}
        </StyledAppLayout>
    );
}

/**
 * Auth Routing Wrapper.
 * Protege las principales rutas de la aplicación.
 */
function RequireAuth({ children }) {
    const { isAuth } = useContext(UserContext);
    const location = useLocation();

    if (!isAuth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Suspense fallback={''}>{children}</Suspense>;
}

/**
 * NO Auth Routing Wrapper.
 * Proteger las rutas de inicio de sesión, registro...
 */
function RequireNoAuth({ children }) {
    const { isAuth } = useContext(UserContext);
    const location = useLocation();

    if (isAuth) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Suspense fallback={''}>{children}</Suspense>;
}
