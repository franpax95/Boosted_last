import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledHeader = styled.header`
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

    &.reverse {
        flex-direction: row-reverse;
    }

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

    &.collection-header .backgrounds {
        width: 100%;
        width: 350px;
        min-height: 100%;

        position: relative;

        .bg1, .bg2, .bg3 {
            min-width: 350px;
        }

        .bg1 {
            z-index: 1;
            height: 225px;
            clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 75%);
        }

        .bg2 {
            z-index: 2;

            .light-bg,
            .dark-bg {
                padding: 0 3rem;
                align-items: flex-end;

                img {
                    height: auto;
                }
            }
        }

        .bg3 {
            z-index: 3;
            height: 175px;

            top: initial;
            bottom: 0;

            clip-path: polygon(0 0, 100% 33%, 100% 100%, 0 100%);
        }
    }

    &.details-header .backgrounds {
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
`;
