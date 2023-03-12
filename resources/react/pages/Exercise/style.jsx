import styled from 'styled-components';
import styles from '../../styles/vars';
import { StyledSection } from '../../styles';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledExercise = styled(StyledSection)`
    .slider {
        min-height: 700px;

        

        .left {
            position: absolute;
            top: 0;
        }

        .right {
            position: initial;

            &:not(.active) .edit-image-input .screen.active {
                pointer-events: none;
            }
        }
    }
`;
