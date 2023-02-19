import React, { useContext, useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import useLanguage from '../../hooks/useLanguage';
import { clone } from '../../utils';
import { beautifyDate } from '../../utils/dates';
import { StyledExercise } from './style';
import DarkIMG from '../../../images/athlete7-transparencies.png';
import LightIMG from '../../../images/athlete8-transparencies.png';
import { DetailsPageHeader } from '../../components/Header';

const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const SuccessButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SuccessButton })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const CategoryToggle = lazy(() => import('../../components/Input').then(module => ({ default: module.CategoryToggle })));
const PrimaryFileInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryImageInput })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));
const PrimaryTextarea = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryTextarea })));

/**
 * Shortcut to parse an exercise to a form controller object
 */
const exercise2controller = ({ category_id, category_name, created_at, updated_at, ...exercise }) => ({
    ...exercise,                // The exercise info
    isNewCategory: false,       // Necessary to indicate CategoryToggle component which side is active
    categoryId: category_id,    // The id of the category selected in the CategoryToggle component
    categoryName: ''            // Name of the new category to insert in the CategoryToggle component
});

/**
 * Shortcut to parse a form controller object to exercise
 */
const controller2exercise = ({ isNewCategory, categoryId, categoryName, ...controller }) => ({
    ...controller, 
    category_id: categoryId
});

export default function Exercise() {
    /**  */
    const ref = useRef();
    /** Url Params */
    const { id } = useParams();
    /** Navigation */
    const navigate = useNavigate();
    /** Settings Context */
    const { openModal, setLoading } = useContext(SettingsContext);
    /** Categories Context */
    const { categories, fetchCategories, insertCategories, refresh: refreshCategories } = useContext(CategoriesContext);
    /** Categories Context */
    const { exercise, fetchExercise, updateExercise, deleteExercise, refresh: refreshExercises } = useContext(ExercisesContext);
    /** Language */
    const { pages: { Exercise: texts }} = useLanguage();
    /** Form parameters to edit */
    const [formController, setFormController] = useState(exercise ? exercise2controller(exercise) : null);
    /** state to render Edit Form */
    const [showForm, setShowForm] = useState(false);
    /** Hide the screen until the initial fetching is over */
    const [hide, setHide] = useState(true);

    // ComponentDidMount: fetch exercise into component when needed
    useEffect(() => {
        const fetch = async () => {
            if (exercise === null || exercise.id !== Number(id)) {
                await fetchExercise({ id });
            }

            if (categories === null) {
                fetchCategories();
            }

            setHide(false);
        }

        fetch();
    }, []);

    // componentDidUpdate -> exercise: update the form controller with the new exercise loaded
    useEffect(() => {
        setFormController(exercise ? exercise2controller(exercise) : null);
    }, [exercise]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showForm]);

    /**
     * 'Click' event handler for cancel (form) button.
     * Hide the category form and reset name field.
     */
    const onCancelClick = event => {
        setShowForm(false);

        setTimeout(() => {
            setFormController(exercise ? exercise2controller(exercise) : null);
        }, 500);
    }

    /**
     * 'Click' event handler for delete category button.
     * Asks confirmation twice, then delete the category.
     * If success, it redirect to '/categories'.
     */
    const onDeleteClick = async event => {
        if (exercise !== null) {
            const delExercise = async () => {
                setLoading(true);

                const ex = clone(exercise);
                const deleted = await deleteExercise({ id: ex.id, loading: false });
                if (deleted) {
                    await refreshCategories();
                }

                setLoading(false);

                if (deleted) {
                    navigate('/exercises');
                }
            }

            openModal({
                title: texts.txt19,
                content: [texts.txt20],
                onAccept: () => delExercise(),
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Click' event handler for edit button.
     * Hide the exercise info and shows the form to edit it.
     */
    const onEditClick = async event => {
        if (formController !== null) {
            setShowForm(true);
        }
    }

    /**
     * 'Change' event handler for inputs.
     */
    const onFormControllerChange = (attr, value) => {
        setFormController(prev => ({ ...prev, [attr]: value }));
    }

    /**
     * 'Click' event handler for save form button.
     * Update exercise and, if success, hide the exercise form.
     */
    const onSaveClick = event => {
        saveExercise();
    }

    /**
     * 'Submit' event handler for edit exercise form.
     * Update the exercise.
     */
    const onSubmit = e => {
        e.preventDefault();
        saveExercise();
    }

    /**
     * Update the exercise
     */
    const saveExercise = async () => {
        setLoading(true);

        // We save the initial category id to check if there are changes on it
        const oldCategoryId = exercise.category_id;

        // Select the category id. If it is new, insert it before the exercise.
        let categoryId = formController.categoryId;
        if (formController.isNewCategory) {
            const categoryInserted = await insertCategories({ categories: [{ name: formController.categoryName }], loading: false, toast: false, refresh: false });

            if (!Array.isArray(categoryInserted) || categoryInserted.length === 0) {
                const message = 'Ha ocurrido un error a la hora de insertar la categoría...';
                toast.error(message, toastConfig({ autoClose: null }));
                setLoading(false);
                return;
            }

            categoryId = categoryInserted[0].id;
        }

        // Update the exercise
        const exerciseUpdated = await updateExercise({ exercise: controller2exercise({ ...formController, categoryId }), loading: false });
        if (exerciseUpdated) {
            if (categoryId !== oldCategoryId) {
                await refreshCategories();
            }
            setShowForm(false);
        }

        setLoading(false);
    }

    // Not found message when not exercise loaded
    if (exercise === null) {
        return <div>No se encuentra el ejercicio que buscas...</div>;
    }

    // Hide the section
    if (hide) {
        return '';
    }

    return (
        <Suspense>
            <StyledExercise>
                <DetailsPageHeader 
                    title={texts.txt1}
                    body={texts.txt2}
                    footer={texts.txt3}
                    lightIMG={LightIMG}
                    darkIMG={DarkIMG}
                    reverse
                />

                <br ref={ref} />

                <div className="slider">
                    <div className={`card left ${showForm ? '' : 'active'}`}>
                        <div className="details-info">
                            <h1 className="title">{texts.txt4}</h1>

                            <div className="group name">
                                <label>{texts.txt5}</label>
                                <span>{exercise.name}</span>
                            </div>

                            <div className="group category">
                                <label>{texts.txt6}</label>
                                <span>
                                    <Link to={`/categories/${exercise.category_id}`}>{exercise.category_name}</Link>
                                </span>
                            </div>

                            <div className="group description">
                                <label>{texts.txt7}</label>
                                <span>{exercise.description}</span>
                            </div>

                            <div className="group created_at">
                                <label>{texts.txt8}</label>
                                <span>{beautifyDate(exercise.created_at)}</span>
                            </div>

                            <div className="group updated_at">
                                <label>{texts.txt9}</label>
                                <span>{beautifyDate(exercise.updated_at)}</span>
                            </div>

                            {exercise.image ? <div className="group image">
                                <label>{texts.txt21}</label>
                                <div className="img">
                                    <img src={exercise.image} alt={exercise.name} />
                                </div>
                            </div> : ''}

                            <div className="buttons">
                                <PrimaryButton onClick={onEditClick}>{texts.txt10}</PrimaryButton>
                                <DangerButton onClick={onDeleteClick}>{texts.txt11}</DangerButton>
                            </div>
                        </div>
                    </div>

                    <div className={`card right ${showForm ? 'active' : ''}`}>
                        <div className="details-form">
                            <h1 className="title">{texts.txt12}</h1>

                            {formController !== null ? <form onSubmit={onSubmit}>
                                <PrimaryInput
                                    className="exercise-name"
                                    name="name" 
                                    value={formController.name} 
                                    onChange={e => onFormControllerChange('name', e.target.value)} 
                                    placeholder={texts.txt13}
                                    label={texts.txt14}
                                    autoComplete="off"
                                />

                                <CategoryToggle
                                    className="category-toggle"
                                    isNewCategory={formController.isNewCategory}
                                    categories={categories || []}
                                    categoryId={formController.categoryId}
                                    categoryName={formController.categoryName}
                                    setIsNewCategory={value => onFormControllerChange('isNewCategory', value)}
                                    setCategoryId={value => onFormControllerChange('categoryId', value)}
                                    setCategoryName={value => onFormControllerChange('categoryName', value)}
                                />

                                <PrimaryTextarea
                                    className="exercise-description"
                                    name="description" 
                                    value={formController.description} 
                                    onChange={e => onFormControllerChange('description', e.target.value)} 
                                    placeholder={texts.txt15}
                                    label={texts.txt16}
                                />

                                <PrimaryFileInput 
                                    id={`image-input`}
                                    className="edit-image-input"
                                    value={formController.image}
                                    onChange={value => onFormControllerChange('image', value)}
                                />
                            </form> : ''}

                            <div className="buttons">
                                <SuccessButton onClick={onSaveClick}>{texts.txt17}</SuccessButton>
                                <SecondaryButton onClick={onCancelClick}>{texts.txt18}</SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledExercise>
        </Suspense>
    );
}
