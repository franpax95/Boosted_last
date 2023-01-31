import { createGlobalStyle } from 'styled-components';
import styles from './vars';
import { memo } from 'react';

// Deestructuring styles variables
const { transitionDuration, color } = styles;
const { quaternary } = color;

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;

        outline: none;
        /* -webkit-appearance: none; */
        -webkit-tap-highlight-color: transparent;

        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-family: 'Montserrat';
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Syncopate';
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button,
    input[type=submit] {
        cursor: pointer;
        border: none;
    }

    input, 
    textarea {
        outline: 0;
    }

    html, 
    body, 
    #root {
        height: 100%;
        min-height: 100vh;
        width: 100%;

        background-color: ${quaternary.default};

        transition: background-color ${transitionDuration};
    }
`;

export default memo(GlobalStyle);
