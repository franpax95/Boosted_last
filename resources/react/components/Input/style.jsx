import { animated } from 'react-spring';
import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import { addOpacityToHex } from '../../styles/utils';
import styles, { quaternaryDark, quaternaryLight } from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;

export const StyledInput = styled.input`
    width: 100%;
    padding: .25rem .5rem;

    border: none;
    border-bottom: solid 2px ${primary.default};
    background-color: rgba(0, 0, 0, 0);
    color: ${primary.default};
`;

export const StyledPrimaryInput = styled.span`
    --input-height: 40px;

    width: 100%;
    /* margin: 30px 10px; */
    position: relative;
    display: inline-block;

    color: ${color.text};

    input,
    select,
    textarea {
        width: 100%;
        height: var(--input-height);
        padding: 0 15px;

        display: inline-block;

        outline: 0;
        border: solid 1px ${primary.default};
        border-radius: 3px;
        background: ${tertiary.default};
        color: inherit;

        /* font-family: "Open Sans", sans; */
        font-weight: 400;
        text-indent: ${props => `${props.labelSize}px`}; // Arbitrary.

        transition: all .3s ease-in-out;

        &::-webkit-input-placeholder {
            color: ${color.text};
            font-weight: 300;
            text-indent: ${props => `${props.labelSize}px`}; // Arbitrary.
            transition: 
                text-indent .3s ease-in-out, 
                color .3s ease-in-out;
        }

        /* &:focus::-webkit-input-placeholder {
            text-indent: 0;
        } */

        + label {
            padding: 0px 15px;
            height: var(--input-height);
            width: ${props => props.labelSize ? `${props.labelSize}px` : 'auto'};

            position: absolute;
            top: 0;
            left: 0;

            display: inline-flex;
            justify-content: center;
            align-items: center;

            overflow: hidden;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            color: white;

            text-shadow: 0 1px 0 rgba(19, 74, 70, .4);

            transform: translateX(0);
            transition: all .3s ease-in-out;

            &:before,
            &:after {
                content: "";
                z-index: -1;

                position: absolute;
                right: 0;
                left: 0;

                transition: all .3s ease-in-out;
            }

            &:before {
                // Skinny bit here
                top: 6px;
                left: 5px;
                right: 5px;
                bottom: 6px;
                background: ${primary.default};
            }

            &:after {
                top: 0;
                bottom: 0;
                background: ${primary.default};
            }
        }

        &:focus,
        &:active {
            background: ${tertiary.active};
            color: inherit;
            text-indent: 0;

            &::-webkit-input-placeholder {
                /* color: #aaa; */
                text-indent: 0;
            }

            + label {
                transform: translateY(-100%);

                &:before {
                    border-radius: 5px;
                }

                &:after {
                    transform: translateY(100%);
                }
            }
        }
    }

    textarea {
        height: ${props => `${props.height}px`};
        min-height: 100px;
        padding: 10px 15px;

        resize: none;
        overflow: hidden;

        font-size: ${font.md};
        line-height: ${parseInt(font.md) * 1.7}px;
        text-align: justify;
        text-justify: inter-word;

        transition: 
            all .3s ease-in-out,
            height .1s;

        &:focus,
        &:active {
            + label {
                transform: translateY(-110%);

                &:before {
                    border-radius: 5px;
                }

                &:after {
                    transform: translateY(110%);
                }
            }
        }
    }

    .hidden-textarea {
        pointer-events: none;
        width: 100%;
        max-width: 100%;
        padding: 10px 15px;

        position: absolute;
        top: 0;
        left: 0;

        display: block;

        opacity: 0;
        border: solid 1px rgba(0, 0, 0, 0);

        font-size: ${font.md};
        font-weight: 400;
        line-height: ${parseInt(font.md) * 1.7}px;
        text-indent: ${props => `${props.labelSize}px`}; // Arbitrary.
        word-wrap: break-word;
        white-space: pre-wrap;

        text-align: justify;
        text-justify: inter-word;
    }

    /* textarea:focus,
    textarea:active {
        ~ .hidden-textarea {
            text-indent: 0;
        }
    } */
`;

export const StyledPrimaryFileInput = styled.label`
    width: 100%;
    /* max-width: 600px; */
    height: 150px;

    position: relative;

    cursor: pointer;
    overflow: hidden;
    border: solid 3px ${secondary.default};
    border-radius: 10px;
    background-color: ${tertiary.default};

    transition:
        border-color ${transitionDuration},
        background-color ${transitionDuration};

    &:hover {
        border-color: ${primary.default};
        background-color: ${tertiary.hover};
    }

    .screen {
        pointer-events: none;

        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        left: 0;

        opacity: 0;
        color: ${color.text};

        transition:
            opacity ${transitionDuration},
            color ${transitionDuration};

        &.active {
            pointer-events: initial;
            opacity: 1;
        }

        &.no-image {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;

            .icon {
                font-size: ${font.xxl};
            }

            .text {
                font-size: ${font.lg};
                text-align: center;
            }
        }

        &.with-image {
            padding: 0 2rem;

            display: grid;
            grid-template-columns: 100px 1fr;
            gap: 2rem;
            justify-content: center;
            align-items: center;
            
            .image {
                /* z-index: 1; */
                height: 100px;

                position: relative;

                display: flex;
                justify-content: center;
                align-items: center;

                overflow: hidden;
                border-radius: 6px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .hover-screen {
                    /* pointer-events: none; */
                    z-index: 1;
                    
                    width: 100%;
                    height: 100%;

                    position: absolute;
                    top: 0;
                    left: 0;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;

                    opacity: 0;
                    background-color: ${theme('mode', { [THEME.LIGHT]: 'rgba(255, 255, 255, .85)', [THEME.DARK]: 'rgba(0, 0, 0, .75)' })};
                    color: inherit;

                    font-weight: bold;

                    transition:
                        opacity ${transitionDuration},
                        background-color ${transitionDuration};

                        svg {
                            font-size: ${font.xl};
                        }
                }

                &:hover .hover-screen {
                    opacity: 1;
                }
            }

            .text {
                overflow: hidden;
                font-size: ${font.lg};
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
            }
        }
    }

    input {
        display: none;
    }

    .quit {
        z-index: 2;
        width: 30px;
        height: 30px;

        position: absolute;
        top: .5rem;
        right: .5rem;

        display: flex;
        justify-content: center;
        align-items: center;

        border: none;
        background-color: rgba(0, 0, 0, 0);
        color: ${danger.default};

        font-size: ${font.xl};

        transition: color ${transitionDuration};

        &:hover {
            color: ${danger.hover};
        }

        &:active {
            color: ${danger.active};
        }

        svg {
            stroke: ${danger.default};
        }
    }
`;

export const StyledPrimaryFileInputPreview = styled(animated.div)`
    z-index: 10;
    width: 100%;
    height: 100%;

    position: fixed;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(quaternaryLight, .85), [THEME.DARK]: addOpacityToHex(quaternaryDark, .85) })};

    transition: background-color ${transitionDuration};

    .box {
        width: 100%;
        width: fit-content;
        max-width: 800px;
        min-width: 300px;
        height: 100%;
        height: fit-content;
        max-height: 80vh;
        min-height: 300px;
        padding: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        border-radius: 6px;

        .image {
            height: 100%;
            padding: 1rem;

            display: flex;
            justify-content: center;
            align-items: center;

            overflow: hidden;
            border-radius: 6px;
            background-color: ${tertiary.default};
            box-shadow: 0px 4px 15px 5px ${tertiary.default};

            transition: 
                background-color ${transitionDuration},
                box-shadow ${transitionDuration};

            img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
        }

        .footer {
            height: 60px;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: space-evenly;
            align-items: center;
        }
    }
`;

export const StyledSearchBar = styled.div`
    width: 100%;
    max-width: 300px;
    height: 36px;
    padding: 0 .5rem;

    display: grid;
    grid-template-columns: 1fr 24px 24px;
    gap: .25rem;
    align-items: center;

    border: solid 1px ${tertiary.active};
    border-radius: 2px;
    background-color: ${tertiary.default};
    color: ${color.text};

    transition:
        border-color ${transitionDuration},
        background-color ${transitionDuration},
        color ${transitionDuration};

    &.active {
        background-color: ${tertiary.hover};
    }

    > * {
        border: none;
        background-color: rgba(0, 0, 0, 0);
        color: inherit;
    }

    input {
        font-size: ${font.md};
        
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${font.lg};

        transition: opacity .1s;

        &.hidden {
            pointer-events: none;
            opacity: 0;
        }
    }

`;

export const StyledCategoryToggle = styled.div`
    width: 100%;
    max-width: 900px;
    min-width: 450px;
    height: fit-content;
    max-height: 300px;
    min-height: 150px;

    display: grid;
    grid-template-columns: 1fr 1fr;

    overflow: hidden;
    border-radius: 10px;
    background-color: ${tertiary.default};
    
    transition: background-color ${transitionDuration};
    
    .side {
        height: 100%;
        padding: 1rem;

        position: relative;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 50px 1fr;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        opacity: .4;
        border: solid 3px ${tertiary.default};

        transition:
            opacity ${transitionDuration},
            border-color ${transitionDuration};

        &::before {
            content: "";
            z-index: 1;
            pointer-events: none;

            width: 100%;
            height: 100%;

            position: absolute;
            top: 0;
            left: 0;

            opacity: .5;
            background-color: ${tertiary.default};

            transition: opacity ${transitionDuration};
        }

        &.left {
            border-radius: 10px 0 0 10px;
        }

        &.right {
            border-radius: 0 10px 10px 0;
        }

        &.active {
            opacity: 1;
            border-color: ${primary.default};

            &::before {
                opacity: 0;
            }
        }

        h4 {
            color: ${color.text};
            font-size: ${font.md};
            transition: 
                color ${transitionDuration},
                font-size ${transitionDuration};
        }
    }
`;

export const StyledPrimaryCheckbox = styled.div`
    width: 21px;
    height: 21px;

    position: relative;

    .checkbox {
        --background: #fff;
        /* --background: ${theme('mode', { [THEME.LIGHT]: '', [THEME.DARK]: '' })}; */
        --border: #D1D6EE;
        --border-hover: #BBC1E1;
        --border-hover: ${secondary.default};
        --border-active: #1E2235;
        --border-active: ${primary.default};
        --tick: #fff;
        
        position: absolute;
        top: 0;
        left: 0;

        transition: opacity ${transitionDuration};

        input,
        svg {
            width: 21px;
            height: 21px;
            display: block;
        }

        input {
            -webkit-appearance: none;
            -moz-appearance: none;
            position: relative;
            outline: none;
            background: var(--background);
            border: none;
            margin: 0;
            padding: 0;
            cursor: pointer;
            border-radius: 4px;
            transition: box-shadow .3s;
            box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));

            &:hover {
                --s: 2px;
                --b: var(--border-hover);
            }

            &:checked {
                --b: var(--border-active);
            }
        }

        svg {
            pointer-events: none;
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke: var(--stroke, var(--border-active));
            position: absolute;
            top: 0;
            left: 0;
            width: 21px;
            height: 21px;
            transform: scale(var(--scale, 1)) translateZ(0);
            transition: stroke ${transitionDuration};
        }

        &.path {
            input {
                &:checked {
                    --s: 2px;
                    transition-delay: .4s;
                    & + svg {
                        --a: 16.1 86.12;
                        --o: 102.22;
                    }
                }
            }

            svg {
                stroke-dasharray: var(--a, 86.12);
                stroke-dashoffset: var(--o, 86.12);
                transition: stroke-dasharray .6s, stroke-dashoffset .6s;
            }
        }
        
        &.bounce {
            --stroke: var(--tick);

            input {
                &:checked {
                    --s: 11px;

                    & + svg {
                        animation: bounce .4s linear forwards .2s;
                    }
                }
            }
            svg {
                --scale: 0;
            }
        }

        &.hide {
            pointer-events: none;
            opacity: 0;
        }
    }

    @keyframes bounce {
        50% {
            transform: scale(1.2);
        }
        75% {
            transform: scale(.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;
