import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles from '../../styles';
import { PrimaryButtonCSS } from '../Button/style';
import { Link } from 'react-router-dom';

const { color, font, media, transitionDuration } = styles;
const { [THEME.LIGHT]: primaryLight, [THEME.DARK]: primaryDark } = color.primary;
const { [THEME.LIGHT]: secondaryLight, [THEME.DARK]: secondaryDark } = color.secondary;
const { [THEME.LIGHT]: tertiaryLight, [THEME.DARK]: tertiaryDark } = color.tertiary;
const { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: quaternaryDark } = color.quaternary;

export const StyledPrimaryLink = styled(Link)`
    ${PrimaryButtonCSS};
`;

export const StyledAnimatedRowLink = styled(Link)`
    width: 100%;
    height: 100px;

    position: relative;

    overflow: hidden;

    .front {
        width: 100%;
        height: 100%;
        padding: .5rem;
        padding-left: 4.5rem;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        border-right: solid 1px ${theme('mode', { [THEME.LIGHT]: quaternaryLight.default, [THEME.DARK]: quaternaryDark.default })};
        border-bottom: solid 1px ${theme('mode', { [THEME.LIGHT]: quaternaryLight.default, [THEME.DARK]: quaternaryDark.default })};
        background-color: ${theme('mode', { [THEME.LIGHT]: primaryLight.default, [THEME.DARK]: primaryDark.default })};
        color: ${theme('mode', { [THEME.LIGHT]: quaternaryLight.default, [THEME.DARK]: quaternaryDark.default })};

        font-size: ${font.lg};
        font-weight: bold;

        transition:
            background-color ${transitionDuration},
            color ${transitionDuration},
            transform ${transitionDuration};
    }

    &:hover .front {
        transform: translate(-2.5rem, -1rem);
    }

    .back {
        z-index: -1;
        width: 100%;
        height: 100%;
        padding: .75rem;

        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        background-color: ${theme('mode', { [THEME.LIGHT]: quaternaryLight.default, [THEME.DARK]: quaternaryDark.default })};

        transition:
            background-color ${transitionDuration},
            color ${transitionDuration},
            padding ${transitionDuration};

        .icon {
            color: ${theme('mode', { [THEME.LIGHT]: primaryLight.default, [THEME.DARK]: primaryDark.default })};
            font-size: ${font.lg};
        }
    }

    &:active .back {
        padding: .25rem;
    }
`;
