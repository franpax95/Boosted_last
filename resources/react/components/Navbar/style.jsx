import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles from '../../styles';
import { Link } from 'react-router-dom';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { [THEME.LIGHT]: primaryLight, [THEME.DARK]: primaryDark } = color.primary;
const { [THEME.LIGHT]: secondaryLight, [THEME.DARK]: secondaryDark } = color.secondary;
const { [THEME.LIGHT]: tertiaryLight, [THEME.DARK]: tertiaryDark } = color.tertiary;
const { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: quaternaryDark } = color.quaternary;
const { [THEME.LIGHT]: textLight, [THEME.DARK]: textDark } = color.text;

export const navbarHeight = '50px';

export const StyledNavbar = styled.div`
    z-index: 1000;
    width: 100%;
    height: ${navbarHeight};
    padding: 0 .75rem;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background-color: ${theme('mode', { [THEME.LIGHT]: darken(quaternaryLight.default, 10), [THEME.DARK]: lighten(quaternaryDark.default, 10) })};
    background-color: ${theme('mode', { [THEME.LIGHT]: darken(tertiaryLight.default, 0), [THEME.DARK]: lighten(tertiaryDark.default, 0) })};

    font-size: ${font.md};

    transition:
        padding ${transitionDuration},
        background-color ${transitionDuration},
        color ${transitionDuration},
        font-size ${transitionDuration};

    @media (min-width: ${media.sm}px) {
        padding: 0 1.5rem;
    }

    @media (min-width: ${media.md}px) {
        padding: 0 2rem;
    }

    @media (min-width: ${media.lg}px) {
        padding: 0 3rem;
    }

    .burger {
        width: 40px;
        display: block;
        background-color: transparent;

        @media (min-width: ${media.md}px) {
            display: none;
        }
    }
`;

export const Logo = styled(Link)`
    width: auto;

    display: flex;
    gap: .5rem;
    align-items: center;

    color: ${theme('mode', { [THEME.LIGHT]: textLight, [THEME.DARK]: textDark })};

    font-size: ${font.xl};
    font-weight: bold;

    transition: color ${transitionDuration}, font-size ${transitionDuration};

    svg:nth-child(1) {
        transform: scale(1.5);
    }

    svg:nth-child(3) {
        transform: scale(1.5) rotate(70deg);
    }

    @media (min-width: ${media.md}px) {
        width: 200px;
    }
`;

export const Links = styled.div`
    display: none;
    flex-direction: row;
    gap: .25rem;
    align-items: center;
    justify-content: center;

    transition: opacity ${transitionDuration};

    @media (min-width: ${media.md}px) {
        display: flex;
    }
`;

export const StyledLink = styled(Link)`
    padding: .5rem;

    color: ${theme('mode', { [THEME.LIGHT]: textLight, [THEME.DARK]: textDark })};

    font-weight: bold;
    letter-spacing: 1px;

    transition: color ${transitionDuration};

    &:hover {
        color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 35), [THEME.DARK]: darken(textDark, 40) })};
    }

    &:active {
        color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 50), [THEME.DARK]: darken(textDark, 60) })};
    }

    &:disabled {
        color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 80), [THEME.DARK]: darken(textDark, 80) })};
    }
`;

export const StyledSettingsDropdown = styled.div`
    width: 40px;
    height: 100%;

    position: relative;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (min-width: ${media.md}px) {
        width: 200px;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0);
        color: ${theme('mode', { [THEME.LIGHT]: textLight, [THEME.DARK]: textDark })};

        font-size: ${font.xl};

        transition: color ${transitionDuration};

        &:hover {
            color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 35), [THEME.DARK]: darken(textDark, 40) })};
        }

        &:active {
            color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 50), [THEME.DARK]: darken(textDark, 60) })};
        }

        &:disabled {
            color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 80), [THEME.DARK]: darken(textDark, 80) })};
        }
    }

    .dropdown {
        z-index: 1;
        pointer-events: none;
        width: 100vw;
        width: fit-content;
        min-width: 300px;
        max-width: min(95vw, 450px);
        padding: 1rem 2rem;

        position: absolute;
        top: 110%;
        right: 0;

        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        justify-content: center;
        align-items: center;

        opacity: 0;
        border: solid 1px ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(darken(primaryLight.default, 8), .25), [THEME.DARK]: addOpacityToHex(lighten(primaryDark.default, 50), .25) })};
        border-radius: 12px;
        background-color: ${theme('mode', { [THEME.LIGHT]: darken(quaternaryLight.default, 8), [THEME.DARK]: lighten(quaternaryDark.default, 20) })};
        color: ${theme('mode', { [THEME.LIGHT]: darken(primaryLight.default, 8), [THEME.DARK]: lighten(primaryDark.default, 50) })};
        box-shadow: 0px 3px 10px -5px ${theme('mode', { [THEME.LIGHT]: darken(primaryLight.default, 8), [THEME.DARK]: lighten(primaryDark.default, 50) })};

        transition: 
            opacity .25s,
            border-color ${transitionDuration},
            background-color ${transitionDuration},
            color ${transitionDuration},
            box-shadow ${transitionDuration};

        &.active {
            pointer-events: initial;
            opacity: 1;
        }

        .spacer {
            width: 60%;
            height: 1.5px;
            background-color: ${theme('mode', { [THEME.LIGHT]: darken(primaryLight.default, 8), [THEME.DARK]: lighten(primaryDark.default, 50) })};
            transition: background-color ${transitionDuration};
        }

        .title {
            font-size: ${font.lg};

            transition: font-size ${transitionDuration};

            @media (min-width: ${media.md}px) {
                font-size: 1.5em;
            }
        }

        .user-card {
            width: 100%;
            display: grid;
            column-gap: .5rem;
            row-gap: .25rem;
            grid-template-columns: 50px 1fr;
            grid-template-areas:
                'avatar alias'
                'avatar email';
            justify-content: center;
            align-items: center;

            .avatar {
                grid-area: avatar;

                display: flex;
                justify-content: center;
                align-items: center;

                font-size: ${font.xxl};
            }

            .alias {
                grid-area: alias;
                font-size: ${font.lg};
                font-weight: bold;
            }

            .email {
                grid-area: email;
                font-size: ${font.md};
            }
        }
    }
`;

export const StyledSidebar = styled.div`
    width: 40px;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (min-width: ${media.md}px) {
        display: none;
    }

    .BurgerButton {
        z-index: 3;
    }

    .sidebar {
        --sidebar-width: 250px;

        z-index: 2;
        width: 250px;
        width: var(--sidebar-width, 250px);
        height: 100%;
        padding-top: 5rem;

        position: fixed;
        top: 0;
        left: -250px;
        left: calc(-1 * var(--sidebar-width, 250px));

        display: flex;
        flex-direction: column;

        background-color: ${theme('mode', { [THEME.LIGHT]: primaryLight.default, [THEME.DARK]: primaryDark.default })};

        transition: 
            left ${transitionDuration},
            background-color ${transitionDuration};

        &.open {
            left: 0;
        }
    }
`;
