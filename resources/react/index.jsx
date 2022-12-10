import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { SettingsProvider } from './contexts/SettingsContext';
import { UserProvider } from './contexts/UserContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { ExercisesProvider } from './contexts/ExercisesContext';
import { RoutinesProvider } from './contexts/RoutinesContext';

import { GlobalStyle } from './styles/global';
import App from './components/App';


const app = ReactDOMClient.createRoot(document.getElementById('root'));

// Kaaaameeee, haaaaaa meeee.....
app.render(
    <SettingsProvider>
        <UserProvider>
            <CategoriesProvider>
                <ExercisesProvider>
                    <RoutinesProvider>
                        <BrowserRouter>
                            <GlobalStyle />
                            <App />
                        </BrowserRouter>
                    </RoutinesProvider>
                </ExercisesProvider>
            </CategoriesProvider>
        </UserProvider>
    </SettingsProvider>
);
