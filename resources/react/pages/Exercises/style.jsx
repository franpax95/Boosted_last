import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledExercises = styled.section`
    width: 100%;
    max-width: 1400px;
    height: 100%;
    margin: 0 auto;
    padding: 4.5rem 0;

    position: relative;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    .add-exercise-link {
        position: absolute;
        top: .5rem;
        right: 0;
    }

    .title {
        margin-bottom: 1.5rem;

        color: ${color.text};

        font-size: ${font.lg};
        text-align: center;

        transition: 
            margin ${transitionDuration},
            color ${transitionDuration},
            font-size ${transitionDuration};

        @media (min-width: ${media.sm}px) {
            font-size: ${font.xl};
        }
    }
`;

export const StyledNotFoundExercises = styled.div`
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: .25rem;
    justify-content: center;
    align-items: center;

    color: ${color.text};

    font-size: ${font.lg};
    text-align: center;

    transition: color ${transitionDuration};
`;
