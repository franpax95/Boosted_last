import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME } from '../../states/theming';
import styles from '../../styles';
import { addOpacityToHex, darken, lighten } from '../../styles/utils';

const { color, font, media, transitionDuration } = styles;
const { [THEME.LIGHT]: primaryLight, [THEME.DARK]: primaryDark } = color.primary;
const { [THEME.LIGHT]: secondaryLight, [THEME.DARK]: secondaryDark } = color.secondary;
const { [THEME.LIGHT]: tertiaryLight, [THEME.DARK]: tertiaryDark } = color.tertiary;
const { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: quaternaryDark } = color.quaternary;


export const StyledRoutines = styled.section`
    width: 100%;
    max-width: 600px;
    height: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    border: solid 2px yellow;

    .category {
        width: 100%;
        padding: 2rem 1rem;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
