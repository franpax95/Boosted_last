import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledExercise = styled.section`
    width: 100%;
    /* max-width: 600px; */
    min-height: 100%;
    margin: 0 auto;
    padding-bottom: 5rem;

    position: relative;

    display: flex;
    flex-direction: column;
    gap: 3rem;
    /* justify-content: center; */
    justify-content: flex-start;
    align-items: center;

    header {
        height: 400px;
        min-height: 400px;
        max-height: 400px;
        width: 100%;

        position: relative;

        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        gap: 100px;
        justify-content: center;
        align-items: flex-end;

        overflow: hidden;

        .info {
            z-index: 1;
            width: min(100%, 400px);
            height: 400px;

            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            align-items: center;

            .info-title {
                width: 100%;
                color: ${primary.default};
                font-family: 'Syncopate';
                font-size: ${font.xxl};
                text-transform: uppercase;
                text-align: left;
                transition: color ${transitionDuration}, font-size .1s;
            }

            .info-body {
                color: ${color.text};
                font-size: ${font.lg};
                transition: color ${transitionDuration}, font-size .1s;
            }

            .info-footer {
                width: 200px;
                padding-top: 2rem;

                align-self: flex-end;

                color: ${color.text};

                font-size: ${font.sm};
                text-align: right;

                transform: translateX(50px);
                transition: color ${transitionDuration}, font-size .1s;
            }

            @media (max-width: 875px) { 
                width: 100%; 
                padding: 0 2rem;

                & > * {
                    max-width: 400px;
                    margin: 0 auto;
                }

                .info-footer {
                    transform: translateX(150px);
                }
            }

            @media (max-width: 525px) {
                .info-title {
                    font-size: ${font.xl};
                } 
                .info-footer {
                    transform: translateX(50px);
                }
            }
        }

        .backgrounds {
            width: 100%;
            width: 300px;
            min-height: 100%;

            position: relative;

            .bg1 {
                z-index: 1;
                height: 100%;
                width: 180px;
                left: initial;
                right: 30px;
            }

            .bg2 {
                z-index: 3;

                .light-bg,
                .dark-bg {
                    left: 0;
                    align-items: flex-end;

                    img {
                        height: auto;
                    }
                }

                .light-bg { padding: 0; }
                .dark-bg { padding: 0 1rem; }
            }

            .bg3 {
                z-index: 2;
                height: 100%;
                width: 30px;

                top: 0;
                right: 0;
                left: initial;
            }
        }
    }

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

        /* @media (min-width: ${media.sm}px) {
            font-size: ${font.xl};
        } */
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

    .slider {
        width: 100%;
        min-height: 150vh;

        position: relative;

        overflow: hidden;

        .card {
            width: 100%;

            position: absolute;
            top: 0;

            &.left {
                pointer-events: none;
                right: 25%;
                opacity: 0;
                transition: right .5s ease-in-out, opacity .25s ease-in-out;

                &.active {
                    pointer-events: initial;
                    right: 0;
                    opacity: 1;
                    transition: right .5s ease-in-out, opacity .25s ease-in-out .25s;
                }
            }

            &.right {
                pointer-events: none;
                left: 25%;
                opacity: 0;
                transition: left .5s ease-in-out, opacity .25s ease-in-out;

                &.active {
                    pointer-events: initial;
                    left: 0;
                    opacity: 1;
                    transition: left .5s ease-in-out, opacity .25s ease-in-out .25s;
                }
            }
        }
    }

    .exercise-info {
        width: fit-content;
        max-width: 800px;
        margin: 0 auto;

        display: flex;
        gap: 1rem;
        flex-direction: column;

        .group {
            width: 100%;

            display: grid;
            gap: 1rem;
            grid-template-columns: 150px 1fr;

            color: ${color.text};

            font-size: ${font.md};

            transition: color ${transitionDuration}, font-size .1s;

            &.name {
                font-size: ${font.lg};
            }

            &.description {
                white-space: pre-wrap;
            }

            .img {
                width: 100%;
                max-height: 400px;
                max-width: 400px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    object-fit: contain;
                    max-height: 100%;
                    max-width: 100%;
                }
            }

            label {
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            a {
                transition: color ${transitionDuration};

                &:hover {
                    color: ${primary.default};
                }
            }
        }

        .buttons {
            margin-top: 1.5rem;
        }
    }

    .exercise-form {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;

        display: flex;
        gap: 2rem;
        flex-direction: column;

        form {
            display: flex;
            gap: 1rem;
            flex-direction: column;
        }
    }

    .slider .right:not(.active) .edit-image-input .screen.active {
        pointer-events: none;
    }
`;
