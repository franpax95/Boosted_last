import styled from 'styled-components';
import styles, { quaternaryDark, quaternaryLight } from '../../styles/vars';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import { darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;

export const StyledLogin = styled.section`
    width: 100%;
    min-height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
        width: 100%;
        max-width: 450px;
        height: auto;
        padding: 2rem 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        justify-content: center;
        align-items: center;

        border-radius: 10px;
        background-color: ${theme('mode', { 
            [THEME.LIGHT]: lighten(quaternaryLight, 20), 
            [THEME.DARK]: darken(quaternaryDark, 20)
        })};


        @media only screen and (max-width: 450px) {
            height: 100%;
        }
    }
`;
