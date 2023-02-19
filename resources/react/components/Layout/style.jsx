import styled from 'styled-components';
import styles from '../../styles/vars';

const { media, transitionDuration } = styles;

export const StyledLayout = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin-top: 0px;

    overflow-y: auto;

    & .layout-content {
        max-width: ${media.lg}px;
        margin: 0 auto;
        padding: 1rem;
        /* border: solid 1px black; */
        transition: padding ${transitionDuration};

        @media (min-width: ${media.sm}px) {
            padding: 1.5rem 2rem;
        }

        @media (min-width: ${media.md}px) {
            padding: 1.5rem 3rem;
        }

        @media (min-width: ${media.lg}px) {
            padding: 2rem 1rem;
        }
    }
`;
