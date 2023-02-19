import styled, { keyframes } from 'styled-components';
import styles, { quaternaryLight, quaternaryDark } from '../../styles/vars';
import { addOpacityToHex } from '../../styles/utils';
import { THEME } from '../../states/theming';
import theme from 'styled-theming';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

const ldsRingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const StyledSpinner = styled.div`
    width: ${props => props.size ? `${10 * props.size}px` : '80px'};
    height: ${props => props.size ? `${10 * props.size}px` : '80px'};

    position: relative;

    display: inline-block;
    
    div {
        box-sizing: border-box;
        width: ${props => props.size ? `${8 * props.size}px` : '64px'};
        height: ${props => props.size ? `${8 * props.size}px` : '64px'};
        margin: ${props => props.size ? `${1 * props.size}px` : '8px'};

        position: absolute;

        display: block;
        
        border: 8px solid ${primary.default};
        border: ${props => props.size ? `${1 * props.size}px` : '8px'} solid ${primary.default};
        border-color: ${primary.default} transparent transparent transparent;
        border-radius: 50%;
        
        animation: ${ldsRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transition: border-color .25s;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }

        &:nth-child(2) {
            animation-delay: -0.3s;
        }

        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
`;

export const StyledScreenSpinner = styled.div`
    z-index: 1100;
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(quaternaryLight.default, .5), [THEME.DARK]: addOpacityToHex(quaternaryDark.default, .5) })};
`;
