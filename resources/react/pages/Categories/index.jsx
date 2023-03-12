import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { StyledSection, StyledNotFoundCollection } from '../../styles';
import { SettingsContext } from '../../contexts/SettingsContext';
import { clone, deleteAccents, deleteArrayElement } from '../../utils';
import useLanguage from '../../hooks/useLanguage';
import DarkIMG from '../../../images/athlete1-transparencies.png';
import LightIMG from '../../../images/athlete2-transparencies.png';
import { ReducerContext } from '../../contexts/ReducerContext';

const CategoriesTable = lazy(() => import('../../components/Table').then(module => ({ default: module.CategoriesTable })));
const SearchBar = lazy(() => import('../../components/Input').then(module => ({ default: module.SearchBar })));
const PrimaryLink = lazy(() => import('../../components/Anchor').then(module => ({ default: module.PrimaryLink })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const CollectionPageHeader = lazy(() => import('../../components/Header').then(module => ({ default: module.CollectionPageHeader })));

export default function Categories() {
    /** Settings Context */
    const { openModal } = useContext(SettingsContext);
    /** Categories Context */
    const { categories, fetchCategories, deleteCategories } = useContext(ReducerContext);
    /** Language */
    const { pages: { Categories: texts }} = useLanguage();
    /** Searchbar input controller */
    const [search, setSearch] = useState('');
    /** Categories to see in the table */
    const [filteredCategories, setFilteredCategories] = useState([]);
    /** Selected categories (to delete) */
    const [selectedCategories, setSelectedCategories] = useState([]);
    /** Hide the screen until the initial fetching is over */
    const [hide, setHide] = useState(true);

    // componentDidMount. Fetch categories into application
    useEffect(() => {
        const fetch = async () => {
            if (categories === null) {
                await fetchCategories();
            }

            setHide(false);
        }

        fetch();
    }, []);

    // componentDidUpdate. Update filtered categories when categories change.
    useEffect(() => {
        const cats = categories || [];
        setFilteredCategories(applyFilters(cats));
    }, [categories, search]);

    // Return the filtered categories based on the value of the filters (only search this time)
    const applyFilters = cats => {
        let cs = clone(cats);

        if (search !== '') {
            cs = cs.filter(c => deleteAccents(c.name.toLowerCase()).includes(deleteAccents(search.toLowerCase())));
        }

        return cs;
    }

    /**
     * 'Click' event handler for delete button.
     * asks confirmation, then delete the selected categories.
     */
    const onDeleteClick = e => {
        if (selectedCategories.length === 0) {
            openModal({
                title: texts.txt11,
                content: [texts.txt12]
            });
        } else {
            openModal({
                title: texts.txt11,
                content: [texts.txt13],
                onAccept: () => {
                    deleteCategories({ categories: selectedCategories })
                        .then(deleted => {
                            if (deleted) {
                                setSelectedCategories([]);
                            }
                        });
                },
                onCancel: () => {}
            });
        }
    }

    /**
     * 'Change' event handler when a category is marked/unmarked. 
     * Update the selected categories.
     */
    const onSelectedChange = id => {
        setSelectedCategories(prev => {
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
            <StyledSection className="collection Categories">
                <CollectionPageHeader 
                    title={texts.txt8}
                    body={texts.txt9}
                    footer={texts.txt10}
                    lightIMG={LightIMG}
                    darkIMG={DarkIMG}
                />

                <h1 className="title">{texts.txt2}</h1>

                {categories && categories.length > 0 && (
                    <SearchBar 
                        placeholder={texts.txt3}
                        value={search} 
                        onChange={e => setSearch(e.target.value)} 
                        onClear={() => setSearch('')} 
                    />
                )}

                <div className="buttons">
                    <PrimaryLink to="/categories/add">{texts.txt1}</PrimaryLink>
                    <DangerButton onClick={onDeleteClick} disabled={selectedCategories.length === 0}>{texts.txt7}</DangerButton>
                </div>

                {categories && categories.length > 0 && (
                    <div className="table">
                        <CategoriesTable categories={filteredCategories} selectionMode={true} onSelectedChange={onSelectedChange} />
                    </div>
                )}

                {categories && categories.length > 0 && filteredCategories.length === 0 && (
                    <StyledNotFoundCollection>{texts.txt4(search)}</StyledNotFoundCollection>
                )}

                {categories && categories.length === 0 && (
                    <StyledNotFoundCollection>
                        <span>{texts.txt5}</span>
                        <span>{texts.txt6}</span>
                    </StyledNotFoundCollection>
                )}
            </StyledSection>
        </Suspense>
    );
}
