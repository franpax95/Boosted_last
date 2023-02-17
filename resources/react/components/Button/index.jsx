import React, { Suspense, useContext, lazy } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { THEME } from '../../states/theming';
import { StyledPrimaryButton, StyledSecondaryButton, StyledTertiaryButton, StyledBurgerButton, StyledSuccessButton, StyledDangerButton, StyledThemeToggle, StyledLanguageToggle, StyledAnimatedButton } from './style';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import { LANG } from '../../states/lang';

const SvgSwitch = lazy(() => import('../SvgComponents/svg-switch'));
const EnglandFlagSVG = lazy(() => import('../SvgComponents').then(module => ({ default: module.EnglandFlagSVG })));
const SpainFlagSVG = lazy(() => import('../SvgComponents').then(module => ({ default: module.SpainFlagSVG })));

export const AnimatedButton = ({ type, className = '', onClick, disabled, children }) => {
    return <StyledAnimatedButton type={type} className={className} onClick={onClick} disabled={disabled}>
        <span className="border"></span>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
        <span className="text">{children}</span>
    </StyledAnimatedButton>;
}

export const PrimaryButton = ({ type, className = '', onClick, disabled, children }) => {
    return <StyledPrimaryButton type={type} className={className} onClick={onClick} disabled={disabled}>{ children }</StyledPrimaryButton>;
}

export const SecondaryButton = ({ type, className = '', onClick, disabled, children }) => {
    return <StyledSecondaryButton type={type} className={className} onClick={onClick} disabled={disabled}>{ children }</StyledSecondaryButton>;
}

export const TertiaryButton = ({ type, className = '', onClick, disabled, children }) => {
    return <StyledTertiaryButton type={type} className={className} onClick={onClick} disabled={disabled}>{ children }</StyledTertiaryButton>;
}

export const SuccessButton = ({ type, className = '', onClick, disabled, children }) => {
    return <StyledSuccessButton type={type} className={className} onClick={onClick} disabled={disabled}>{ children }</StyledSuccessButton>;
}

export const DangerButton = ({ type, className = '', onClick, disabled, children }) => {
    return <StyledDangerButton type={type} className={className} onClick={onClick} disabled={disabled}>{ children }</StyledDangerButton>;
}

export const BurgerButton = ({ active, onClick, disabled, className = '' }) => {
    return (
        <StyledBurgerButton className={`BurgerButton ${active ? 'open' : ''} ${className}`} onClick={onClick} disabled={disabled}>
            <span></span>
            <span></span>
            <span></span>
        </StyledBurgerButton>
    );
}

/**
 * Componente Toggle para cambiar de Tema
 */
export const ThemeToggle = () => {
    /** Settings Context to change theme */
    const { theme, setTheme } = useContext(SettingsContext);

    /** Manejador de eventos 'change' del input check */
    const onToggleChange = event => {
        const { checked } = event.target;
        setTheme(checked ? THEME.DARK : THEME.LIGHT);
    }

    return (
        <StyledThemeToggle>
            <input type="checkbox" className="checkbox" onChange={onToggleChange} checked={theme === THEME.DARK} />
            <div className="knobs">
                <span className="text">{theme === THEME.LIGHT ? <MdLightMode /> : <MdNightlight />}</span>
                <span className="square"></span>
            </div>
            <div className="layer"></div>
        </StyledThemeToggle>
    );
}

/**
 * Componente Toggle para cambiar de lenguaje
 */
export const LanguageToggle = () => {
    /** Settings Context to change theme */
    const { lang, setLang } = useContext(SettingsContext);

    /** Manejador de eventos 'change' del input check */
    const onToggleChange = event => {
        const { checked } = event.target;
        setLang(checked ? LANG.ENG : LANG.ESP);
    }

    return (
        <Suspense>
            <StyledLanguageToggle>
                <input type="checkbox" className="checkbox" onChange={onToggleChange} checked={lang === LANG.ENG} />
                <div className="knobs">
                    <span className="text">
                        <SvgSwitch 
                            active={lang === LANG.ENG}
                            front={<SpainFlagSVG />}
                            cover={<EnglandFlagSVG />}
                        />
                    </span>
                    <span className="square"></span>
                </div>
                <div className="layer"></div>
            </StyledLanguageToggle>
        </Suspense>
    );
}
