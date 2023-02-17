import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;

export const StyledModal = styled.div`
    --level: ${props => props.level};
    --next-level: ${props => props.level + 1};

    z-index: 300;
    z-index: calc(300 + var(--level, 0));

    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, .5);

    /* animation: primaryModalFadeIn .4s; */

    .modal {
        width: fit-content;
        min-width: 250px;
        max-width: 600px;
        max-width: min(600px, 90vw);
        min-height: 200px;
        padding-top: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        display: grid;
        grid-template-rows: auto 1fr 50px;

        overflow: hidden;
        /* border: solid 1px ${primary.default}; */
        border: none;
        border-radius: 4px;
        background-color: ${tertiary.default};
        /* color: #4d4d4d; */
        -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);

        /* animation: primaryModalTranslateIn .3s; */
        transform: translateY(calc(-45px + calc(var(--next-level, 1) * 15px)));
        transition: 
            border-color ${transitionDuration},
            background-color ${transitionDuration};

        .modal-title {
            width: 100%;
            padding: 0 2rem;

            color: ${primary.default};

            font-family: 'Syncopate';
            font-size: ${font.xl};
            text-transform: uppercase;
            text-align: center;

            transition: color ${transitionDuration}, font-size .1s;
        }

        .modal-body {
            width: 100%;
            padding: 0 1.5rem;
            margin-bottom: 1.5rem;

            display: flex;
            flex-direction: column;
            gap: .5rem;

            color: ${color.text};

            font-size: ${font.md};
            text-align: ${props => props.align || 'left'};

            transition: color ${transitionDuration}, font-size ${transitionDuration};
        }

        .modal-footer {
            width: 100%;
            height: 50px;

            display: grid;
            grid-template-columns: repeat(auto-fill, 1fr);

            display: flex;
            flex-direction: row;

            button {
                width: 100%;
                width: 0;
                height: 100%;

                flex: 1 1 0;

                font-size: ${font.md};

                transition: 
                    background-color ${transitionDuration},
                    font-size ${transitionDuration};

                &.accept {
                    background-color: ${success.default};
                    color: white;

                    &:hover { background-color: ${success.hover}; }
                    &:active { background-color: ${success.active}; }
                }

                &.cancel {
                    background-color: ${danger.default};
                    color: white;

                    &:hover { background-color: ${danger.hover}; }
                    &:active { background-color: ${danger.active}; }
                }

                &.default {
                    background-color: ${primary.default};
                    color: white;

                    &:hover { background-color: ${primary.hover}; }
                    &:active { background-color: ${primary.active}; }
                }
            }
        }
    }

    &.open-animation {
        opacity: 1;
        animation: primaryModalFadeIn .4s;
        .modal { animation: primaryModalTranslateIn .3s; }
    }

    &.close-animation {
        opacity: 0;
        animation: primaryModalFadeOut .4s;
        .modal { animation: primaryModalTranslateOut .3s; }
    }

    @keyframes primaryModalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes primaryModalFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes primaryModalTranslateIn {
        0% { transform: translateY(calc(-45px + calc(var(--level, 0) * 15px))); }
        100% { transform: translateY(calc(-45px + calc(var(--next-level, 1) * 15px))); }
    }

    @keyframes primaryModalTranslateOut {
        to { transform: translateY(calc(-45px + calc(var(--level, 0) * 15px))); }
    }
`;
