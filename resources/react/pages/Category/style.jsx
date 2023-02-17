import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledCategory = styled.section`
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

    header {
        height: 400px;
        min-height: 400px;
        max-height: 400px;
        width: 100%;
        margin-bottom: 5rem;

        position: relative;

        display: flex;
        flex-wrap: wrap;
        gap: 100px;
        justify-content: center;
        align-items: flex-end;

        overflow: hidden;

        .info {
            z-index: 1;
            width: min(100%, 450px);
            height: 400px;

            position: relative;

            /* background-color: white; */

            .cover {
                pointer-events: none;
                height: 100%;
                width: 100%;

                position: absolute;
                top: 0;
                left: 0;

                display: flex;
                flex-direction: column;
                gap: 1rem;
                justify-content: center;
                align-items: center;

                opacity: 0;

                transition: opacity ${transitionDuration};

                &.active {
                    pointer-events: initial;
                    opacity: 1;
                }
            }

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
                width: 100%;

                display: flex;
                flex-direction: column;
                gap: 1rem;

                font-size: ${font.md};

                transition: color ${transitionDuration}, font-size .1s;

                &.category {
                    color: ${color.text};

                    .group {
                        display: grid;
                        gap: .15rem;
                        grid-template-columns: 200px 1fr;
                        align-items: center;

                        label,
                        span {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        &.name span {
                            font-size: ${font.lg};
                            transition: font-size .1s;
                        }
                    }
                }

                &.category-form {

                }
            }

            .info-footer {
                width: 100%;

                display: flex;
                flex-direction: row;
                gap: 1rem;
                justify-content: center;
                align-items: center;

                transition: color ${transitionDuration}, font-size .1s;
            }

            @media (max-width: 875px) { 
                width: 100%; 
                padding: 0 2rem;

                & > * {
                    max-width: 450px;
                    margin: 0 auto;
                }

                .cover {
                    width: 95%;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }

            @media (max-width: 525px) {
                .info-title {
                    font-size: ${font.xl};
                } 

                .cover .info-body.category .group {
                    grid-template-columns: 150px 1fr;

                    &.name span {
                        font-size: ${font.md};
                    }
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

    .table {
        min-height: 60vh;
        width: 100%;
    }
`;
