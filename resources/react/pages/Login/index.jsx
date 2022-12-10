import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

import { PrimaryButton } from '../../components/Button';
import { StyledLogin } from './style';
import { Input } from '../../components/Input';
import { Link } from 'react-router-dom';


export default function Login() {
    const { login } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClick = async () => {
        await login('franpax95@gmail.com', 'admin');
    };

    const onSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        await login(email, password);
    }

    return (
        <StyledLogin>
            <form className="login-form" onSubmit={onSubmit}>
                <Input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" />

                <Input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />

                <PrimaryButton>Iniciar Sesión</PrimaryButton>

                <Link to="/signup">Ir a Registrarse</Link>
            </form>
        </StyledLogin>
    );
}
