import styled from 'styled-components';
import styles from '../../styles/vars';
import { PrimaryButtonCSS } from '../Button/style';
import { Link } from 'react-router-dom';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

export const StyledPrimaryLink = styled(Link)`
    ${PrimaryButtonCSS};
`;

export const StyledAnimatedRowLink = styled(Link)`
    width: 100%;
    height: 100px;

    position: relative;

    overflow: hidden;

    .front {
        width: 100%;
        height: 100%;
        padding: .5rem;
        padding-left: 4.5rem;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        border-right: solid 1px ${quaternary.default};
        border-bottom: solid 1px ${quaternary.default};
        background-color: ${primary.default};
        color: ${quaternary.default};

        font-size: ${font.lg};
        font-weight: bold;

        transition:
            background-color ${transitionDuration},
            color ${transitionDuration},
            transform ${transitionDuration};
    }

    &:hover .front {
        transform: translate(-2.5rem, -1rem);
    }

    .back {
        z-index: -1;
        width: 100%;
        height: 100%;
        padding: .75rem;

        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        background-color: ${quaternary.default};

        transition:
            background-color ${transitionDuration},
            color ${transitionDuration},
            padding ${transitionDuration};

        .icon {
            color: ${primary.default};
            font-size: ${font.lg};
        }
    }

    &:active .back {
        padding: .25rem;
    }
`;
