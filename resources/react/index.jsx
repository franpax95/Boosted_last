import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { SettingsProvider } from './contexts/SettingsContext';
import { FetchingProvider } from './contexts/FetchContext';
import { UserProvider } from './contexts/UserContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { ExercisesProvider } from './contexts/ExercisesContext';
import { RoutinesProvider } from './contexts/RoutinesContext';
import { ReducerProvider } from './contexts/ReducerContext';

import { GlobalStyle } from './styles/global';
import App from './components/App';
import './styles/fonts.css';

const app = ReactDOMClient.createRoot(document.getElementById('root'));

// Kaaaameeee, haaaaaa meeee.....
app.render(
    <SettingsProvider>
        <FetchingProvider>
            <UserProvider>
                <CategoriesProvider>
                    <ExercisesProvider>
                        <RoutinesProvider>
                            <ReducerProvider>
                                <BrowserRouter>
                                    <GlobalStyle />
                                    <App />
                                </BrowserRouter>
                            </ReducerProvider>
                        </RoutinesProvider>
                    </ExercisesProvider>
                </CategoriesProvider>
            </UserProvider>
        </FetchingProvider>
    </SettingsProvider>
);
