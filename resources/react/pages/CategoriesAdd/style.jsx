import styled from 'styled-components';
import { StyledSection } from '../../styles';
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
