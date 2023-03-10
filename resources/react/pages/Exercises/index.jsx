import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { StyledExercises, StyledNotFoundExercises } from './style';
import { clone, deleteAccents, deleteArrayElement } from '../../utils';
import { SettingsContext } from '../../contexts/SettingsContext';
import useLanguage from '../../hooks/useLanguage';
import DarkIMG from '../../../images/athlete6-transparencies.png';
import LightIMG from '../../../images/athlete5-transparencies.png';
import { CategoriesContext } from '../../contexts/CategoriesContext';

const ExercisesTable = lazy(() => import('../../components/Table').then(module => ({ default: module.ExercisesTable })));
const SearchBar = lazy(() => import('../../components/Input').then(module => ({ default: module.SearchBar })));
const PrimaryLink = lazy(() => import('../../components/Anchor').then(module => ({ default: module.PrimaryLink })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const CollectionPageHeader = lazy(() => import('../../components/Header').then(module => ({ default: module.CollectionPageHeader })));

export default function Exercises() {
    /** Categories Context */
    const { refresh: refreshCategories } = useContext(CategoriesContext);
    /** Exercises Context */
    const { exercises, fetchExercises, deleteExercises } = useContext(ExercisesContext);
    /** Settings Context */
    const { openModal } = useContext(SettingsContext);
    /** Language */
    const { pages: { Exercises: texts }} = useLanguage();
    /** Searchbar input controller */
    const [search, setSearch] = useState('');
    /** Exercises to see in the table */
    const [filteredExercises, setFilteredExercises] = useState([]);
    /** Selected exercises (to delete) */
    const [selectedExercises, setSelectedExercises] = useState([]);
    /** Hide the screen until the initial fetching is over */
    const [hide, setHide] = useState(true);

    // componentDidMount. Fetch categories into application
    useEffect(() => {
        const fetch = async () => {
            if (exercises === null) {
                await fetchExercises();
            }

            setHide(false);
        }

        fetch();
    }, []);

    // componentDidUpdate. Update filtered exercises when exercises change.
    useEffect(() => {
        const exs = exercises || [];
        setFilteredExercises(applyFilters(exs));
    }, [exercises, search]);

    // Return the filtered exercises based on the value of the filters (only search this time)
    const applyFilters = exercises => {
        let exs = clone(exercises);

        if (search !== '') {
            exs = exs.filter(ex => {
                const { name, description, category_name } = ex;
                const values = Object.values({ name, description, category_name });
                return values.some(value => (value && deleteAccents(value.toString().toLowerCase()).includes(deleteAccents(search.toLowerCase()))));
            });
        }

        return exs;
    }

    /**
     * 'Click' event handler for delete button.
     * Asks confirmation, then delete the selected exercises.
     */
    const onDeleteClick = e => {
        if (selectedExercises.length === 0) {
            openModal({
                title: texts.txt11,
                content: [texts.txt12]
            });
        } else {
            openModal({
                title: texts.txt11,
                content: [texts.txt13],
                onAccept: () => {
                    deleteExercises({ exercises: selectedExercises })
                        .then(deleted => {
                            if (deleted) {
                                setSelectedExercises([]);
                                refreshCategories();
                            }
                        });
                },
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Change' event handler when an exercise is marked/unmarked. 
     * Update the selected exercises.
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

    // Hide the section
    if (hide) {
        return '';
    }

    return (
        <Suspense>
            <StyledExercises>
                <CollectionPageHeader 
                    title={texts.txt8}
                    body={texts.txt9}
                    footer={texts.txt10}
                    lightIMG={LightIMG}
                    darkIMG={DarkIMG}
                    reverse
                />

                <h1 className="title">{texts.txt2}</h1>

                {exercises && exercises.length > 0 && (
                    <SearchBar 
                        placeholder={texts.txt3}
                        value={search} 
                        onChange={e => setSearch(e.target.value)} 
                        onClear={() => setSearch('')} 
                    />
                )}

                <div className="buttons">
                    <PrimaryLink to="/exercises/add">{texts.txt1}</PrimaryLink>
                    <DangerButton onClick={onDeleteClick} disabled={selectedExercises.length === 0}>{texts.txt7}</DangerButton>
                </div>

                {exercises && exercises.length > 0 && (
                    <div className="table">
                        <ExercisesTable exercises={filteredExercises} selectionMode={true} onSelectedChange={onSelectedChange} withCategories={true} />
                    </div>
                )}

                {exercises && exercises.length > 0 && filteredExercises.length === 0 && (
                    <StyledNotFoundExercises>{texts.txt4(search)}</StyledNotFoundExercises>
                )}

                {exercises && exercises.length === 0 && (
                    <StyledNotFoundExercises>
                        <span>{texts.txt5}</span>
                        <span>{texts.txt6}</span>
                    </StyledNotFoundExercises>
                )}
            </StyledExercises>
        </Suspense>
    );
}
