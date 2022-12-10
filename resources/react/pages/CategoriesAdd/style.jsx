import styled from 'styled-components';
import { addOpacityToHex } from '../../styles/utils';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;


export const StyledCategoriesAdd = styled.section`
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
        gap: 1rem;
        justify-content: center;
        align-items: center;

        .add-category-link {
            position: absolute;
            top: .5rem;
            right: 0;
        }

        .row {
            width: 100%;
            max-width: 500px;
            margin: 12px 0;

            display: flex;
            flex-direction: row;
            gap: 1rem;
            justify-content: center;
            align-items: center;

            .quit {
                width: 30px;
                min-width: 30px;
                height: 35px;
                min-height: 35px;

                display: flex;
                justify-content: center;
                align-items: center;

                border: solid 1px ${danger.default};
                border-radius: 999px;
                background-color: rgba(0, 0, 0, 0);
                color: ${danger.default};

                font-size: ${font.lg};

                transition: 
                    border-color ${transitionDuration},
                    background-color ${transitionDuration},
                    color ${transitionDuration};

                &:hover {
                    background-color: ${addOpacityToHex(danger.default, .2)};
                    border-color: ${danger.hover};
                    color: ${danger.hover};
                }

                &:active {
                    border-color: ${danger.hover};
                    color: ${danger.active};
                }
            }
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
