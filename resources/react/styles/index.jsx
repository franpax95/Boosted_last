import styled from 'styled-components';
import styles from './vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledSection = styled.section`
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
    }

    &.collection {
        gap: 1rem;

        .title {
            @media (min-width: ${media.sm}px) {
                font-size: ${font.xxl};
            }
        }
    }

    &.details {
        gap: 3rem;
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
        width: 100%;
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

    .details-info {
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

    .details-form {
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

    &.add-form {
        .icon-button {
            height: 35px !important;
            width: 35px;
            padding: 0;

            svg {
                font-size: 22px;
            }
        }

        .main-form {
            width: 100%;
            max-width: 800px;

            position: relative;

            display: flex;
            flex-direction: column;
            gap: 4rem;
            justify-content: center;
            align-items: center;

            .form-row {
                width: 100%;

                display: grid;
                grid-template-columns: 1fr 35px;
                gap: 1.5rem;

                /* border-bottom: solid 1px white; */
            }

            .form-inputs {
                width: 100%;

                display: flex;
                flex-direction: column;
                gap: 1rem;
                justify-content: flex-start;
                align-items: center;
            }

            .form-options {
                display: flex;
                flex-direction: column;
                gap: .5rem;
                align-items: flex-end;

                border-left: solid 1px ${primary.default};

                transition: border-color ${transitionDuration};

                .icon-button {
                    height: 26px !important;
                    width: 26px !important;

                    svg {
                        font-size: 14px;
                    }
                }
            }
        }

        .form-footer {
            margin-top: 2rem;
            width: 600px;

            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
            align-items: center;
            justify-content: center;

            button {
                height: 45px !important;

                svg {
                    font-size: ${font.lg};
                }
            }

            @media (max-width: 605px) {
                grid-template-columns: 1fr;
            }
        }
    }
`;

export const StyledNotFoundCollection = styled.div`
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
