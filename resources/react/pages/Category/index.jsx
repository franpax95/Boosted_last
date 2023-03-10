import React, { useContext, useEffect, useRef, useState, Suspense, lazy, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StyledCategory } from './style';
// import { RandomImageCard } from '../../components/Card';
import { SettingsContext } from '../../contexts/SettingsContext';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import useLanguage from '../../hooks/useLanguage';
import { clone, deleteAccents, deleteArrayElement } from '../../utils';
import { beautifyDate } from '../../utils/dates';
import DarkIMG from '../../../images/athlete3-transparencies.png';
import LightIMG from '../../../images/athlete4-transparencies.png';
import { Base64Image } from '../../components/Image';

const PrimaryLink = lazy(() => import('../../components/Anchor').then(module => ({ default: module.PrimaryLink })));
const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const SuccessButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SuccessButton })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));
const PrimaryImageInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryImageInput })));
const SearchBar = lazy(() => import('../../components/Input').then(module => ({ default: module.SearchBar })));
const DetailsPageHeader = lazy(() => import('../../components/Header').then(module => ({ default: module.DetailsPageHeader })));
const ExercisesTable = lazy(() => import('../../components/Table').then(module => ({ default: module.ExercisesTable })));

export default function Category() {
    /** Ref of br */
    const ref = useRef();
    /** Ref of form inself to calculate height */
    // const sliderRef = useRef();
    const sliderRef = useCallback(node => {
        if (node !== null) {
            console.dir(node); // node = elRef.current
            console.dir(node.scrollHeight);
        }
    }, []);

    const [sliderHeight, setSliderHeight] = useState('600px');

    useEffect(() => console.dir(sliderRef), [sliderRef]);

    /** Url Params */
    const { id } = useParams();
    /** Navigation */
    const navigate = useNavigate();
    /** Settings Context */
    const { setLoading, openModal, closeAllModal } = useContext(SettingsContext);
    /** Categories Context */
    const { category, fetchCategory, updateCategory, deleteCategory } = useContext(CategoriesContext);
    /** ExercisesContext */
    const { refresh: refreshExercises, deleteExercises } = useContext(ExercisesContext);
    /** Language */
    const { pages: { Category: texts }} = useLanguage();
    /** Searchbar input controller */
    const [search, setSearch] = useState('');
    /** Exercises to see in the table */
    const [filteredExercises, setFilteredExercises] = useState([]);
    /** Selected exercises (to delete) */
    const [selectedExercises, setSelectedExercises] = useState([]);
    /** Hide the screen until the initial fetching is over */
    const [hide, setHide] = useState(true);
    /** state to render Edit Form */
    const [showForm, setShowForm] = useState(false);
    /** state with a copy of the category to handle form fields */
    const [formController, setFormController] = useState(category);

    // ComponentDidMount: fetch category into component when needed
    useEffect(() => {
        const fetch = async () => {
            if (category === null || category.id !== Number(id)) {
                await fetchCategory({ id });
            }

            setHide(false);
        }

        fetch();
    }, []);

    // componentDidUpdate. Update filtered exercises when the category change.
    useEffect(() => {
        if (category !== null) {
            const exs = category.exercises || [];
            setFilteredExercises(applyFilters(exs));
        }
    }, [category, search]);

    // ComponentDidUpdate: category. Update form controller when category changes.
    useEffect(() => {
        setFormController(category);
    }, [category]);

    // componentDidUpdate -> showForm: scroll into ref when show or hide edit form
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showForm]);

    // Return the filtered excercises based on the value of the filters (only search this time)
    const applyFilters = exercises => {
        let exs = clone(exercises);

        if (search !== '') {
            exs = exs.filter(ex => {
                // const values = Object.values(c);
                // return values.some(value => (deleteAccents(value.toString().toLowerCase()).includes(deleteAccents(search.toLowerCase()))));
                return deleteAccents(ex.name.toLowerCase()).includes(deleteAccents(search.toLowerCase()));
            });
        }

        return exs;
    }

    /**
     * 'Click' event handler for cancel (form) button.
     * Hide the form and reset controller.
     */
    const onCancelClick = event => {
        setShowForm(false);

        setTimeout(() => {
            setFormController(category);
        }, 500);
    }

    /**
     * 'Click' event handler for delete category button.
     * Asks confirmation twice, then delete the category.
     * If success, it redirect to '/categories'.
     */
    const onDeleteClick = async event => {
        event.preventDefault();
        event.stopPropagation();

        if (category !== null) {
            const delCat = async () => {
                setLoading(true);

                const cat = clone(category);
                const deleted = await deleteCategory({ id: cat.id, loading: false });
                if (deleted && Array.isArray(cat.exercises) && cat.exercises.length > 0) {
                    // We refresh the exercises if category had any
                    await refreshExercises();
                }

                setLoading(false);

                if (deleted) {
                    navigate('/categories');
                }
            }

            openModal({
                title: texts.txt17,
                content: [texts.txt18],
                onAccept: () => {
                    // Ask confirmation if category have any exercise
                    if (Array.isArray(category.exercises) && category.exercises.length > 0) {
                        openModal({
                            title: texts.txt17,
                            content: [texts.txt19],
                            onAccept: () => {
                                closeAllModal();
                                delCat();
                                return false;
                            },
                            onCancel: () => {
                                closeAllModal();
                                return false;
                            },
                        });
                        return false;
                    }

                    // Else, delete the category
                    else {
                        delCat();
                    }
                },
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Click' event handler for delete exercises button.
     * Asks confirmation, then delete the selected exercises.
     */
    const onDeleteExercisesClick = async event => {
        if (selectedExercises.length === 0) {
            openModal({
                title: texts.txt17,
                content: [texts.txt20]
            });
        } else {
            openModal({
                title: texts.txt17,
                content: [texts.txt21],
                onAccept: () => {
                    deleteExercises({ exercises: selectedExercises })
                        .then(deleted => {
                            if (deleted) {
                                fetchCategory({ id, force: true });
                                setSelectedExercises([]);
                            }
                        });
                },
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Click' event handler for show form (edit) button.
     * Show the category form.
     */
    const onEditClick = event => {
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
     * Update category and, if success, hide the category form.
     */
    const onSaveClick = async event => {
        saveCategory();
    }

    /**
     * 'Change' event handler when a category is marked/unmarked. 
     * Update the selected categories.
     */
    const onSelectedChange = id => {
        setSelectedExercises(prev => {
            let selected = clone(prev);
            const index = selected.findIndex(sel => sel === id);

            if (index !== -1) {
                selected = deleteArrayElement(selected, index);
            } else {
                selected = [...selected, id];
            }

            return selected;
        });
    }

    /**
     * 'Submit' event handler for edit exercise form.
     * Update the exercise.
     */
    const onSubmit = e => {
        e.preventDefault();
        saveCategory();
    }

    /**
     * Update the category
     */
    const saveCategory = async () => {
        const ok = await updateCategory({ category: formController });
        if (ok) {
            setShowForm(false);
        }
    }

    // Error message if no category
    if (category === null) {
        return (<div>{texts.txt16}</div>);
    }

    // Hide the section
    if (hide) {
        return '';
    }

    return (
        <Suspense>
            <StyledCategory>
                <DetailsPageHeader 
                    title={texts.txt1}
                    body={texts.txt2}
                    footer={texts.txt3}
                    lightIMG={LightIMG}
                    darkIMG={DarkIMG}
                />

                <br ref={ref} />

                <div className="slider" ref={sliderRef}>
                    <div className={`card left ${showForm ? '' : 'active'}`}>
                        <div className="details-info">
                            <h1 className="title">{texts.txt4}</h1>

                            <div className="group name">
                                <label>{texts.txt5}</label>
                                <span>{category.name}</span>
                            </div>

                            <div className="group created_at">
                                <label>{texts.txt6}</label>
                                <span>{beautifyDate(category.created_at)}</span>
                            </div>

                            <div className="group updated_at">
                                <label>{texts.txt7}</label>
                                <span>{beautifyDate(category.updated_at)}</span>
                            </div>

                            {category.image ? <div className="group image">
                                <label>{texts.txt8}</label>
                                <div className="img">
                                    <Base64Image src={category.image.base64} alt={category.image.name} />
                                </div>
                            </div> : ''}

                            <div className="buttons">
                                <PrimaryButton onClick={onEditClick}>{texts.txt9}</PrimaryButton>
                                <DangerButton onClick={onDeleteClick}>{texts.txt10}</DangerButton>
                            </div>
                        </div>
                    </div>

                    <div className={`card right ${showForm ? 'active' : ''}`}>
                        <div className="details-form">
                            <h1 className="title">{texts.txt11}</h1>

                            {formController !== null ? <form onSubmit={onSubmit}>
                                <PrimaryInput
                                    className="category-name"
                                    name="name" 
                                    value={formController.name} 
                                    onChange={e => onFormControllerChange('name', e.target.value)} 
                                    placeholder={texts.txt12}
                                    label={texts.txt13}
                                    autoComplete="off"
                                />

                                <PrimaryImageInput
                                    id={`image-input`}
                                    className="edit-image-input"
                                    value={formController.image}
                                    onChange={value => onFormControllerChange('image', value)}
                                />
                            </form> : ''}

                            <div className="buttons">
                                <SuccessButton onClick={onSaveClick}>{texts.txt14}</SuccessButton>
                                <SecondaryButton onClick={onCancelClick}>{texts.txt15}</SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table">
                    <ExercisesTable 
                        exercises={filteredExercises} 
                        withCategories={false} 
                        selectionMode={true} 
                        onSelectedChange={onSelectedChange}
                    />
                </div>
            </StyledCategory>
        </Suspense>
    );
}
