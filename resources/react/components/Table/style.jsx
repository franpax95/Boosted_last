import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles from '../../styles/vars';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledCategoriesTable = styled.div`
    width: 100%;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;

    .body {
        max-height: 50vh;
        width: 100%;

        display: flex;
        flex-direction: column;
        /* gap: 1rem; */
        justify-content: center;
        align-items: center;

        overflow-y: auto;

        /* width */
        &::-webkit-scrollbar { width: 8px }
        /* Track */
        &::-webkit-scrollbar-track { background: ${secondary.default} }
        /* Handle */
        &::-webkit-scrollbar-thumb { background: ${primary.default} }
        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover { background: ${primary.hover} }
    }

    .category {
        width: 100%;
        padding: 2rem 1rem;

        display: grid;
        grid-template-columns: minmax(250px, 1fr) minmax(175px, 1fr) minmax(175px, 1fr);
        gap: 1rem;

        border-left: solid 1px ${secondary.default};
        border-right: solid 1px ${secondary.default};
        border-bottom: solid 1px ${secondary.default};
        color: ${color.text};

        font-size: ${font.md};

        transition:
            background-color ${transitionDuration},
            color ${transitionDuration};

        &.header {
            user-select: none;
            padding: 1rem;
            border-bottom: none;
            background-color: ${secondary.default};

            & > div {
                display: flex;
                gap: .25rem;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                cursor: pointer;

                font-weight: bold;
                letter-spacing: .5px;
            }

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;

                opacity: 0;

                transition: opacity .1s, transform ${transitionDuration};

                &.active {
                    opacity: 1;
                }

                &.reverse {
                    transform: rotate(180deg);
                }
            }
        }

        &:not(.header):hover {
            background-color: ${quaternary.hover};
        }

        &:not(.header):active {
            background-color: ${quaternary.active};
        }

        .created_at,
        .updated_at {
            display: none;
        }

        .check {
            .checkbox {
                z-index: 2;
            }
        }

        @media (min-width: ${media.md}px) {
            .created_at,
            .updated_at {
                display: block;
            }
        }
    }

    &.selection-mode {
        .category {
            grid-template-columns: 50px minmax(250px, 1fr) minmax(175px, 1fr) minmax(175px, 1fr);
        }
    }
`;

export const StyledExercisesTable = styled.div`
    width: 100%;
    /* max-width: 800px; */
    min-width: 500px;
    height: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
    justify-content: center;
    align-items: center;

    .exercise {
        width: 100%;
        height: 100px;
        padding: 0 1rem;

        display: grid;
        grid-template-columns: 80px repeat(auto-fit, minmax(10px, 1fr));
        gap: 1rem;
        align-items: center;
        justify-content: center;

        border-left: solid 1px ${secondary.default};
        border-right: solid 1px ${secondary.default};
        border-bottom: solid 1px ${secondary.default};
        color: ${color.text};

        font-size: ${font.md};

        transition:
            background-color ${transitionDuration},
            color ${transitionDuration};

        &.header {
            height: 60px;

            border-bottom: none;
            background-color: ${secondary.default};

            div {
                cursor: pointer;
                font-weight: bold;
                letter-spacing: .5px;
            }
        }

        &:not(.header):hover {
            background-color: ${quaternary.hover};
        }

        &:not(.header):active {
            background-color: ${quaternary.active};
        }

        > div:not(.name) {
            text-align: center;
        }

        &:not(.header) .preview {
            height: 90%;

            display: flex;
            justify-content: center;
            align-items: center;

            overflow: hidden;

            background-color: ${tertiary.default};

            transition: background-color ${transitionDuration};
            
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .created_at,
        .updated_at {
            display: none;
        }

        @media (min-width: ${media.md}px) {
            grid-template-columns: minmax(150px, 1fr) minmax(225px, 1.5fr) repeat(auto-fit, minmax(150px, 1fr));

            .created_at,
            .updated_at {
                display: block;
            }
        }
    }
`;
