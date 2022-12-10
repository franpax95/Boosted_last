import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;


export const StyledCategory = styled.section`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding-top: 2rem;
    padding-bottom: 10rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    .title {
        margin-top: 1rem;

        color: ${color.text};

        font-size: ${font.lg};
        text-align: center;

        transition: 
            margin ${transitionDuration},
            color ${transitionDuration},
            font-size ${transitionDuration};

        @media (min-width: ${media.sm}px) {
            margin-top: 3rem;
            font-size: ${font.xl};
        }
    }
`;

export const StyledToggleCategoryForm = styled.div`
    width: 100%;
    height: 375px;

    position: relative;

    transition: height ${transitionDuration};

    @media (min-width: ${media.sm}px) {
        height: 300px;
    }

    .front,
    .back {
        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        gap: .5rem;
        justify-content: flex-start;
        align-items: center;

        transition: opacity .25s;

        > .header {
            width: 100%;

            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 1rem;
            justify-content: center;
            align-items: center;

            .header-btn {
                width: 150px;
                padding: 0;
            }
        }

        .category {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .group {
                display: flex;
                flex-direction: column;
                gap: .1rem;

                color: ${color.text};

                transition: color ${transitionDuration};

                label {
                    font-size: ${font.md};
                    font-weight: bold;
                    letter-spacing: .5px;
                }

                span {
                    margin-left: .75rem;
                    font-size: ${font.md};

                    transition: font-size ${transitionDuration};

                    @media (min-width: ${media.sm}px) {
                        font-size: ${font.lg};
                    }
                }
            }
        }

        .category-form {
            width: 100%;
            max-width: 350px;
            padding: 0 .5rem;

            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .front {
        pointer-events: ${props => !!props.active ? 'none' : 'initial'};
        opacity: ${props => !!props.active ? '0' : '1'};
    }

    .back {
        pointer-events: ${props => !!props.active ? 'initial' : 'none'};
        opacity: ${props => !!props.active ? '1' : '0'};
        justify-content: center;
        gap: 1.5rem;

        h1 {
            margin-bottom: 1rem;
            color: ${color.text};
            font-size: ${font.lg};
            text-align: center;
            transition: color ${transitionDuration};

            @media (min-width: ${media.sm}px) {
                font-size: ${font.xl};
            }
        }
    }
`;
