import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StyledCategory } from './style';
// import { RandomImageCard } from '../../components/Card';
import { SettingsContext } from '../../contexts/SettingsContext';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import useLanguage from '../../hooks/useLanguage';
import { beautifyDate, clone, deleteAccents, deleteArrayElement } from '../../utils';
import DarkIMG from '../../../images/athlete3-transparencies.png';
import LightIMG from '../../../images/athlete4-transparencies.png';

const ExercisesTable = lazy(() => import('../../components/Table').then(module => ({ default: module.ExercisesTable })));
const PrimaryLink = lazy(() => import('../../components/Anchor').then(module => ({ default: module.PrimaryLink })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));
const SearchBar = lazy(() => import('../../components/Input').then(module => ({ default: module.SearchBar })));
const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const SuccessButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SuccessButton })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const GradientBackground = lazy(() => import('../../components/Background').then(module => ({ default: module.GradientBackground })));
const ImageBackground = lazy(() => import('../../components/Background').then(module => ({ default: module.ImageBackground })));

export default function Category() {
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
    const [name, setName] = useState('');

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

    // ComponentDidUpdate: category. Update form controller when category changes.
    useEffect(() => {
        if (category !== null) {
            setName(category.name);
        }
    }, [category]);

    // componentDidUpdate. Update filtered exercises when the category change.
    useEffect(() => {
        if (category !== null) {
            const exs = category.exercises || [];
            setFilteredExercises(applyFilters(exs));
        }
    }, [category, search]);

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
     * Hide the category form and reset name field.
     */
    const onCancelClick = event => {
        setName(category.name);
        setShowForm(false);
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
                title: texts.txt20,
                content: [texts.txt21]
            });
        } else {
            openModal({
                title: texts.txt20,
                content: [texts.txt22],
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
        if (category !== null) {
            setShowForm(true);
        }
    }

    /**
     * 'Click' event handler for save form button.
     * Update category and, if success, hide the category form.
     */
    const onSaveClick = async event => {
        const cat = { id: category.id, name };
        const ok = await updateCategory({ category: cat });
        if (ok) {
            setShowForm(false);
        }
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
     * 'Submit' event handler for form. 
     * Prevent the form and call to save.
     */
    const onSubmit = async e => {
        e.preventDefault();

        const cat = { id: category.id, name };
        const ok = await updateCategory({ category: cat });
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
                <header>
                    <GradientBackground
                        className="bg1"
                        dark="linear-gradient(60deg, #2C394B 0%, #082032 100%)"
                        light="linear-gradient(to top, #F9F6F7 0%, #F0F0F0 100%)"
                    />

                    <div className="info">
                        <div className={`cover front ${showForm ? '' : 'active'}`}>
                            <h1 className="info-title">{texts.txt1}</h1>

                            <div className="info-body category">
                                <div className="group name">
                                    <label>{texts.txt2}</label>
                                    <span>{category.name}</span>
                                </div>

                                <div className="group">
                                    <label>{texts.txt3}</label>
                                    <span>{beautifyDate(category.created_at)}</span>
                                </div>

                                <div className="group">
                                    <label>{texts.txt4}</label>
                                    <span>{beautifyDate(category.updated_at)}</span>
                                </div>
                            </div>

                            <div className="info-footer">
                                <PrimaryButton onClick={onEditClick}>{texts.txt5}</PrimaryButton>
                                <DangerButton onClick={onDeleteClick}>{texts.txt6}</DangerButton>
                            </div>
                        </div>

                        <div className={`cover back ${showForm ? 'active' : ''}`}>
                            <h1 className="info-title">{texts.txt7}</h1>

                            <form className="info-body category-form" onSubmit={onSubmit}>
                                <PrimaryInput 
                                    name="name" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)} 
                                    placeholder={texts.txt8}
                                    label={texts.txt9}
                                    autoComplete="off"
                                />
                            </form>

                            <div className="info-footer">
                                <SuccessButton className="header-btn" onClick={onSaveClick}>{texts.txt10}</SuccessButton>
                                <SecondaryButton className="header-btn" onClick={onCancelClick}>{texts.txt11}</SecondaryButton>
                            </div>
                        </div>
                    </div>

                    <div className="backgrounds">
                        <GradientBackground
                            className="bg1"
                            dark="linear-gradient(0deg, rgba(127,186,18,0.33) 0%, rgba(127,186,18,1) 100%)"
                            light="linear-gradient(0deg, rgba(58,93,223,0.33) 0%, rgba(58,93,223,1) 100%)"
                        />

                        <ImageBackground 
                            className="bg2"
                            objectFit="contain"
                            light={LightIMG}
                            dark={DarkIMG}
                        />

                        <GradientBackground
                            className="bg3"
                            dark="linear-gradient(0deg, rgba(127,186,18,1) 0%, rgba(127,186,18,0.33) 100%)"
                            light="linear-gradient(0deg, rgba(58,93,223,1) 0%, rgba(58,93,223,0.33) 100%)"
                        />
                    </div>
                </header>

                <h1 className="title">{texts.txt12}</h1>

                <SearchBar 
                    placeholder={texts.txt13}
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    onClear={() => setSearch('')} 
                />

                <div className="buttons">
                    <PrimaryLink to="/exercises/add">{texts.txt14}</PrimaryLink>
                    <DangerButton onClick={onDeleteExercisesClick} disabled={selectedExercises.length === 0}>{texts.txt15}</DangerButton>
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
