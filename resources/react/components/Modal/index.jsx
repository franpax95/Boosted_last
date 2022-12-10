import React, { useContext, useRef, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { StyledModal } from './style';

export const Modal = ({
    title = "",
    content = [],
    onAccept,
    onCancel,
    level = 1
}) => {
    console.dir(title);
    /** Modal Functions */
    const { closeModal } = useContext(SettingsContext);

    const onAcceptClick = event => {
        if(onAccept) {
            onAccept();
        }
    }

    const onCancelClick = event => {
        if(onCancel) {
            onCancel();
        }
    }
    
    return (
        <StyledModal>
            <div className="modal">
                <h1>{title}</h1>

                {content.map((txt, key) => <p key={key}>{txt}</p>)}

                {onAccept && <button onClick={onAcceptClick}>Aceptar</button>}

                {onCancel && <button onClick={onCancelClick}>Cancelar</button>}
            </div>
        </StyledModal>
    );
}
