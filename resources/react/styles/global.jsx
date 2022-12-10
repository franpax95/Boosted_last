import { createGlobalStyle } from 'styled-components';
import theme from 'styled-theming';
import styles from './index';
import { THEME } from '../states/theming';

// Deestructuring styles variables
const { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: quaternaryDark } = styles.color.quaternary;
const { transitionDuration } = styles;

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;

        outline: none;
        /* -webkit-appearance: none; */
        -webkit-tap-highlight-color: transparent;

        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    #app {
        height: 100%;
        width: 100%;

        background-color: ${theme('mode', { [THEME.LIGHT]: quaternaryLight.default, [THEME.DARK]: quaternaryDark.default })};

        transition: background-color ${transitionDuration};
    }
`;

export default GlobalStyle;
