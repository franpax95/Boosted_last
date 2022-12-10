import React from 'react';
import { StyledAnimatedRowLink, StyledPrimaryLink } from './style';
import { BsArrowDownRight } from 'react-icons/bs';

/**
 * Link with Primary Styles
 */
export const PrimaryLink = ({ to = "/", className = '', children }) => <StyledPrimaryLink to={to} className={className}>{ children }</StyledPrimaryLink>;

/**
 * Animated Link with Hover Effect
 */
export const AnimatedRowLink = ({ to = "/", onClick, children }) => {
    return (
        <StyledAnimatedRowLink to={to} onClick={onClick}>
            <div className="front">
                { children }
            </div>

            <div className="back">
                <div className="icon">
                    <BsArrowDownRight />
                </div>
            </div>
        </StyledAnimatedRowLink>
    );
}
