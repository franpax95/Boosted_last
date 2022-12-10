import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryLink } from '../../components/Anchor';
import { RoutinesContext } from '../../contexts/RoutinesContext';
import { StyledRoutines } from './style';

export default function Routines() {
    /** Routines Context */
    const { routines, fetchRoutines } = useContext(RoutinesContext);

    useEffect(() => {
        if(routines === null) {
            fetchRoutines();
        }
    }, []);

    return (
        <StyledRoutines>
            <PrimaryLink to="/routines/add">Añadir rutina</PrimaryLink>

            {routines && routines.length === 0 && <span>No hay rutinas añadidas todavía...</span>}

            {routines && routines.map(routine => (
                <Link key={routine.id} className="routine" to={`/routines/${routine.id}`}>
                    <span>ID: {routine.id}</span>
                    <span>Nombre: {routine.name}</span>
                </Link>
            ))}
        </StyledRoutines>
    );
}
