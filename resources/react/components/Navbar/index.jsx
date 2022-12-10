import React, { useContext, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledNavbar, Logo, Links, StyledLink, StyledSettingsDropdown, StyledSidebar } from './style';
import useOutsideClick from '../../hooks/useOutsideClick';
import { CgGym } from 'react-icons/cg';
import { BiUserCircle } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';
import { SettingsContext } from '../../contexts/SettingsContext';
import { BurgerButton, LanguageToggle, ThemeToggle } from '../Button';
import { Link } from 'react-router-dom';
import { AnimatedRowLink } from '../Anchor';


const NAVBAR_LINKS = [
    { key: 0, name: 'Categorías', to: "/categories" },
    { key: 1, name: 'Ejercicios', to: "/exercises" },
    { key: 2, name: 'Rutinas', to: "/routines" },
];

/**
 * Main Navbar
 */
export const Navbar = () => {
    const location = useLocation();

    // Previene la navegación si ya se está en la url a la que se quiere ir
    const onClick = (event, to) => {
        if(location.pathname === to) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    return (
        <StyledNavbar>
            <Sidebar />

            <Logo to="/">
                <CgGym />
                <span>Boosted</span>
                <CgGym />
            </Logo>

            <Links>
                {NAVBAR_LINKS.map(({ key, name, to }) => <StyledLink 
                    key={key}
                    to={to}
                    onClick={e => onClick(e, to)}
                >{ name }</StyledLink>)}
            </Links>

            <SettingsDropdown />
        </StyledNavbar>
    );
}

export default Navbar;

/** 
 * Settings dropdown with Settings & User info/options
 */
const SettingsDropdown = () => {
    const ref = useRef(null);
    const [active, set] = useState(false);

    /** Custom hook to bind outside click event */
    useOutsideClick(ref, () => set(false), [ref, active]);

    /** Toggle active state */
    const onDropdownClick = event => {
        event.stopPropagation();
        event.preventDefault();
        set(!active);
    }

    return (
        <StyledSettingsDropdown ref={ref}>
            <button className="icon" onClick={onDropdownClick}>
                <IoSettingsSharp />
            </button>

            <div className={`dropdown ${active ? 'active' : ''}`}>
                <div className="user-card">
                    <div className="avatar">
                        <BiUserCircle />
                    </div>

                    <p className="alias">
                        Franpax95
                    </p>

                    <p className="email">
                        franpax95@gmail.com
                    </p>
                </div>

                <div className="spacer"></div>

                <h2 className="title">Cambiar tema</h2>
                <ThemeToggle />

                <div className="spacer"></div>

                <h2 className="title">Cambia lenguaje</h2>
                <LanguageToggle />
            </div>
        </StyledSettingsDropdown>
    );
}

/**
 * Sidebar functionality in small viewports
 */
const Sidebar = () => {
    const ref = useRef(null);
    const [active, set] = useState(false);

    /** Custom hook to bind outside click event */
    useOutsideClick(ref, () => set(false), [ref, active]);

    /** Toggle active state */
    const onBurgerClick = event => {
        event.stopPropagation();
        event.preventDefault();
        set(!active);
    }

    /** Close sidebar when link is clicked */
    const onLinkClick = event => {
        setTimeout(() => set(false), 150);
    }

    return(
        <StyledSidebar ref={ref}>
            <BurgerButton active={active} onClick={onBurgerClick} />

            <div className={`sidebar ${active ? 'open' : ''}`}>
                {NAVBAR_LINKS.map(({ name, ...props }) => <AnimatedRowLink {...props} onClick={onLinkClick}>{ name }</AnimatedRowLink>)}
            </div>
        </StyledSidebar>
    );
}
