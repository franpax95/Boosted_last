import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledTable = styled.div`
    width: 99%;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;

    /** More than... */
    @media (min-width: ${media.sm}px) { width: 95%; }

    &.categories { max-width: 800px; }
    &.exercises { max-width: 1350px; }

    .body {
        max-height: 50vh;
        width: 100%;

        display: flex;
        flex-direction: column;

        overflow-y: auto;
        border-bottom: solid 1px ${secondary.default};

        /* width */
        &::-webkit-scrollbar { width: 8px }
        /* Track */
        &::-webkit-scrollbar-track { background: ${secondary.default} }
        /* Handle */
        &::-webkit-scrollbar-thumb { background: ${primary.default} }
        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover { background: ${primary.hover} }
    }

    .row {
        width: 100%;
        padding: .5rem;

        display: grid;
        grid-template-columns: repeat(auto-fit, 1fr);
        gap: .5rem;

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

                & > span {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
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

        &:not(.header) .centered {
            text-align: center;
        }

        &:not(.header) .preview {
            height: 100%;
            max-height: 75px;

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

        .check {
            .checkbox {
                z-index: 2;
            }
        }

        &.category {
            padding: 2rem 1rem;

            grid-template-columns: minmax(250px, 1fr);
            gap: 1rem;

            .created_at,
            .updated_at {
                display: none;
            }

            /** More than... */
            @media (min-width: ${media.md}px) {
                grid-template-columns: minmax(250px, 1fr) minmax(175px, 1fr) minmax(175px, 1fr);

                .created_at,
                .updated_at {
                    display: flex;
                }
            }
        }

        &.exercise {
            grid-template-columns: minmax(100px, 1fr) minmax(200px, 2fr);
            gap: 1rem;
            align-items: center;

            &.with-category {
                grid-template-columns: minmax(50px, 1fr) minmax(100px, 2fr) minmax(50px, 1fr);
                gap: .75rem;
            }

            &:not(.header) {
                height: 90px;
                min-height: 90px;
                max-height: 90px;
            }

            &:not(.header) .description > span {
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box !important;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                white-space: normal;
            }

            .preview,
            .created_at,
            .updated_at {
                display: none;
            }

            /** More than... */
            @media (min-width: ${media.sm}px) {
                grid-template-columns: 100px minmax(100px, 1fr) minmax(200px, 2fr);
                gap: .75rem;

                &.with-category {
                    grid-template-columns: 100px minmax(50px, 1fr) minmax(100px, 2fr) minmax(50px, 1fr);
                    gap: .75rem;
                }

                .preview {
                    display: flex;
                }
            }

            /** More than... */
            @media (min-width: ${media.lg}px) {
                grid-template-columns: 100px minmax(100px, 1fr) minmax(200px, 2fr) 100px 100px;

                &.with-category {
                    grid-template-columns: 100px minmax(50px, 1fr) minmax(100px, 2fr) minmax(50px, 1fr) 100px 100px;
                    gap: .5rem;
                }

                .created_at,
                .updated_at {
                    display: flex;
                }
            }
        }
    }

    &.selection-mode {
        .category {
            grid-template-columns: 50px minmax(250px, 1fr) minmax(175px, 1fr) minmax(175px, 1fr);

            /** More than... */
            @media (min-width: ${media.md}px) {
                grid-template-columns: 50px minmax(250px, 1fr) minmax(175px, 1fr) minmax(175px, 1fr);
            }
        }

        .exercise {
            grid-template-columns: 50px minmax(100px, 1fr) minmax(200px, 2fr);

            &.with-category {
                grid-template-columns: 50px minmax(75px, 1fr) minmax(150px, 2fr) minmax(75px, 1fr);
            }

            /** More than... */
            @media (min-width: ${media.sm}px) {
                grid-template-columns: 50px 100px minmax(100px, 1fr) minmax(200px, 2fr);

                &.with-category {
                    grid-template-columns: 50px 100px minmax(50px, 1fr) minmax(100px, 2fr) minmax(50px, 1fr);
                }
            }

            /** More than... */
            @media (min-width: ${media.lg}px) {
                grid-template-columns: 50px 100px minmax(100px, 1fr) minmax(200px, 2fr) 100px 100px;

                &.with-category {
                    grid-template-columns: 50px 100px minmax(50px, 1fr) minmax(100px, 2fr) minmax(50px, 1fr) 100px 100px;
                }
            }
        }
    }
`;
