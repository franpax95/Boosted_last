import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledGradientBackground = styled.div`
    pointer-events: none;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    .light-bg,
    .dark-bg {
        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        left: 0;

        opacity: 0;

        transition: opacity ${transitionDuration};

        &.active {
            opacity: 1;
        }
    }
`;

export const StyledImageBackground = styled.div`
    pointer-events: none;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    .light-bg,
    .dark-bg {
        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        opacity: 0;

        transition: opacity ${transitionDuration};

        &.active {
            opacity: 1;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;
