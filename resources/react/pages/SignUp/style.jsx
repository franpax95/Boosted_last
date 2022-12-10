import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles from '../../styles';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { [THEME.LIGHT]: primaryLight, [THEME.DARK]: primaryDark } = color.primary;
const { [THEME.LIGHT]: secondaryLight, [THEME.DARK]: secondaryDark } = color.secondary;
const { [THEME.LIGHT]: tertiaryLight, [THEME.DARK]: tertiaryDark } = color.tertiary;
const { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: quaternaryDark } = color.quaternary;


export const StyledSignUp = styled.section`
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
            [THEME.LIGHT]: lighten(quaternaryLight.default, 20), 
            [THEME.DARK]: darken(quaternaryDark.default, 20)
        })};


        @media only screen and (max-width: 450px) {
            height: 100%;
        }
    }
`;
