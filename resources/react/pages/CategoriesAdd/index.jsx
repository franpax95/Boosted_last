import React, { useContext, useState, Suspense, lazy, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useLanguage from '../../hooks/useLanguage';
import { StyledCategoriesAdd } from './style';
import { clone, deleteArrayElement } from '../../utils';
import { AiFillSave, AiOutlineClear } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { MdOutlineClearAll, MdOutlineClear } from 'react-icons/md';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import { AddFormPageHeader } from '../../components/Header';
import { FaClone } from 'react-icons/fa';
import usePrevious from '../../hooks/usePrevious';

const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const SuccessButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SuccessButton })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));
const PrimaryImageInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryImageInput })));

export default function CategoriesAdd() {
    /** Ref to scroll behaviour */
    const ref = useRef();
    /** Navigate effect */
    const navigate = useNavigate();
    /** Language */
    const { pages: { CategoriesAdd: texts }} = useLanguage();
    /** Settings Context */
    const { openModal, toastConfig } = useContext(SettingsContext);
    /** Categories Context */
    const { insertCategories } = useContext(CategoriesContext);
    /** Form values */
    const [formController, setFormController] = useState([{ name: '', image: null }]);
    /** Previous form controller state to scroll to bottom or not */
    const prevFormController = usePrevious(formController);

    useEffect(() => {
        if (ref.current && prevFormController && (prevFormController.length < formController.length || formController.length === 1)) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        } 
    }, [formController]);

    /**
     * 'Click' event handler for Add btn. 
     * Add an empty category to the form.
     */
    const onAddClick = event => {
        setFormController(prev => ([...prev, { name: '', image: null }]));
    }

    /**
     * 'Click' event handler for Clone btn of a form group. 
     * Clone a row at the end of the form
     */
    const onCloneClick = (event, index) => {
        setFormController(prev => ([...prev, clone(prev[index])]));
    }

    /**
     * 'Change' event handler for Form Inputs.
     * Update the form controller state.
     */
    const onFormControllerChange = (attr, value, index) => {
        setFormController(prev => {
            let controller = clone(prev);
            controller[index][attr] = value;
            return controller;
        });
    }

    /**
     * 'Click' event handler for Quit input btn.
     * Delete the input clicked from the form controller.
     * If the group is not empty, it asks user before form confirmation.
     */
    const onQuitClick = (event, index) => {
        if (formController[index].name === '' && formController[index].image === null) {
            setFormController(prev => deleteArrayElement(prev, index));
        } else {
            openModal({
                title: texts.txt17,
                content: [texts.txt18],
                onAccept: () => setFormController(prev => deleteArrayElement(prev, index)),
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Click' event handler for Reset btn. 
     * Clear the form.
     */
    const onResetClick = event => {
        if (formController.some(({ name, image }) => (name !== '' || image !== null))) {
            openModal({
                title: texts.txt17,
                content: [texts.txt19],
                onAccept: () => setFormController([{ name: '', image: null }]),
                onCancel: () => {}
            });
        } else {
            setFormController([{ name: '', image: null }]);
        }
    }

    /**
     * 'Click' event handler for Reset group btn. 
     * Clear the form group.
     */
    const onResetGroupClick = (event, index) => {
        if (formController[index].name !== '' || formController[index].image !== null) {
            setFormController(prev => {
                let controller = clone(prev);
                controller[index] = { name: '', image: null };
                return controller;
            });
        }
    }

    /**
     * 'Click' event handler for Save btn. 
     * Submit the form.
     */
    const onSaveClick = event => {
        saveCategories();
    }

    /**
     * Sube las categorías
     */
    const onSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        saveCategories();
    }

    /**
     * Save categories implementation.
     */
    const saveCategories = async () => {
        const inserted = await insertCategories({ categories: formController, toast: false });
        if (!inserted) {
            const message = formController.length === 1 ? texts.txt20 : texts.txt21;
            toast.error(message, toastConfig({ autoClose: null }));
        } else {
            const message = formController.length === 1 ? texts.txt22 : texts.txt23;
            toast.success(message, toastConfig());

            navigate('/categories');
        }
    }

    return (
        <Suspense>
            <StyledCategoriesAdd className="add-form">
                <AddFormPageHeader
                    title={texts.txt1}
                    body={texts.txt2}
                    footer={texts.txt3}
                />

                <h1 className="title main-title">
                    <span>{formController.length === 1 ? texts.txt4 : texts.txt5}</span>

                    <SuccessButton className="icon-button" onClick={onSaveClick} tooltip={texts.txt6}>
                        <AiFillSave />
                    </SuccessButton>

                    <SecondaryButton className="icon-button" onClick={onAddClick} tooltip={texts.txt7}>
                        <IoMdAddCircle />
                    </SecondaryButton>

                    <PrimaryButton className="icon-button" onClick={onResetClick} tooltip={texts.txt8}>
                        <MdOutlineClearAll />
                    </PrimaryButton>
                </h1>

                <form className="main-form" onSubmit={onSubmit}>
                    {formController.map((category, index) => (
                        <div className="form-row" key={index}>
                            <div className="form-inputs">
                                <PrimaryInput
                                    name={`category-${index}`} 
                                    value={category.name} 
                                    onChange={event => onFormControllerChange('name', event.target.value, index)} 
                                    label={`${texts.txt9} ${formController.length > 1 ? (index + 1) : ''}`}
                                    placeholder={texts.txt10}
                                    autoComplete="off"
                                />

                                <PrimaryImageInput 
                                    id={`image-input`}
                                    className="edit-image-input"
                                    value={category.image}
                                    onChange={value => onFormControllerChange('image', value, index)}
                                />
                            </div>

                            <div className="form-options">
                                <SecondaryButton type="button" className="icon-button" onClick={event => onCloneClick(event, index)} tooltip={texts.txt11} tooltipPlacement="left">
                                    <FaClone />
                                </SecondaryButton>

                                <PrimaryButton type="button" className="icon-button" onClick={event => onResetGroupClick(event, index)} tooltip={texts.txt12} tooltipPlacement="left">
                                    <AiOutlineClear />
                                </PrimaryButton>

                                <DangerButton type="button" className="icon-button" onClick={event => onQuitClick(event, index)} disabled={formController.length <= 1} tooltip={texts.txt13} tooltipPlacement="left">
                                    <MdOutlineClear />
                                </DangerButton>
                            </div>
                        </div>
                    ))}
                </form>

                <div className="form-footer">
                    <SuccessButton onClick={onSaveClick}>
                        <AiFillSave />
                        <span>{texts.txt14}</span>
                    </SuccessButton>

                    <SecondaryButton onClick={onAddClick}>
                        <IoMdAddCircle />
                        <span>{texts.txt15}</span>
                    </SecondaryButton>

                    <PrimaryButton onClick={onResetClick}>
                        <MdOutlineClearAll />
                        <span>{texts.txt16}</span>
                    </PrimaryButton>
                </div>

                <br ref={ref} />
            </StyledCategoriesAdd>
        </Suspense>
    );
}
