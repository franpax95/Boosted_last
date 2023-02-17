import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import useLanguage from '../../hooks/useLanguage';
import { StyledModal } from './style';

export const Modal = ({
    id = 1,
    title = '',
    content = [],
    onAccept,
    onCancel,
    level = 0,
    closeAnimation = false,
    align = 'left'
}) => {
    /** Language */
    const { components: { Modal: texts }} = useLanguage();
    /** Modal Functions */
    const { closeModal } = useContext(SettingsContext);

    /**
     * Shortcut to close the current modal.
     */
    const close = () => closeModal(id);

    /**
     * 'Click' event handler for Accept Button.
     */
    const onAcceptClick = event => {
        // If callback specified and it returns other value than 'false' (void, boolean as types), close the modal
        if (onAccept) {
            const success = onAccept();
            if (success !== false) {
                close();
            }
        } 

        // If callback not specified, just close the modal
        else {
            close();
        }
    }

    /**
     * 'Click' event handler for Cancel Button.
     */
    const onCancelClick = event => {
        // If callback specified and it returns other value than 'false' (void, boolean as types), close the modal
        if (onCancel) {
            const success = onCancel();
            if (success !== false) {
                close();
            }
        } 

        // If callback not specified, just close the modal
        else {
            close();
        }
    }

    /**
     * 'Click' event handler for Default Button.
     */
    const onCloseClick = event => {
        close();
    }
    
    return (
        <StyledModal level={level} className={closeAnimation ? 'close-animation' : 'open-animation'} align={align}>
            <div className="modal">
                <h1 className="modal-title">{title}</h1>

                <div className="modal-body">
                    {content.map((txt, key) => <p key={key}>{txt}</p>)}
                </div>

                <div className="modal-footer">
                    {onAccept && <button className="accept" onClick={onAcceptClick}>{texts.txt1}</button>}
                    {onCancel && <button className="cancel" onClick={onCancelClick}>{texts.txt2}</button>}
                    {!onAccept && !onCancel && <button className="default" onClick={onCloseClick}>{texts.txt3}</button>}
                </div>
            </div>
        </StyledModal>
    );
}
