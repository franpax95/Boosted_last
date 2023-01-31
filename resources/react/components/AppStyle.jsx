import styled from 'styled-components';
import { animated } from 'react-spring';

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
`;
