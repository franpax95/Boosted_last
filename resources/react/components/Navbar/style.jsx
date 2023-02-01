import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles, { quaternaryDark, quaternaryLight } from '../../styles/vars';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;
const link_colors = ['#32a7e2', '#ff7551', '#6c5ecf', '#22b07d'];

export const StyledSidebar = styled.nav`
    --td: .7s;      /** Transition Duration */
    --htd: .35s;    /** HALF Transition Duration */
    --sidebar-width: 250px;
    @media (min-width: ${media.sm}px) { --sidebar-width: 300px; }

    /* --sidebar-width: 205px;
    @media (min-width: ${media.sm}px) { --sidebar-width: 220px; }
    @media (min-width: ${media.md}px) { --sidebar-width: 250px; }
    @media (min-width: ${media.lg}px) { --sidebar-width: 300px; } */

    z-index: 200;
    width: 0px;
    height: 100%;
    min-height: 100%;

    position: relative;

    display: grid;
    grid-template-rows: 1fr 100px;

    transition: width var(--td, .7s) ease-in-out;

    @media (max-width: ${media.lg}px) { 
        position: absolute;
        right: 0;
        top: 0;
    }

    .sidebar-content {
        z-index: 1;

        width: var(--sidebar-width, 200px);
        max-height: 100%;
        min-height: 100%;

        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: flex-start;
        align-items: center;

        overflow-y: auto;
        overflow-x: hidden;

        .logo,
        .link {
            z-index: 1;
        }

        .logo {
            width: 100%;
            height: 100vh;
            max-height: 125px;

            & svg {
                transform: scale(1.1);
            }

            &:hover svg {
                transform: scale(1.15);
            }
        }

        .link {
            width: 100%;
            height: 45px;
            padding-left: 2rem;

            display: grid;
            gap: .7rem;
            grid-template-columns: 40px 1fr;
            align-items: center;
            /* justify-content: center; */

            font-size: ${font.lg};
            font-weight: 600;
            transition: all ${transitionDuration};

            @media (max-width: ${media.sm}px) { padding-left: .75rem; }

            .text,
            .icon {
                color: ${theme('mode', { [THEME.LIGHT]: '#a6a6a6', [THEME.DARK]: '#cccccc' })};
                transition: background-color .15s, color .15s;
            }

            .icon {
                width: 40px;
                height: 40px;

                display: flex;
                justify-content: center;
                align-items: center;

                border-radius: 10px;

                font-size: ${font.xl};
            }

            &.active .text,
            &:hover .text {
                color: whitesmoke;
                font-weight: 700;
            }

            &.active .icon,
            &:hover .icon {
                color: whitesmoke;
            }

            ${() => {
                let str = '';
                for (let i = 0; i < link_colors.length; i++) {
                    str += `
                        &:nth-child(${i + 1}).active .icon,
                        &:nth-child(${i + 1}):hover .icon {
                            background-color: ${link_colors[i]};
                        }
                    `;
                }
                return str;
            }}
        }

        .animated {
            opacity: 0;
            transform: translateY(-5px);
            transition: 
                all ${transitionDuration} linear 0s,
                opacity .1s ease-in-out var(--htd),
                transform .1s ease-in-out var(--htd);
        }
    }

    .sidebar-footer {
        z-index: 1;
        width: var(--sidebar-width, 200px);

        position: relative;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        /** Separation Bar */
        &::after {
            content: "";

            width: 50px;
            height: 1px;

            position: absolute;
            top: 0;
            left: 50%;

            clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
            border-radius: 9999px;
            background-color: ${quaternary.default};

            transform: translateX(-50%);
        }
    }

    .sidebar-burger-btn {
        padding: 10px;

        position: absolute;
        left: -6rem;
        top: 2rem;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: ${theme('mode', { [THEME.LIGHT]: addOpacityToHex(quaternaryLight, .5), [THEME.DARK]: addOpacityToHex(quaternaryDark, .5) })};

        transition: background-color ${transitionDuration};

        .BurgerButton:hover span {
            background: ${primary.active};
        }
    }

    &.active {
        width: var(--sidebar-width, 200px);

        .sidebar-content {
            .animated {
                opacity: 1;
                transform: translateY(0);
                transition: 
                    all ${transitionDuration} linear 0s,
                    opacity var(--htd) ease-in-out var(--htd),
                    transform var(--htd) ease-in-out var(--htd);

                ${() => {
                    let str = '';
                    for (let i = 2; i < 100; i++) {
                        str += `&:nth-child(${i}) {
                            transition: 
                                all ${transitionDuration} linear 0s,
                                opacity var(--htd) ease-in-out calc(var(--htd) + ${i / 10}s),
                                transform var(--htd) ease-in-out calc(var(--htd) + ${i / 10}s);
                        } `;
                    }
                    return str;
                }}

                /* &:nth-child(2) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .1s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .1s);
                }

                &:nth-child(3) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .2s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .2s);
                }

                &:nth-child(4) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .3s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .3s);
                }

                &:nth-child(5) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .4s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .4s);
                }

                &:nth-child(6) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .5s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .5s);
                }

                &:nth-child(7) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .55s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .55s);
                }

                &:nth-child(8) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .6s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .6s);
                }

                &:nth-child(9) { 
                    transition: 
                        all ${transitionDuration} linear 0s,
                        opacity var(--htd) ease-in-out calc(var(--htd) + .65s),
                        transform var(--htd) ease-in-out calc(var(--htd) + .65s);
                } */
            }
        }
    }
`;
