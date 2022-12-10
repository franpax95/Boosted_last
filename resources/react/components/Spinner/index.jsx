import React from 'react';
import { StyledScreenSpinner, StyledSpinner } from './style';

export const Spinner = ({ size }) => {
    let _size = size;

    if(size < 0) {
        _size = 0;
    } else if(size > 8) {
        _size = 8;
    }

    return (
        <StyledSpinner size={_size}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </StyledSpinner>
    );
}

export const ScreenSpinner = () => (
    <StyledScreenSpinner>
        <Spinner size={8} />
    </StyledScreenSpinner>
);
