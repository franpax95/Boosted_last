import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles, { textDark, textLight } from '../../styles/vars';
import { darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;

export const StyledAnimatedButton = styled.button`
    z-index: 1;
    width: fit-content;
    padding: 1.5rem 4rem;

    position: relative;

    display: block;

    background-color: rgba(0, 0, 0, 0);
    color: ${color.text};

    font-size: ${font.md};
    text-transform: uppercase;
    text-align: center;

    transition: color ${transitionDuration}, background-color ${transitionDuration};

    & span {
        z-index: 1;
        position: absolute;
        transition-property: all;
        transition-duration: .2s;
        transition-timing-function: ease-out;
    }

    & .border {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px solid ${primary.default};
        background-color: rgba(0, 0, 0, 0);
    }

    & .top,
    & .bottom,
    & .left,
    & .right {
        height: 1px;
        width: 0;
        background-color: ${primary.default};
    }

    & .left,
    & .right {
        height: 0;
        width: 1px;
    }

    & .top {
        top: -5px;
        left: -15px;
    }

    & .bottom {
        bottom: -5px;
        right: -15px;
    }

    & .left {
        top: -15px;
        right: -5px;
    }

    & .right {
        bottom: -15px;
        left: -5px;
    }

    &:hover {
        .border {
            background-color: ${theme('mode', { [THEME.LIGHT]: 'rgba(0, 0, 0, .1)', [THEME.DARK]: 'rgba(255, 255, 255, .1)' })};
        }
    }

    &:hover .border {
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
    }

    &:hover .top,
    &:hover .bottom {
        width: 230px;
    }

    &:hover .left,
    &:hover .right {
        height: 40px;
    }

    &:hover .top {
        left: -5px;
    }

    &:hover .bottom {
        right: -5px;
    }

    &:hover .left {
        top: -5px;
    }

    &:hover .right {
        bottom: -5px;
    }

    & .text {
        position: relative;
        letter-spacing: .03em;
    }
`;

/**
 * Burger Button
 */
export const StyledBurgerButton = styled.button`
    --td: .7s;      /** Transition Duration */
    --htd: .35s;    /** HALF Transition Duration */

    width: 50px;
    height: 28px;

    position: relative;

    cursor: pointer;
    outline: none;
    border: none;
    background: rgba(0, 0, 0, 0);

    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: var(--td, .5s) ease-in-out;
    -moz-transition: var(--td, .5s) ease-in-out;
    -o-transition: var(--td, .5s) ease-in-out;
    transition: var(--td, .5s) ease-in-out;

    /** To center easily */
    &.open {
        transform: translateX(5px);
    }

    span {
        height: 4px;
        width: 100%;

        position: absolute;
        left: 0;
        
        display: block;

        opacity: 1;
        background: ${primary.default};

        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: var(--td, .25s) ease-in-out;
        -moz-transition: var(--td, .25s) ease-in-out;
        -o-transition: var(--td, .25s) ease-in-out;
        transition: var(--td, .25s) ease-in-out;
    }

    span:nth-child(1) {
        top: 0px;
    }

    span:nth-child(2) {
        top: 12px;
    }

    span:nth-child(3) {
        top: 24px;
    }

    &.open span:nth-child(1) {
        width: 75%;
        top: 12px;
        -webkit-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -o-transform: rotate(135deg);
        transform: rotate(135deg);
    }

    &.open span:nth-child(2) {
        opacity: 0;
        left: -60px;
    }

    &.open span:nth-child(3) {
        width: 75%;
        top: 12px;
        -webkit-transform: rotate(-135deg);
        -moz-transform: rotate(-135deg);
        -o-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }

    &:hover span {
        background-color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 35), [THEME.DARK]: darken(textDark, 40) })};
    }

    &:active span {
        background-color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 50), [THEME.DARK]: darken(textDark, 60) })};
    }

    &:disabled span {
        background-color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 80), [THEME.DARK]: darken(textDark, 80) })};
    }
`;



/**
 * Toggle Theme & Language Styles
 */
const StyledToggle = css`
    width: 100px;
    height: 40px;

    position: relative;

    overflow: hidden;
    border-radius: 3px;

    .checkbox {
        z-index: 3;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;

        position: relative;

        opacity: 0;
        cursor: pointer;
    }

    .knobs,
    .layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .knobs {
        z-index: 2;
        padding: .25rem;

        display: flex;
        justify-content: center;
        align-items: center;

        .text,
        .square {
            width: 40%;
            padding: 0;

            position: absolute;
            left: 5%;

            display: flex;
            justify-content: center;
            align-items: center;

            color: #fff;

            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }

        .text {
            z-index: 2;
            transition: 0.3s ease all, left 0.5s cubic-bezier(0.18, 0.89, 0.35, 1.15);
        }
        
        .square {
            z-index: 1;
            height: 90%;

            top: 5%;

            border-radius: 2px;
            background-color: #03a9f4;
            background-color: ${primary.default};
            
            transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
        }
    }

    .layer {
        z-index: 1;
        width: 100%;
        background-color: #ebf7fc;
        background-color: ${secondary.default};
        transition: 0.3s ease all;
    }

    .checkbox:checked + .knobs .text {
        left: 55%;
    }

    .checkbox:checked + .knobs .square {
        left: 55%;
    }
`;

export const StyledThemeToggle = styled.div`
    ${StyledToggle}

    .knobs .square { background-color: ${primary.default} }
    .layer { background-color: ${secondary.default} }
`;

export const StyledLanguageToggle = styled.div`
    ${StyledToggle}

    .knobs .text { 
        height: 30px;
        padding: 0 6px;
    }

    .knobs .square { background-color: #a6a6a6 }
    .layer { background-color: lightgray }
`;

/**
 * Main Buttons: Primary, Secondary, Tertiary
 * 
 * La idea de esta manera de organizar los estilos es que puedan exportarse
 * los estilos, o parte de ellos, para ser usados y extendidos por otros componentes.
 */
const btnCommonCSS = css`
    width: 100%;
    height: 50px;
    padding: 0 .5rem;

    position: relative;

    display: flex;
    flex-direction: row;
    gap: .25rem;
    justify-content: center;
    align-items: center;

    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0);
    color: ${color.text};

    font-family: 'Syncopate';
    font-size: ${font.md};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;

    transition: 
        border-color ${transitionDuration}, 
        background-color ${transitionDuration}, 
        color ${transitionDuration}, 
        font-size .1s;

    &:disabled {
        cursor: not-allowed;
    }

    &.tooltip {
        position: relative;

        &:before, 
        &:after {
            pointer-events: none;
            user-select: none;
            z-index: 10;

            position: absolute;

            cursor: default;
            opacity: 0;
            background: ${primary.default};
            color: #ffffff;

            transition: 
                opacity .25s linear .25s, 
                background-color ${transitionDuration},
                color ${transitionDuration};
        }

        &:before {
            content: '${props => props.tooltip}';

            max-width: 350px;
            max-width: max(200%, 350px);
            min-width: 50px;
            width: max-content;
            padding: .5rem 1rem;

            border-radius: 10px;

            text-align: center;
            text-transform: initial;
            font-family: 'Montserrat';
            font-weight: normal;
            font-size: ${font.md};
        }

        &:after {
            content: ' ';
            
            &.top,
            &.bottom {
                width: 12px;
                height: 8px;
            }

            &.left,
            &.right {
                width: 8px;
                height: 12px;
            }
        }

        &.top {
            &:before {
                bottom: 103%;
                bottom: calc(100% + 13px);
                left: 50%;
                transform: translateX(-50%);
            }

            &:after {
                width: 12px;
                height: 8px;
                clip-path: polygon(0 0, 50% 100%, 100% 0);
                bottom: 101%;
                bottom: calc(100% + 5px);
                left: 50%;
                transform: translateX(-50%) rotate(0deg);
            }
        }

        &.bottom {
            &:before {
                top: 103%;
                top: calc(100% + 13px);
                left: 50%;
                transform: translateX(-50%);
            }

            &:after {
                width: 12px;
                height: 8px;
                clip-path: polygon(0 100%, 50% 0, 100% 100%);
                top: 101%;
                top: calc(100% + 5px);
                left: 50%;
                transform: translateX(-50%) rotate(0deg);
            }
        }

        &.left {
            &:before {
                right: 103%;
                right: calc(100% + 13px);
                top: 50%;
                transform: translateY(-50%);
            }

            &:after {
                width: 8px;
                height: 12px;
                clip-path: polygon(0 0, 0% 100%, 100% 50%);
                right: 101%;
                right: calc(100% + 5px);
                top: 50%;
                transform: translateY(-50%) rotate(0deg);
            }
        }

        &.right {
            &:before {
                left: 103%;
                left: calc(100% + 13px);
                top: 50%;
                transform: translateY(-50%);
            }

            &:after {
                width: 8px;
                height: 12px;
                clip-path: polygon(0 50%, 100% 0, 100% 100%);
                left: 101%;
                left: calc(100% + 5px);
                top: 50%;
                transform: translateY(-50%) rotate(0deg);
            }
        }

        &:hover:before,
        &:hover:after {
            pointer-events: initial;
            opacity: 1;
            transition-delay: .75s;
        }
    }
`;

export const PrimaryButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${primary.default};
    color: ${quaternary.default};

    &:hover:not(:disabled) {
        background-color: ${primary.hover};
    }

    &:active:not(:disabled) {
        background-color: ${primary.active};
    }

    &.disabled {
        background-color: ${primary.disabled};
    }

    &:disabled {
        background-color: ${primary.disabled};
    }
`;

export const StyledPrimaryButton = styled.button`
    ${PrimaryButtonCSS};
`;

export const SecondaryButtonCSS = css`
    ${btnCommonCSS};

    border: solid 1px ${primary.default};
    border-radius: 1px;
    background-color: rgba(0, 0, 0, 0);

    font-family: 'Montserrat';
    font-weight: 500;
    text-transform: uppercase;

    &:hover:not(:disabled) {
        border-color: ${primary.hover};
        background-color: ${theme('mode', { [THEME.LIGHT]: 'rgba(0, 0, 0, .1)', [THEME.DARK]: 'rgba(255, 255, 255, .1)' })};
    }

    &:active:not(:disabled) {
        background-color: ${secondary.active};
    }

    &.disabled {
        background-color: ${secondary.disabled};
    }

    &:disabled {
        background-color: ${secondary.disabled};
    }

    &.tooltip {
        &:before, 
        &:after {
            background: ${secondary.default};
            color: ${theme('mode', { [THEME.LIGHT]: '#4d4d4d', [THEME.DARK]: '#fff' })};
        }
    }
`;

export const StyledSecondaryButton = styled.button`
    ${SecondaryButtonCSS};
`;

export const TertiaryButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${tertiary.default};

    &:hover:not(:disabled) {
        background-color: ${tertiary.hover};
    }

    &:active:not(:disabled) {
        background-color: ${tertiary.active};
    }

    &.disabled {
        background-color: ${tertiary.disabled};
    }

    &:disabled {
        background-color: ${tertiary.disabled};
    }

    &.tooltip {
        &:before, 
        &:after {
            background: ${tertiary.default};
        }
    }
`;

export const StyledTertiaryButton = styled.button`
    ${TertiaryButtonCSS};
`;

export const SuccessButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${success.default};
    color: white;
    
    &:hover:not(:disabled) {
        background-color: ${success.hover};
    }

    &:active:not(:disabled) {
        background-color: ${success.active};
    }

    &.disabled {
        background-color: ${success.disabled};
    }

    &:disabled {
        background-color: ${success.disabled};
    }

    &.tooltip {
        &:before, 
        &:after {
            background: ${success.default};
        }
    }
`;

export const StyledSuccessButton = styled.button`
    ${SuccessButtonCSS};
`;

export const DangerButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${danger.default};
    color: white;

    &:hover:not(:disabled) {
        background-color: ${danger.hover};
    }

    &:active:not(:disabled) {
        background-color: ${danger.active};
    }

    &.disabled {
        background-color: ${danger.disabled};
    }

    &:disabled {
        background-color: ${danger.disabled};
    }

    &.tooltip {
        &:before, 
        &:after {
            background: ${danger.default};
        }
    }
`;

export const StyledDangerButton = styled.button`
    ${DangerButtonCSS};
`;
