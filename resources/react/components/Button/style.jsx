import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles, { primaryDarkActive, primaryDarkHover, primaryLightActive, primaryLightHover, quaternaryLight, secondaryDarkActive, secondaryDarkHover, secondaryLightActive, secondaryLightHover, tertiaryDarkActive, tertiaryDarkHover, tertiaryLightActive, tertiaryLightHover, textDark, textLight } from '../../styles/vars';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;

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
        /* background-color: ${quaternary.hover}; */
        background-color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 35), [THEME.DARK]: darken(textDark, 40) })};
    }

    &:active span {
        /* background-color: ${quaternary.active}; */
        background-color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 50), [THEME.DARK]: darken(textDark, 60) })};
    }

    &:disabled span {
        /* background-color: ${quaternary.disabled}; */
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

    /* .knobs .square { background-color: ${theme('mode', { [THEME.LIGHT]: '#1F8A70', [THEME.DARK]: '#00337C' })} } */
    .knobs .square { background-color: #a6a6a6 }

    /* .layer { background-color: ${theme('mode', { [THEME.LIGHT]: '#84D2C5', [THEME.DARK]: '#7B8FA1' })} } */
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
    max-width: 300px;
    height: 50px;

    position: relative;

    display: flex;
    flex-direction: row;
    gap: .25rem;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 6px;
    color: ${color.text};

    font-size: ${font.md};
    text-align: center;

    transition: all ${transitionDuration};

    @media (min-width: ${media.sm}px) {
        width: auto;
        width: fit-content;
        max-width: initial;
        padding: 0 1.5rem;
    }

    @media (min-width: ${media.md}px) {
        padding: 0 2rem;
        /* font-size: ${font.md}; */
    }

    @media (min-width: ${media.lg}px) {
        padding: 0 3rem;
        /* font-size: ${font.lg}; */
    }
`;

export const PrimaryButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${primary.default};
    color: ${theme('mode', { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: textDark })};

    &:hover:not(:disabled) {
        background-color: ${primary.hover};
        box-shadow: 0px 5px 10px 0px ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(primaryLightHover, .3), [THEME.DARK]: addOpacityToHex(primaryDarkHover, .3) })};
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        background-color: ${primary.active};
        box-shadow: 0px 5px 10px -5px ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(primaryLightActive, .3), [THEME.DARK]: addOpacityToHex(primaryDarkActive, .3) })};
        transform: translateY(1px);
    }

    &.disabled {
        background-color: ${primary.disabled};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${primary.disabled};
    }
`;

export const StyledPrimaryButton = styled.button`
    ${PrimaryButtonCSS};
    font-weight: 500;
`;

export const SecondaryButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${secondary.default};

    &:hover:not(:disabled) {
        background-color: ${secondary.hover};
        box-shadow: 0px 5px 10px 0px ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(secondaryLightHover, .3), [THEME.DARK]: addOpacityToHex(tertiaryDarkHover, .3) })};
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        background-color: ${secondary.active};
        box-shadow: 0px 5px 10px -5px ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(secondaryLightActive, .3), [THEME.DARK]: addOpacityToHex(tertiaryDarkActive, .3) })};
        transform: translateY(1px);
    }

    &.disabled {
        background-color: ${secondary.disabled};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${secondary.disabled};
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
        box-shadow: 0px 5px 10px 0px ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(tertiaryLightHover, .3), [THEME.DARK]: addOpacityToHex(secondaryDarkHover, .3) })};
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        background-color: ${tertiary.active};
        box-shadow: 0px 5px 10px -5px ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(tertiaryLightActive, .3), [THEME.DARK]: addOpacityToHex(secondaryDarkActive, .3) })};
        transform: translateY(1px);
    }

    &.disabled {
        background-color: ${tertiary.disabled};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${tertiary.disabled};
    }
`;

export const StyledTertiaryButton = styled.button`
    ${TertiaryButtonCSS};
`;

export const SuccessButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${success.default};
    color: ${textDark};
    
    &:hover:not(:disabled) {
        background-color: ${success.hover};
        box-shadow: 0px 5px 10px 0px ${addOpacityToHex(success.hover, .3)};
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        background-color: ${success.active};
        box-shadow: 0px 5px 10px -5px ${addOpacityToHex(success.active, .3)};
        transform: translateY(1px);
    }

    &.disabled {
        background-color: ${success.disabled};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${success.disabled};
    }
`;

export const StyledSuccessButton = styled.button`
    ${SuccessButtonCSS};
`;

export const DangerButtonCSS = css`
    ${btnCommonCSS};

    background-color: ${danger.default};
    color: ${textDark};

    &:hover:not(:disabled) {
        background-color: ${danger.hover};
        box-shadow: 0px 5px 10px 0px ${addOpacityToHex(danger.hover, .3)};
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        background-color: ${danger.active};
        box-shadow: 0px 5px 10px -5px ${addOpacityToHex(danger.active, .3)};
        transform: translateY(1px);
    }

    &.disabled {
        background-color: ${danger.disabled};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${danger.disabled};
    }
`;

export const StyledDangerButton = styled.button`
    ${DangerButtonCSS};
`;
