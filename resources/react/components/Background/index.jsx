import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { StyledGradientBackground, StyledImageBackground } from './style';
import { THEME } from '../../states/theming';

export const GradientBackground = ({ 
    dark = 'linear-gradient(135deg, rgba(127,186,18,1) 0%, rgba(95,139,14,1) 100%)',
    light = 'linear-gradient(135deg, rgba(25,53,154,1) 0%, rgba(33,70,199,1) 100%)'
}) => {
    /** Settings Context */
    const { theme } = useContext(SettingsContext);

    return (
        <StyledGradientBackground>
            <div className={`light-bg ${theme === THEME.LIGHT ? 'active' : ''}`} style={{ background: light }}></div>
            <div className={`dark-bg ${theme === THEME.DARK ? 'active' : ''}`} style={{ background: dark }}></div>
        </StyledGradientBackground>
    );
}

export const ImageBackground = ({ dark = '', light = '' }) => {
    /** Settings Context */
    const { theme } = useContext(SettingsContext);

    return (
        <StyledImageBackground>
            <div className={`light-bg ${theme === THEME.LIGHT ? 'active' : ''}`}>
                <img src={light} alt="" />
            </div>

            <div className={`dark-bg ${theme === THEME.DARK ? 'active' : ''}`}>
                <img src={dark} alt="" />
            </div>
        </StyledImageBackground>
    );
}
