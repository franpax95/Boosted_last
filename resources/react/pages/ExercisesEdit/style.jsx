import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import { darken, lighten } from '../../styles/utils';
import styles, { textDark, textLight } from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;


export const StyledExercisesEdit = styled.section`
    width: 100%;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    form {
        width: 100%;
        padding: max(3rem, 100px) 1rem;

        position: relative;

        display: flex;
        flex-direction: column;
        /* gap: 1rem; */
        justify-content: center;
        align-items: center;

        .add-exercise-link {
            position: absolute;
            top: .5rem;
            right: 0;
        }

        .form-group {
            padding: 2rem 0;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;

            .row {
                width: 100%;
                /* max-width: 450px; */
                margin-bottom: 1.5rem;

                display: grid;
                grid-template-columns: 1fr 50px 50px;
                gap: 1rem;
                align-items: center;
                justify-content: center;
            }

            .category-title {
                margin-top: 1.5rem;
                margin-bottom: .75rem;

                color: ${color.text};

                font-size: ${font.lg};
                text-align: center;

                transition: 
                    color ${transitionDuration},
                    font-size ${transitionDuration};
            }

            .category-toggle {
                margin-bottom: 2.5rem;
            }

            .exercise-description {
                margin-bottom: 1.5rem;
            }

            .icon-btn {
                height: 100%;
                width: 100%;

                border: none;
                background: none;
                color: ${color.text};

                font-size: ${font.lg};

                transition: color ${transitionDuration};

                &:hover {
                    color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 8), [THEME.DARK]: darken(textDark, 8) })};
                }

                &:active {
                    color: ${theme('mode', { [THEME.LIGHT]: lighten(textLight, 16), [THEME.DARK]: darken(textDark, 16) })};
                }

                &.quit {
                    color: ${danger.default};
                    font-size: ${font.xl};

                    &:hover {
                        color: ${danger.hover};
                    }

                    &:active {
                        color: ${danger.active};
                    }
                }
            }
        }

        .form-group:not(:last-of-type) {
            border-bottom: solid 1px ${secondary.default};
        }
    }

    .title {
        margin-bottom: 1.5rem;

        color: ${color.text};

        font-size: ${font.lg};
        text-align: center;

        transition: 
            margin ${transitionDuration},
            color ${transitionDuration},
            font-size ${transitionDuration};

        @media (min-width: ${media.sm}px) {
            font-size: ${font.xl};
        }
    }
`;
