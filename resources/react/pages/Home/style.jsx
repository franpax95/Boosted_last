import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles from '../../styles';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { [THEME.LIGHT]: primaryLight, [THEME.DARK]: primaryDark } = color.primary;
const { [THEME.LIGHT]: secondaryLight, [THEME.DARK]: secondaryDark } = color.secondary;
const { [THEME.LIGHT]: tertiaryLight, [THEME.DARK]: tertiaryDark } = color.tertiary;
const { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: quaternaryDark } = color.quaternary;
const { [THEME.LIGHT]: textLight, [THEME.DARK]: textDark } = color.text;

export const StyledPalette = styled.div`
    width: 400px;
    height: 100px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);

    border: solid 1px ${theme('mode', { [THEME.LIGHT]: 'black', [THEME.DARK]: 'white' })};

    transition: border-color ${transitionDuration};

    div {
        transition: background-color ${transitionDuration};
    }

    div:nth-child(1) {
        background-color: ${theme('mode', { [THEME.LIGHT]: primaryLight.default, [THEME.DARK]: primaryDark.default })};

        &:hover { background-color: ${theme('mode', { [THEME.LIGHT]: primaryLight.hover, [THEME.DARK]: primaryDark.hover })}; }
        &:active { background-color: ${theme('mode', { [THEME.LIGHT]: primaryLight.active, [THEME.DARK]: primaryDark.active })}; }
    }

    div:nth-child(2) {
        background-color: ${theme('mode', { [THEME.LIGHT]: secondaryLight.default, [THEME.DARK]: secondaryDark.default })};

        &:hover { background-color: ${theme('mode', { [THEME.LIGHT]: secondaryLight.hover, [THEME.DARK]: secondaryDark.hover })}; }
        &:active { background-color: ${theme('mode', { [THEME.LIGHT]: secondaryLight.active, [THEME.DARK]: secondaryDark.active })}; }
    }

    div:nth-child(3) {
        background-color: ${theme('mode', { [THEME.LIGHT]: tertiaryLight.default, [THEME.DARK]: tertiaryDark.default })};

        &:hover { background-color: ${theme('mode', { [THEME.LIGHT]: tertiaryLight.hover, [THEME.DARK]: tertiaryDark.hover })}; }
        &:active { background-color: ${theme('mode', { [THEME.LIGHT]: tertiaryLight.active, [THEME.DARK]: tertiaryDark.active })}; }
    }

    div:nth-child(4) {
        background-color: ${theme('mode', { [THEME.LIGHT]: quaternaryLight.default, [THEME.DARK]: quaternaryDark.default })};

        &:hover { background-color: ${theme('mode', { [THEME.LIGHT]: quaternaryLight.hover, [THEME.DARK]: quaternaryDark.hover })}; }
        &:active { background-color: ${theme('mode', { [THEME.LIGHT]: quaternaryLight.active, [THEME.DARK]: quaternaryDark.active })}; }
    }
`;
