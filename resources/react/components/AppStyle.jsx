import styled from 'styled-components';
import { animated } from 'react-spring';

/**
 * Styled Main App Component
 */
export const StyledApp = styled.div`
    height: 100%;
    width: 100%;

    position: relative;

    overflow-x: hidden;
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
