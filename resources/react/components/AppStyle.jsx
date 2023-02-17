import styled from 'styled-components';
import { animated } from 'react-spring';
import styles from '../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

/**
 * Styled Main App Component
 */
export const StyledAppLayout = styled.div`
    height: 100%;
    width: 100%;

    position: relative;

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 100vh;

    overflow-x: hidden;
    
`;

export const StyledApp = styled.div`
    height: 100%;
    width: 100%;

    position: relative;
`;

/**
 * Styled Animated React Spring Component
 */
export const AnimatedWrapper = styled(animated.div)`
    width: 100%;
    height: 100%;

    position: absolute;

    overflow-y: auto;

    /** background-color here for modal animations. If you remove this from here it will blink the background with a white one. */
    background-color: ${quaternary.default};
    transition: background-color ${transitionDuration};

    /* width */
    &::-webkit-scrollbar { width: 15px }
    /* Track */
    &::-webkit-scrollbar-track { background: ${secondary.default} }
    /* Handle */
    &::-webkit-scrollbar-thumb { background: ${primary.default} }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover { background: ${primary.hover} }
`;
