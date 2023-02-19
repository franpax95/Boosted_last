import styled from 'styled-components';
import { StyledSection } from '../../styles';
import { addOpacityToHex } from '../../styles/utils';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary, success, danger } = color;

export const StyledCategoriesAdd = styled(StyledSection)`
    &.add-form {
        .main-title {
            display: grid;
            grid-template-columns: 1fr 35px 35px 35px;
            gap: .5rem;
            align-items: center;

            /* button {
                height: 35px !important;
            } */

            span {
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-family: inherit;
                font-weight: inherit;
            }

            /* svg {
                font-size: 32px;
            } */
        }

        .main-form {
            max-width: 600px;
        }
    }
`;

export const OldStyledCategoriesAdd = styled.section`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    .categories-add-content {
        width: 100%;
        max-width: 800px;
        height: 100%;
        max-height: 450px;
        padding: 1rem;

        display: grid;
        gap: 2%;
        grid-template-columns: 1fr minmax(350px, 1fr);
        justify-content: center;
        align-items: center;

        position: relative;

        border-radius: 4px;
        overflow: hidden;

        .info {
            z-index: 1;
            height: 100%;
            max-height: 350px;
            width: 100%;

            display: grid;
            gap: 1rem;
            grid-template-rows: auto 1fr auto;

            .info-title {
                width: 100%;
                color: ${primary.default};
                font-family: 'Syncopate';
                font-size: ${font.xl};
                text-transform: uppercase;
                text-align: center;
                transition: color ${transitionDuration}, font-size .1s;
            }

            .info-body {
                padding: 1rem;
                color: ${color.text};
                font-size: ${font.md};
                text-align: center;
                transition: color ${transitionDuration}, font-size .1s;
            }

            .info-footer {
                display: grid;
                gap: 10px;
                grid-template-columns: 1fr 1fr 1fr;

                button {
                    max-height: 40px;
                }
            }
        }

        .form {
            z-index: 1;
            height: 100%;
            max-height: 80%;
            padding: 2.5rem .75rem;

            overflow-y: auto;
            border-radius: 4px;
            background-color: ${quaternary.default};
            
            transition: background-color ${transitionDuration};

            /* width */
            &::-webkit-scrollbar { width: 2px; }
            /* Track */
            &::-webkit-scrollbar-track { background: ${secondary.default} }
            /* Handle */
            &::-webkit-scrollbar-thumb { background: ${primary.default} }
            /* Handle on hover */
            &::-webkit-scrollbar-thumb:hover { background: ${primary.hover} }

            form {
                display: flex;
                flex-direction: column;
                gap: 2.5rem;
            }

            .row {
                display: grid;
                gap: .5rem;
                grid-template-columns: 1fr auto;
                align-items: center;

                .quit {
                    width: 24px;
                    height: 24px;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    border: solid 1px ${danger.default};
                    border-radius: 9999px;
                    background-color: rgba(0, 0, 0, 0);
                    color: ${danger.default};

                    font-size: 18px;

                    transition: 
                        border-color ${transitionDuration},
                        background-color ${transitionDuration},
                        color ${transitionDuration};

                    &:hover {
                        border-color: ${danger.hover};
                        color: ${danger.hover};
                    }
                }
            }
        }
    }
`;
