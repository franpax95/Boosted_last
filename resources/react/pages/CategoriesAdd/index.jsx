import React, { useContext, useState, Suspense, lazy } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useLanguage from '../../hooks/useLanguage';
import { StyledCategoriesAdd } from './style';
import { clone, deleteArrayElement } from '../../utils';
import { AiFillSave, AiOutlineClose } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { MdOutlineClearAll } from 'react-icons/md';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { SettingsContext } from '../../contexts/SettingsContext';

const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const SuccessButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SuccessButton })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));
const GradientBackground = lazy(() => import('../../components/Background').then(module => ({ default: module.GradientBackground })));
const ScreenSpinner = lazy(() => import('../../components/Spinner').then(module => ({ default: module.ScreenSpinner })));

export default function CategoriesAdd() {
    /** Navigate effect */
    const navigate = useNavigate();
    /** Language */
    const { pages: { CategoriesAdd: texts }} = useLanguage();
    /** Settings Context */
    const { openModal, toastConfig } = useContext(SettingsContext);
    /** Categories Context */
    const { insertCategories } = useContext(CategoriesContext);
    /** Form values */
    const [formController, setFormController] = useState(['']);

    /**
     * 'Click' event handler for Add btn. 
     * Add an empty category to the form.
     */
    const onAdd = event => {
        setFormController(prev => {
            let names = clone(prev);
            names.push('');
            return names;
        });
    }

    /**
     * 'Change' event handler for Form Inputs.
     * Update the form controller state.
     */
    const onInputChange = (event, index) => {
        const { value } = event.target;
        setFormController(prev => {
            let names = clone(prev);
            names[index] = value;
            return names;
        });
    }

    /**
     * 'Click' event handler for Quit input btn.
     * Delete the input clicked from the form controller.
     * If the user is not empty, it asks user before form confirmation.
     */
    const onQuitClick = (event, index) => {
        if (formController[index] === '') {
            setFormController(prev => deleteArrayElement(prev, index));
        } else {
            openModal({
                title: texts.txt8,
                content: [texts.txt9],
                onAccept: () => setFormController(prev => deleteArrayElement(prev, index)),
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Click' event handler for Reset btn. 
     * Clear the form.
     */
    const onReset = event => {
        if (formController.some(name => name !== '')) {
            openModal({
                title: texts.txt14,
                content: [texts.txt15],
                onAccept: () => setFormController(['']),
                onCancel: () => {}
            });
        } else {
            setFormController(['']);
        }
    }

    /**
     * 'Click' event handler for Save btn. 
     * Submit the form.
     */
    const onSave = event => {
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
        const inserted = await insertCategories({ categories: formController.map(name => ({ name })), toast: false });
        if (!inserted) {
            const message = formController.length === 1 ? texts.txt10 : texts.txt11;
            toast.error(message, toastConfig({ autoClose: null }));
        } else {
            const message = formController.length === 1 ? texts.txt12 : texts.txt13;
            toast.success(message, toastConfig());

            navigate('/categories');
        }
    }

    return (
        <Suspense fallback={<ScreenSpinner />}>
            <StyledCategoriesAdd>
                <div className="categories-add-content">
                    <GradientBackground
                        className="gradient-background"
                        dark="linear-gradient(60deg, #2C394B 0%, #082032 100%)"
                        light="linear-gradient(90deg, rgba(233,237,251,1) 0%, rgba(179,193,242,1) 35%, rgba(58,93,223,.5) 100%)"
                    />

                    <div className="info">
                        <h1 className="info-title">{texts.txt1}</h1>

                        <p className="info-body">{texts.txt2}</p>

                        <p className="info-footer">
                            <SuccessButton onClick={onSave}>
                                <AiFillSave />
                                <span>{texts.txt3}</span>
                            </SuccessButton>

                            <SecondaryButton onClick={onAdd}>
                                <IoMdAddCircle />
                                <span>{texts.txt4}</span>
                            </SecondaryButton>

                            <PrimaryButton onClick={onReset}>
                                <MdOutlineClearAll />
                                <span>{texts.txt5}</span>
                            </PrimaryButton>
                        </p>
                    </div>

                    <div className="form">
                        <form onSubmit={onSubmit}>
                            {formController.map((name, index) => (
                                <div className="row" key={index}>
                                    <PrimaryInput
                                        name={`category-${index}`} 
                                        value={name} 
                                        onChange={event => onInputChange(event, index)} 
                                        label={`${texts.txt6} ${formController.length > 1 ? (index + 1) : ''}`}
                                        placeholder={texts.txt7}
                                        autoComplete="off"
                                    />

                                    {formController.length > 1 && <button type="button" className="quit" onClick={event => onQuitClick(event, index)}>
                                        <AiOutlineClose />
                                    </button>}
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </StyledCategoriesAdd>
        </Suspense>
    );
}
