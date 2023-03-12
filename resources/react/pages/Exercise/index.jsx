import React, { useContext, useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../../contexts/SettingsContext';
import { ReducerContext } from '../../contexts/ReducerContext';
import useLanguage from '../../hooks/useLanguage';
import { StyledExercise } from './style';
import { Base64Image } from '../../components/Image';
import { clone } from '../../utils';
import { beautifyDate } from '../../utils/dates';
import DarkIMG from '../../../images/athlete7-transparencies.png';
import LightIMG from '../../../images/athlete8-transparencies.png';

const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const SuccessButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SuccessButton })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const DetailsPageHeader = lazy(() => import('../../components/Header').then(module => ({ default: module.DetailsPageHeader })));
const PrimaryImageInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryImageInput })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));
const PrimarySelect = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimarySelect })));
const PrimaryTextarea = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryTextarea })));

/**
 * Shortcut to parse an exercise to a form controller object
 */
const exercise2controller = ex => {
    if (ex === null) {
        return null;
    }

    const { category, created_at, updated_at, ...exercise } = ex;
    return ({
        ...exercise,
        category_id: category !== null ? category.id : -1
    });
};

export default function Exercise() {
    /** Ref of br */
    const ref = useRef();
    /** Url Params */
    const { id } = useParams();
    /** Navigation */
    const navigate = useNavigate();
    /** Settings Context */
    const { setLoading, openModal, closeAllModal } = useContext(SettingsContext);
    /** App Data management */
    const { categories, fetchCategories, exercise, fetchExercise, updateExercise, deleteExercise } = useContext(ReducerContext);
    /** Language */
    const { pages: { Exercise: texts }} = useLanguage();
    /** Searchbar input controller */
    const [search, setSearch] = useState('');
    /** Exercises to see in the table */
    const [filteredRoutines, setFilteredRoutines] = useState([]);
    /** Selected exercises (to delete) */
    const [selectedRoutines, setSelectedRoutines] = useState([]);
    /** Form parameters to edit */
    const [formController, setFormController] = useState(exercise2controller(exercise));
    /** state to render Edit Form */
    const [showForm, setShowForm] = useState(false);
    /** Hide the screen until the initial fetching is over */
    const [hide, setHide] = useState(true);

    // ComponentDidMount: fetch exercise into component when needed
    useEffect(() => {
        const fetch = async () => {
            // Fetch categories asynchronously
            if (categories === null) {
                fetchCategories();
            }

            // Fetch exercise synchronously
            if (exercise === null || exercise.id !== Number(id)) {
                await fetchExercise({ id });
            }

            setHide(false);
        }

        fetch();
    }, []);

    // componentDidUpdate. Update filtered routines when the exercise change.
    useEffect(() => {
        if (exercise !== null) {
            const routs = exercise.routines || [];
            setFilteredRoutines(applyFilters(routs));
        }
    }, [exercise, search]);

    // componentDidUpdate -> exercise: update the form controller with the new exercise loaded
    useEffect(() => {
        setFormController(exercise2controller(exercise));
    }, [exercise]);

    // componentDidUpdate -> showForm: scroll into ref when show or hide edit form
    useEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showForm]);

    // Return the filtered routines based on the value of the filters (only search this time)
    const applyFilters = routines => {
        let routs = clone(routines);

        if (search !== '') {
            routs = routs.filter(rout => {
                const { name, description } = rout;
                const values = Object.values({ name, description });
                return values.some(value => (value && deleteAccents(value.toString().toLowerCase()).includes(deleteAccents(search.toLowerCase()))));
            });
        }

        return routs;
    }

    /**
     * 'Click' event handler for cancel (form) button.
     * Hide the form and reset controller.
     */
    const onCancelClick = event => {
        setShowForm(false);

        setTimeout(() => {
            setFormController(exercise2controller(exercise));
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

        if (exercise !== null) {
            const delExercise = async () => {
                const deleted = await deleteExercise();
                if (deleted) {
                    navigate('/exercises');
                }
            }

            openModal({
                title: texts.txt22,
                content: [texts.txt23],
                onAccept: () => {
                    // Ask confirmation if exercise belongs to any routine
                    if (Array.isArray(exercise.routines) && exercise.routines.length > 0) {
                        openModal({
                            title: texts.txt22,
                            content: [texts.txt24],
                            onAccept: () => {
                                closeAllModal();
                                delExercise();
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
                        delExercise();
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
    const onDeleteRoutinesClick = async event => {
        if (selectedRoutines.length === 0) {
            openModal({
                title: texts.txt22,
                content: [texts.txt25]
            });
        } else {
            openModal({
                title: texts.txt22,
                content: [texts.txt26],
                onAccept: () => {
                    deleteRoutines({ exercises: selectedRoutines })
                        .then(deleted => {
                            if (deleted) {
                                setSelectedRoutines([]);
                            }
                        });
                },
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
     * 'Change' event handler when a routine is marked/unmarked. 
     * Update the selected routines.
     */
    const onSelectedChange = id => {
        setSelectedRoutines(prev => {
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
        saveExercise();
    }

    /**
     * Update the exercise
     */
    const saveExercise = async () => {
        const ok = await updateExercise({ exercise: formController });
        if (ok) {
            setShowForm(false);
        }
    }

    // Not found message when not exercise loaded
    if (exercise === null) {
        return <div>{texts.txt27}</div>;
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
                                    {exercise.category !== null 
                                        ? <Link to={`/categories/${exercise.category.id}`}>{exercise.category.name}</Link>
                                        : ''
                                    }
                                    
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
                                <label>{texts.txt10}</label>
                                <div className="img">
                                    <Base64Image src={exercise.image.base64} alt={exercise.image.name} />
                                </div>
                            </div> : ''}

                            <div className="buttons">
                                <PrimaryButton onClick={onEditClick}>{texts.txt11}</PrimaryButton>
                                <DangerButton onClick={onDeleteClick}>{texts.txt12}</DangerButton>
                            </div>
                        </div>
                    </div>

                    <div className={`card right ${showForm ? 'active' : ''}`}>
                        <div className="details-form">
                            <h1 className="title">{texts.txt13}</h1>

                            {formController !== null ? <form onSubmit={onSubmit}>
                                <PrimaryInput
                                    className="exercise-name"
                                    name="name" 
                                    value={formController.name} 
                                    onChange={e => onFormControllerChange('name', e.target.value)} 
                                    placeholder={texts.txt14}
                                    label={texts.txt15}
                                    labelSize={120}
                                    autoComplete="off"
                                />

                                <PrimarySelect
                                    className="exercise-category"
                                    name="category" 
                                    value={formController.category_id} 
                                    options={categories ? categories.map(cat => ({ value: cat.id, desc: cat.name })) : []}
                                    onChange={e => onFormControllerChange('category_id', e.target.value)} 
                                    label={texts.txt16}
                                    labelSize={120}
                                    placeholder={texts.txt17}
                                />

                                <PrimaryTextarea
                                    className="exercise-description"
                                    name="description" 
                                    value={formController.description} 
                                    onChange={e => onFormControllerChange('description', e.target.value)} 
                                    placeholder={texts.txt18}
                                    labelSize={120}
                                    label={texts.txt19}
                                />

                                <PrimaryImageInput 
                                    id="image-input"
                                    className="edit-image-input"
                                    value={formController.image}
                                    onChange={value => onFormControllerChange('image', value)}
                                />
                            </form> : ''}

                            <div className="buttons">
                                <SuccessButton onClick={onSaveClick}>{texts.txt20}</SuccessButton>
                                <SecondaryButton onClick={onCancelClick}>{texts.txt21}</SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <hr style={{ width: '150px' }}/>

                <h2 className="title">{texts.txt24}</h2>

                <SearchBar 
                    placeholder={texts.txt25}
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    onClear={() => setSearch('')} 
                />

                <div className="buttons">
                    <PrimaryLink to={`/routines/add`}>{texts.txt22}</PrimaryLink>
                    <DangerButton onClick={onDeleteExercisesClick} disabled={selectedRoutines.length === 0}>{texts.txt23}</DangerButton>
                </div>

                <div className="table">
                    <RoutinesTable 
                        routines={filteredRoutines} 
                        selectionMode={true} 
                        onSelectedChange={onSelectedChange}
                    />
                </div> */}
            </StyledExercise>
        </Suspense>
    );
}
