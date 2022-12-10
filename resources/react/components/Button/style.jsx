import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles, { primaryDarkActive, primaryDarkHover, primaryLightActive, primaryLightHover, quaternaryLight, secondaryDarkActive, secondaryDarkHover, secondaryLightActive, secondaryLightHover, tertiaryDarkActive, tertiaryDarkHover, tertiaryLightActive, tertiaryLightHover, textDark, textLight } from '../../styles/vars';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;


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


/**
 * Burger Button
 */
export const StyledBurgerButton = styled.button`
    width: 40px;
    height: 30px;

    position: relative;

    cursor: pointer;
    outline: none;
    border: none;
    background: rgba(0, 0, 0, 0);

    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;

    span {
        height: 6px;
        width: 100%;

        position: absolute;
        left: 0;
        
        display: block;

        opacity: 1;
        border-radius: 9px;
        background: ${color.text};

        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
    }

    span:nth-child(1) {
        top: 0px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }

    span:nth-child(2) {
        top: 12px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }

    span:nth-child(3) {
        top: 24px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }

    &.open span:nth-child(1) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: -3px;
        left: 8px;
    }

    &.open span:nth-child(2) {
        width: 0%;
        opacity: 0;
    }

    &.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 26px;
        left: 8px;
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
export const ToggleWrapper = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

export const ToggleButton = styled.button`
    ${props => !!props.active ? PrimaryButtonCSS : TertiaryButtonCSS};
    width: 135px !important;
    padding: .5rem !important;
    font-size: ${font.md} !important;
    white-space: nowrap;
`;
