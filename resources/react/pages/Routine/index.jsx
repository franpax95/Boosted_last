import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PrimaryLink } from '../../components/Anchor';
import { PrimaryButton } from '../../components/Button';
import { Input } from '../../components/Input';
import { RoutinesContext } from '../../contexts/RoutinesContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import { clone } from '../../utils';
import { StyledRoutine } from './style';

export default function Routine() {
    /** Url Params */
    const { id } = useParams();
    /** Navigation */
    const navigate = useNavigate();

    /** Routines Context */
    const { routine, fetchRoutine, deleteRoutine } = useContext(RoutinesContext);
    /** Settings Context */
    const { openModal, closeModal, closeAllModal } = useContext(SettingsContext);


    // ComponentDidMount para pedir categoría
    useEffect(() => {
        const fetch = async () => {
            console.dir(id);
            await fetchRoutine(id);
        }

        fetch();
    }, []);

    const onDeleteClick = async event => {
        // event.preventDefault();
        // event.stopPropagation();

        openModal({
            title: 'Aviso',
            content: ["Va a proceder a borrar la rutina. ¿Está seguro de que desea continuar?"],
            onAccept: () => openModal({
                title: 'Aviso',
                content: ["Si continúas perderás la rutina y no podrás recuperarla. ¿Desea continuar aun así?"],
                onAccept: () => {
                    const delCat = async () => {
                        const ok = await deleteRoutine(routine.id);
                        if(ok) {
                            navigate("/routines");
                        }

                        closeAllModal();
                    }

                    delCat();
                },
                onCancel: () => closeAllModal()
            }),
            onCancel: () => closeModal()
        });
    }


    // Muestra mensaje en caso de no haber categoría cargada
    if(routine === null) {
        return (
            <div>No se encuentra la rutina que buscas...</div>
        );
    }

    return (
        <StyledRoutine>
            <PrimaryLink to={`/routines/edit/${routine.id}`}>Editar rutina</PrimaryLink>
            <PrimaryButton onClick={onDeleteClick}>Eliminar categoría</PrimaryButton>

            <div>
                <div>{routine.id}</div>
                <div>{routine.name}</div>    
            </div>
        </StyledRoutine>
    );
}
