import React, { useContext, useState, Suspense, lazy, useRef, useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { SettingsContext } from '../../contexts/SettingsContext';
import { ReducerContext } from '../../contexts/ReducerContext';
import useLanguage from '../../hooks/useLanguage';
import usePrevious from '../../hooks/usePrevious';
import { StyledCategoriesAdd } from './style';
import { clone, deleteArrayElement } from '../../utils';
import { AiFillSave, AiOutlineClear } from 'react-icons/ai';
import { FaClone } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { MdOutlineClearAll, MdOutlineClear } from 'react-icons/md';

const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const SuccessButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SuccessButton })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const PrimaryImageInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryImageInput })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));
const AddFormPageHeader = lazy(() => import('../../components/Header').then(module => ({ default: module.AddFormPageHeader })));

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
    const { insertCategories } = useContext(ReducerContext);
    /** Form values */
    const [nameController, setNameController] = useState(['']);
    const [imageController, setImageController] = useState([null]);
    /** Previous form controller state to scroll to bottom or not (UX) */
    const prevNameController = usePrevious(nameController);
    /** To handle multiple states concurrently */
    const [isPending, startTransition] = useTransition();

    /** componentDidUpdate: if the number of rows of nameController increments, scroll to bottom */
    useEffect(() => {
        if (ref.current && prevNameController && (prevNameController.length < nameController.length || (prevNameController.length > 1 && nameController.length === 1))) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        } 
    }, [nameController]);

    /**
     * Indicates if any form group have changes
     */
    const formControllerHaveChanges = () => {
        return nameController.some((name, index) => (formGroupHaveChanges(index)));
    }

    /**
     * Indicates if a form group is different from the default form group
     */
    const formGroupHaveChanges = index => {
        const name = nameController[index];
        const image = imageController[index];
        return name !== '' || image !== null;
    }

    /**
     * 'Click' event handler for Add btn. 
     * Add an empty category to the form.
     */
    const onAddClick = event => {
        startTransition(() => {
            setNameController(prev => ([...prev, '']));
            setImageController(prev => ([...prev, null]));
        });
    }

    /**
     * 'Click' event handler for Clone btn of a form group. 
     * Clone a row at the end of the form
     */
    const onCloneClick = (event, index) => {
        startTransition(() => {
            setNameController(prev => ([...prev, clone(prev[index])]));
            setImageController(prev => ([...prev, clone(prev[index])]));
        });
    }

    /**
     * 'Change' event handler for Form Image Inputs.
     */
    const onImageChange = (value, index) => {
        setImageController(prev => [...prev.slice(0, index), value, ...prev.slice(index + 1)]);
    }

    /**
     * 'Change' event handler for Form Name Inputs.
     */
    const onNameChange = (event, index) => {
        const { value } = event.target;
        setNameController(prev => [...prev.slice(0, index), value, ...prev.slice(index + 1)]);
    }

    /**
     * 'Click' event handler for Quit input btn.
     * Delete the input clicked from the form controller.
     * If the group is not empty, it asks user before form confirmation.
     */
    const onQuitClick = (event, index) => {
        if (!formGroupHaveChanges(index)) {
            startTransition(() => {
                setNameController(prev => deleteArrayElement(prev, index));
                setImageController(prev => deleteArrayElement(prev, index));
            });
        } else {
            openModal({
                title: texts.txt17,
                content: [texts.txt18],
                onAccept: () => startTransition(() => {
                    setNameController(prev => deleteArrayElement(prev, index));
                    setImageController(prev => deleteArrayElement(prev, index));
                }),
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Click' event handler for Reset btn. 
     * Clear the form.
     */
    const onResetClick = event => {
        if (formControllerHaveChanges()) {
            openModal({
                title: texts.txt17,
                content: [texts.txt19],
                onAccept: () => startTransition(() => {
                    setNameController(['']);
                    setImageController([null]);
                }),
                onCancel: () => {}
            });
        } else {
            startTransition(() => {
                setNameController(['']);
                setImageController([null]);
            });
        }
    }

    /**
     * 'Click' event handler for Reset group btn. 
     * Clear the form group.
     */
    const onResetGroupClick = (event, index) => {
        if (formGroupHaveChanges(index)) {
            openModal({
                title: texts.txt17,
                content: [texts.txt24],
                onAccept: () => startTransition(() => {
                    setNameController(prev => [...prev.slice(0, index), '', ...prev.slice(index + 1)]);
                    setImageController(prev => [...prev.slice(0, index), null, ...prev.slice(index + 1)]);
                }),
                onCancel: () => {}
            });
        } else {
            startTransition(() => {
                setNameController(prev => [...prev.slice(0, index), '', ...prev.slice(index + 1)]);
                setImageController(prev => [...prev.slice(0, index), null, ...prev.slice(index + 1)]);
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
     * 'Submit' event handler for main form. 
     * Save the categories introduced.
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
        const categoriesToInsert = nameController.map((name, index) => ({ name, image: imageController[index] }));
        const inserted = await insertCategories({ categories: categoriesToInsert, toast: false });
        if (!inserted) {
            const message = categoriesToInsert.length === 1 ? texts.txt20 : texts.txt21;
            toast.error(message, toastConfig({ autoClose: null }));
        } else {
            const message = categoriesToInsert.length === 1 ? texts.txt22 : texts.txt23;
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
                    <span>{nameController.length === 1 ? texts.txt4 : texts.txt5}</span>

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
                    {nameController.map((name, index) => (
                        <div className="form-row" key={index}>
                            <div className="form-inputs">
                                <PrimaryInput
                                    name={`category-name-${index}`} 
                                    value={name} 
                                    onChange={event => onNameChange(event, index)} 
                                    label={`${texts.txt9} ${nameController.length > 1 ? (index + 1) : ''}`}
                                    placeholder={texts.txt10}
                                    autoComplete="off"
                                />

                                <PrimaryImageInput 
                                    className="category-image"
                                    id={`category-image-${index}`}
                                    value={imageController[index]}
                                    onChange={value => onImageChange(value, index)}
                                />
                            </div>

                            <div className="form-options">
                                <SecondaryButton type="button" className="icon-button" onClick={event => onCloneClick(event, index)} tooltip={texts.txt11} tooltipPlacement="left">
                                    <FaClone />
                                </SecondaryButton>

                                <PrimaryButton type="button" className="icon-button" onClick={event => onResetGroupClick(event, index)} tooltip={texts.txt12} tooltipPlacement="left">
                                    <AiOutlineClear />
                                </PrimaryButton>

                                <DangerButton type="button" className="icon-button" onClick={event => onQuitClick(event, index)} disabled={nameController.length <= 1} tooltip={texts.txt13} tooltipPlacement="left">
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
