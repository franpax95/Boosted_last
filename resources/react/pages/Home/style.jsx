import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles, { quaternaryDark, quaternaryLight } from '../../styles/vars';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledHome = styled.section`
    width: 100%;
    height: 100%;

    position: relative;

    overflow-x: hidden;
    /* background-color: yellow; */

    .home-title {
        z-index: 4;

        position: absolute;
        bottom: 50%;
        left: 50%;

        display: flex;
        flex-direction: column;
        gap: .5rem;
        justify-content: center;
        align-items: center;

        background-color: ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(quaternaryLight, .5), [THEME.DARK]: addOpacityToHex(quaternaryDark, .5) })};


        transform: translateX(-50%) translateY(50%);
        transition: background-color ${transitionDuration}, font-size .1s;

        font-size: 108px;
        @media (max-width: 1100px) { font-size: 92px; }
        @media (max-width: 950px) { font-size: 78px; }
        @media (max-width: 800px) { font-size: 62px; }
        @media (max-width: 650px) { font-size: 48px; }
        @media (max-width: 500px) { font-size: 36px; }

        &.esp {
            font-size: 66px;
            @media (max-width: 1100px) { font-size: 56px; }
            @media (max-width: 950px) { font-size: 42px; }
            @media (max-width: 800px) { font-size: 32px; }
            @media (max-width: 650px) { font-size: 24px; }
            @media (max-width: 500px) { font-size: 18px; }
        }

        span {
            font-family: 'Syncopate';
            text-transform: uppercase;
            white-space: nowrap;
            transition: color ${transitionDuration};
        }

        span:not(.colored) {
            color: ${theme('mode', { [THEME.LIGHT]: '#666666', [THEME.DARK]: '#a6a6a6' })};
        }

        .colored {
            font-size: 1.2em;
            color: ${primary.default};
        }
    }

    .info {
        z-index: 5;

        width: 100%;
        max-width: min(400px, 90%);

        position: absolute;
        bottom: 5%;
        left: 5%;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        background-color: ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(quaternaryLight, .5), [THEME.DARK]: addOpacityToHex(quaternaryDark, .5) })};

        transition: background-color ${transitionDuration};

        h3 {
            color: ${primary.default};
            font-family: 'Syncopate';
            text-transform: uppercase;
            font-size: ${font.lg};
        }

        p {
            color: ${color.text};
            font-size: ${font.md};
            transition: color ${transitionDuration}, font-size .1s;
        }

        a {
            width: fit-content;
            padding: 1.5rem 4rem;

            border: solid 1px ${primary.default};
            background-color: rgba(255, 255, 255, 0);
            color: ${color.text};

            text-transform: uppercase;

            transition: 
                border-color ${transitionDuration}, 
                background-color ${transitionDuration}, 
                color ${transitionDuration};

            &:hover {
                border-color: ${primary.hover};
                background-color: ${theme('mode', { [THEME.LIGHT]: 'rgba(0, 0, 0, .1)', [THEME.DARK]: 'rgba(255, 255, 255, .1)' })};
            }
        }
    }

    .img-1 {
        z-index: 1;
        user-select: none;

        width: 30%;
        width: clamp(60px, 30vw, 240px);
        height: 60%;
        height: clamp(120px, 60vh, 480px);

        position: absolute;
        top: 15%;
        left: 5%;
    }

    .img-2 {
        z-index: 2;
        user-select: none;

        height: 40%;
        height: clamp(80px, 40vh, 320px);
        width: 60%;
        width: clamp(120px, 60vw, 480px);

        position: absolute;
        bottom: 0%;
        left: 40%;
    }

    .img-3 {
        z-index: 3;
        user-select: none;

        height: min(75vh, 75%);
        width: min(75vh, 75%);
        min-width: 400px;
        min-height: 400px;

        position: absolute;
        top: 0%;
        right: 0%;

        clip-path: polygon(0 100%, 0 0, 20% 0, 20% 60%, 75% 0, 100% 0, 40% 70%, 90% 70%, 90% 100%);
    }
`;
