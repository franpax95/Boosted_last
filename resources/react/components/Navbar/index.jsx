import React, { useState, lazy, Suspense, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledSidebar } from './style';
import { CgGym } from 'react-icons/cg';
import { AiFillSchedule } from 'react-icons/ai';
import { MdOutlineCategory } from 'react-icons/md';
import { BurgerButton, LanguageToggle, ThemeToggle } from '../Button';
import { SettingsContext } from '../../contexts/SettingsContext';
import { THEME } from '../../states/theming';
import useLanguage from '../../hooks/useLanguage';

const SvgSwitch = lazy(() => import('../SvgComponents/svg-switch'));
const LogoDarkSVG = lazy(() => import('../SvgComponents').then(module => ({ default: module.LogoDarkSVG })));
const LogoLightSVG = lazy(() => import('../SvgComponents').then(module => ({ default: module.LogoLightSVG })));
const GradientBackground = lazy(() => import('../Background').then(module => ({ default: module.GradientBackground })));

export default function() {
    /** Location Hook */
    const location = useLocation();
    /** Settings Context */
    const { theme } = useContext(SettingsContext);
    /** Open State */
    const [open, set] = useState(false);
    /** Language */
    const { components: { Navbar: texts }} = useLanguage();

    /** Links */
    const NAVBAR_LINKS = [
        { key: 0, name: texts.txt1, to: '/categories', icon: <MdOutlineCategory /> },
        { key: 1, name: texts.txt2, to: '/exercises', icon: <CgGym /> },
        { key: 2, name: texts.txt3, to: '/routines', icon: <AiFillSchedule /> },
    ];

    // Previene la navegación si ya se está en la url a la que se quiere ir
    const onClick = (event, to) => {
        if(location.pathname === to) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // set(false);
        }
    }

    return (
        <Suspense>
            <StyledSidebar className={open ? 'active' : ''}>
                <div className="sidebar-content">
                    <Link to="/" className="logo animated">
                        <SvgSwitch 
                            active={theme === THEME.DARK}
                            front={<LogoLightSVG />}
                            cover={<LogoDarkSVG />}
                        />
                    </Link>

                    {NAVBAR_LINKS.map(({ key, icon, name, to }) => <Link 
                        className={`animated link ${location.pathname === to ? 'active' : ''}`}
                        key={key}
                        to={to}
                        onClick={e => onClick(e, to)}
                    >
                        <div className="icon">{icon}</div>
                        <span className="text">{ name }</span>
                    </Link>)}
                </div>

                <div className="sidebar-footer">
                    <ThemeToggle />
                    <LanguageToggle />
                </div>

                <GradientBackground />

                <div className="sidebar-burger-btn">
                    <BurgerButton
                        active={open}
                        onClick={() => set(!open)}
                    />
                </div>
            </StyledSidebar>
        </Suspense>
    );
}
