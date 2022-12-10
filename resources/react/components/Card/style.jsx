import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledRandomImageCard = styled.div`
    width: 100%;
    height: 400px;

    position: relative;

    overflow: hidden;
    border-radius: 5px;
    background-color: ${tertiary.default};

    transition: 
        height ${transitionDuration},
        padding ${transitionDuration},
        background-color ${transitionDuration};

    @media (min-width: ${media.sm}px) {
        height: 375px;
        padding: 1rem;
    }

    .content {
        z-index: 1;
        width: 100%;
        height: 100%;
        padding: 1rem;

        position: relative;
        top: 0;
        right: 0;
        border-radius: 5px;
        background-color: ${quaternary.default};

        transition: 
            background-color ${transitionDuration},
            height: ${transitionDuration},
            top: ${transitionDuration},
            right: ${transitionDuration},
            max-width ${transitionDuration};

        @media (min-width: ${media.sm}px) {
            height: calc(100% - 2rem);
            max-width: 500px;

            position: absolute;
            top: 1rem;
            right: 1rem;

            background-color: ${tertiary.default};
        }
    }

    .background {
        object-fit: cover;

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