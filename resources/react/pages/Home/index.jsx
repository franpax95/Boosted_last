import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';

import { PrimaryLink } from '../../components/Anchor';
import { PrimaryButton, SecondaryButton, TertiaryButton } from '../../components/Button';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { StyledPalette } from './style';


const Home = () => {
    const navigate = useNavigate();
    const { setTheme } = useContext(SettingsContext);
    const { logout } = useContext(UserContext);

    const onClick = () => setTheme();

    const onLogoutClick = async () => {
        const ok = await logout();
        if(ok) {
            navigate('/login');
        }
    }

    return (
        <div>
            <StyledPalette>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </StyledPalette>

            <PrimaryButton>PRUEBA PRIMARY BUTTON</PrimaryButton>
            <SecondaryButton>PRUEBA SECONDARY BUTTON</SecondaryButton>
            <TertiaryButton>PRUEBA TERTIARY BUTTON</TertiaryButton>

            <br />
            <hr />
            <br />
            <hr />
            <br />

            <PrimaryButton onClick={onLogoutClick}>LOGOUT</PrimaryButton>
            Home page works!
            <PrimaryLink to="/notfound">Ir a NotFound</PrimaryLink>
            <br/><br/><br />
            <PrimaryButton onClick={onClick}>Cambiar tema</PrimaryButton>
            <br/><br/><br />
            <PrimaryButton>PRUEBA</PrimaryButton>
            <br/><br/><br />
            <PrimaryButton disabled={true}>Mucho texto loren ipsum tu sabe mami moto mami nuevo disco de rosalia</PrimaryButton>

            <br/><br/><br />
            <SecondaryButton>PRUEBA</SecondaryButton>
            <br/><br/><br />
            <SecondaryButton disabled={true}>Mucho texto loren ipsum tu sabe mami moto mami nuevo disco de rosalia</SecondaryButton>

            <br/><br/><br />
            <TertiaryButton>PRUEBA</TertiaryButton>
            <br/><br/><br />
            <TertiaryButton disabled={true}>Mucho texto loren ipsum tu sabe mami moto mami nuevo disco de rosalia</TertiaryButton>
        </div>
    );
}

export default Home;
