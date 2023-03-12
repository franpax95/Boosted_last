import React, { useContext, useEffect, useState, Suspense, lazy, useRef, useTransition } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { SettingsContext } from '../../contexts/SettingsContext';
import { ReducerContext } from '../../contexts/ReducerContext';
import useLanguage from '../../hooks/useLanguage';
import usePrevious from '../../hooks/usePrevious';
import { StyledExercisesAdd } from './style';
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
const PrimarySelect = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimarySelect })));
const PrimaryTextarea = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryTextarea })));
const AddFormPageHeader = lazy(() => import('../../components/Header').then(module => ({ default: module.AddFormPageHeader })));

export default function ExercisesAdd() {
    /** Ref to scroll behaviour */
    const ref = useRef();
    /** Url Params */
    const { id: defaultCategoryId, ...params } = useParams();
    /** Navigate effect */
    const navigate = useNavigate();
    /** Language */
    const { pages: { ExercisesAdd: texts }} = useLanguage();
    /** Settings Context */
    const { openModal, toastConfig } = useContext(SettingsContext);
    /** App Data */
    const { categories, fetchCategories, insertExercises } = useContext(ReducerContext);
    /** Form values: each element of the collection is considered as a group */
    const [formController, setFormController] = useState([]);
    const [imageController, setImageController] = useState([]); // Handle images in other state to avoid delay typing inputs
    /** Previous form controller state to scroll to bottom or not (UX) */
    const prevFormController = usePrevious(formController);
    /** To handle multiple states concurrently */
    const [isPending, startTransition] = useTransition();

    /** LOG */
    // useEffect(() => console.dir({ formController, imageController }), [formController, imageController]);
    // useEffect(() => console.dir({ defaultCategoryId, params }), [defaultCategoryId, params]);
    // useEffect(() => console.dir(ref ? ref.current : ref), [ref.current]);

    /** componentDidMount. If not, fetch categories for select. Then initialize form controllers */
    useEffect(() => {
        if (categories === null) {
            fetchCategories();
        }

        startTransition(() => {
            setFormController([getEmptyFormGroup()]);
            setImageController([null]);
        });
    }, []);

    /** componentDidUpdate: if the number of rows of formController increments, scroll to bottom */
    useEffect(() => {
        if (ref.current && prevFormController && prevFormController.length > 0 && (prevFormController.length < formController.length || (prevFormController.length > 1 && formController.length === 1))) {
            setTimeout(() => {
                ref.current.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } 
    }, [formController]);

    /** componentDidUpdate: categories. Update the category input values */
    useEffect(() => {
        const emptyId = categories && categories.length > 0 ? categories[0].id : 0;
        const defaultId = defaultCategoryId ? Number(defaultCategoryId) : emptyId;

        // Actualizamos los valores de categoría no seteados
        setFormController(prev => prev.map(group => ({
            name: group.name,
            description: group.description,
            category_id: group.category_id || defaultId
        })));
    }, [categories]);

    /**
     * Indicates if any form group have changes
     */
    const formControllerHaveChanges = () => {
        return formController.some((group, index) => (formGroupHaveChanges(index)));
    }

    /**
     * Indicates if a form group is different from the default form group
     */
    const formGroupHaveChanges = index => {
        const empty = getEmptyFormGroup();
        const group = formController[index];
        const image = imageController[index];

        return empty.name !== group.name 
            || empty.description !== group.description 
            || image !== null 
            || empty.category_id !== group.category_id;
    }

    /**
     * Returns a form group by default
     */
    const getEmptyFormGroup = () => {
        const defaultId = categories && categories.length > 0 ? categories[0].id : 0;

        return ({
            name: '',
            description: '',
            category_id: defaultCategoryId ? Number(defaultCategoryId) : defaultId,
        });
    }

    /**
     * 'Click' event handler for Add Btn.
     * Add an empty exercise to the form.
     */
    const onAddClick = event => {
        startTransition(() => {
            setFormController(prev => ([...prev, getEmptyFormGroup()]));
            setImageController(prev => ([...prev, null]));
        });
    }

    /**
     * 'Click' event handler for Clone Form Group Btn.
     */
    const onCloneClick = (event, index) => {
        startTransition(() => {
            setFormController(prev => ([...prev, clone(prev[index])]));
            setImageController(prev => ([...prev, clone(prev[index])]));
        });
    }

    /**
     * 'Change' event handler for a form group.
     * Receives the index of the group to change, the attribute to change, and the new value to set.
     */
    const onFormGroupChange = (event, attr, index) => {
        const { value } = event.target;
        let formGroup = formController[index];
        formGroup[attr] = attr === 'category' ? Number(value) : value;

        setFormController(prev => [...prev.slice(0, index), formGroup, ...prev.slice(index + 1)]);
    }

    /**
     * 'Change' event handler for Form Image Inputs.
     */
    const onImageChange = (value, index) => {
        setImageController(prev => [...prev.slice(0, index), value, ...prev.slice(index + 1)]);
    }

    /**
     * 'Click' event handle for Quit Form Group btn.
     */
    const onQuitClick = (event, index) => {
        if (!formGroupHaveChanges(index)) {
            startTransition(() => {
                setFormController(prev => deleteArrayElement(prev, index));
                setImageController(prev => deleteArrayElement(prev, index));
            });
        } else {
            openModal({
                title: [texts.txt21],
                content: [texts.txt22],
                onAccept: () => startTransition(() => {
                    setFormController(prev => deleteArrayElement(prev, index));
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
                title: [texts.txt21],
                content: [texts.txt23],
                onAccept: () => startTransition(() => {
                    setFormController([getEmptyFormGroup()]);
                    setImageController([null]);
                }),
                onCancel: () => {}
            });
        } else {
            startTransition(() => {
                setFormController([getEmptyFormGroup()]);
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
                title: [texts.txt21],
                content: [texts.txt24],
                onAccept: () => startTransition(() => {
                    setFormController(prev => [...prev.slice(0, index), getEmptyFormGroup(), ...prev.slice(index + 1)]);
                    setImageController(prev => [...prev.slice(0, index), null, ...prev.slice(index + 1)]);
                }),
                onCancel: () => {}
            });
        } else {
            startTransition(() => {
                setFormController(prev => [...prev.slice(0, index), getEmptyFormGroup(), ...prev.slice(index + 1)]);
                setImageController(prev => [...prev.slice(0, index), null, ...prev.slice(index + 1)]);
            });
        }
    }

    /**
     * 'Click' event handler for Save btn. 
     * Submit the form.
     */
    const onSaveClick = event => {
        saveExercises();
    }

    /**
     * 'Submit' event handler for main form. 
     * Save the exercises introduced.
     */
    const onSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        saveExercises();
    }

    /**
     * Save exercises implementation.
     */
    const saveExercises = async () => {
        const exercisesToInsert = formController.map((group, index) => ({ ...group, image: imageController[index] }));
        const inserted = await insertExercises({ exercises: exercisesToInsert, toast: false });
        if (!inserted) {
            const message = exercisesToInsert.length === 1 ? texts.txt25 : texts.txt26;
            toast.error(message, toastConfig({ autoClose: null }));
        } else {
            const message = exercisesToInsert.length === 1 ? texts.txt27 : texts.txt28;
            toast.success(message, toastConfig());

            navigate('/exercises');
        }
    }

    return (
        <Suspense>
            <StyledExercisesAdd className="add-form">
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
                    {formController.map((group, index) => (
                        <div className="form-row" key={index}>
                            <div className="form-inputs">
                                <PrimaryInput
                                    className="exercise-name"
                                    name={`exercise-name-${index}`} 
                                    value={group.name} 
                                    onChange={event => onFormGroupChange(event, 'name', index)} 
                                    label={`${texts.txt9} ${formController.length > 1 ? (index + 1) : ''}`}
                                    labelSize={120}
                                    placeholder={texts.txt10}
                                    autoComplete="off"
                                />

                                <PrimarySelect
                                    className="exercise-category"
                                    name={`exercise-category-${index}`} 
                                    value={group.category_id} 
                                    options={categories ? categories.map(cat => ({ value: cat.id, desc: cat.name })) : []}
                                    onChange={event => onFormGroupChange(event, 'category_id', index)} 
                                    label={texts.txt11}
                                    labelSize={120}
                                    placeholder={texts.txt12}
                                />

                                <PrimaryTextarea
                                    className="exercise-description"
                                    name={`exercise-description-${index}`} 
                                    value={group.description} 
                                    onChange={event => onFormGroupChange(event, 'description', index)} 
                                    label={texts.txt13}
                                    labelSize={120}
                                    placeholder={texts.txt14}
                                />

                                <PrimaryImageInput 
                                    className="exercise-image"
                                    id={`exercise-image-${index}`}
                                    value={imageController[index]}
                                    onChange={value => onImageChange(value, index)}
                                />
                            </div>

                            <div className="form-options">
                                <SecondaryButton type="button" className="icon-button" onClick={event => onCloneClick(event, index)} tooltip={texts.txt15} tooltipPlacement="left">
                                    <FaClone />
                                </SecondaryButton>

                                <PrimaryButton type="button" className="icon-button" onClick={event => onResetGroupClick(event, index)} tooltip={texts.txt16} tooltipPlacement="left">
                                    <AiOutlineClear />
                                </PrimaryButton>

                                <DangerButton type="button" className="icon-button" onClick={event => onQuitClick(event, index)} disabled={formController.length <= 1} tooltip={texts.txt17} tooltipPlacement="left">
                                    <MdOutlineClear />
                                </DangerButton>
                            </div>
                        </div>
                    ))}
                </form>

                <div className="form-footer">
                    <SuccessButton onClick={onSaveClick}>
                        <AiFillSave />
                        <span>{texts.txt18}</span>
                    </SuccessButton>

                    <SecondaryButton onClick={onAddClick}>
                        <IoMdAddCircle />
                        <span>{texts.txt19}</span>
                    </SecondaryButton>

                    <PrimaryButton onClick={onResetClick}>
                        <MdOutlineClearAll />
                        <span>{texts.txt20}</span>
                    </PrimaryButton>
                </div>

                <br ref={ref} />
            </StyledExercisesAdd>
        </Suspense>
    );
}
