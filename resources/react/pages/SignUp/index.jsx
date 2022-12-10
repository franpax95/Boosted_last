import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { PrimaryButton } from '../../components/Button';
import { StyledSignUp } from './style';
import { Input } from '../../components/Input';


export default function SignUp() {
    const { signup } = useContext(UserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const onSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        await signup(name, email, password, passwordConfirmation);
    }

    return (
        <StyledSignUp>
            <form className="login-form" onSubmit={onSubmit}>
                <Input name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre de usuario" />

                <Input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" />

                <Input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />

                <Input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Vuelve a escribir tu contraseña" />

                <PrimaryButton>Registrarse</PrimaryButton>

                <Link to="/login">Ir a Iniciar Sesión</Link>
            </form>
        </StyledSignUp>
    );
}
