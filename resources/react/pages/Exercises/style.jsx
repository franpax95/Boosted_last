import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledExercises = styled.section`
    width: 100%;
    /* max-width: 600px; */
    min-height: 100%;
    margin: 0 auto;
    padding-bottom: 5rem;

    position: relative;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* justify-content: center; */
    justify-content: flex-start;
    align-items: center;

    .title {
        margin-bottom: 1.5rem;

        color: ${color.text};

        font-family: 'Syncopate';
        font-size: ${font.xl};
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;

        transition: 
            margin ${transitionDuration},
            color ${transitionDuration},
            font-size ${transitionDuration};

        @media (min-width: ${media.sm}px) {
            font-size: ${font.xxl};
        }
    }

    .buttons {
        width: 100%;

        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: center;
        justify-content: center;

        > * {
            width: 275px;
        }

        @media (max-width: ${media.sm}px) {
            gap: 1rem;
        }
    }

    .table {
        min-height: 60vh;
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
