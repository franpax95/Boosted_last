import React from 'react';
import styled from 'styled-components';
import styles from '../../styles/vars';

const { color, font, media, transitionDuration } = styles;
const { primary, secondary, tertiary, quaternary } = color;

const StyledSvgSwitch = styled.div`
    pointer-events: none;
    width: 100%;
    height: 100%;

    position: relative;
    top: 0;
    left: 0;

    .front-svg,
    .cover-svg {
        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        opacity: 0;

        transition: all ${transitionDuration};

        &.active {
            opacity: 1;
        }

        svg,
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: inherit;
        }
    }
`;

export default function SvgSwitch({ 
    active = false,
    front = <></>, 
    cover = <></>, 
    className = '', 
    style = {} 
}) {
    return (
        <StyledSvgSwitch className={className} style={style}>
            <div className={`front-svg ${active ? '' : 'active'}`}>{front}</div>
            <div className={`cover-svg ${active ? 'active' : ''}`}>{cover}</div>
        </StyledSvgSwitch>
    );
}
