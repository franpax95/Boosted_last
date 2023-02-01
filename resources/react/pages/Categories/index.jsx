import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { StyledCategories, StyledNotFoundCategories } from './style';
import { clone, deleteAccents, deleteArrayElement } from '../../utils';
import useLanguage from '../../hooks/useLanguage';
import DarkIMG from '../../../images/athlete1-transparencies.png';
import LightIMG from '../../../images/athlete2-transparencies.png';

const CategoriesTable = lazy(() => import('../../components/Table').then(module => ({ default: module.CategoriesTable })));
const SearchBar = lazy(() => import('../../components/Input').then(module => ({ default: module.SearchBar })));
const PrimaryLink = lazy(() => import('../../components/Anchor').then(module => ({ default: module.PrimaryLink })));
const DangerButton = lazy(() => import('../../components/Button').then(module => ({ default: module.DangerButton })));
const GradientBackground = lazy(() => import('../../components/Background').then(module => ({ default: module.GradientBackground })));
const ImageBackground = lazy(() => import('../../components/Background').then(module => ({ default: module.ImageBackground })));

export default function Categories() {
    /** Categories Context */
    const { categories, fetchCategories } = useContext(CategoriesContext);
    /** Settings Context */
    const { openModal, closeModal } = useContext(SettingsContext);
    /** Valor del campo búsqueda sobre el que filtrar categorías */
    const [search, setSearch] = useState('');
    /** Categorías a mostrar, después de ser aplicados los filtros */
    const [filteredCategories, setFilteredCategories] = useState([]);
    /** Categorías seleccionadas */
    const [selectedCategories, setSelectedCategories] = useState([]);
    /** Oculta la pantalla. Útil sobretodo para esperar al fetch inicial. */
    const [hide, setHide] = useState(true);
    /** Language */
    const { pages: { Categories: texts }} = useLanguage();

    // componentDidMount. Trae las categorías al componente.
    useEffect(() => {
        const fetch = async () => {
            if (categories === null) {
                await fetchCategories();
            }

            setHide(false);
        }
        
        fetch();
    }, []);

    // componentDidUpdate. Actualiza las categorías mostradas si cambian las categories.
    useEffect(() => {
        const cats = categories ? clone(categories) : [];
        setFilteredCategories(applyFilters(cats));
    }, [categories, search]);

    // Devuelve las categorías pasadas por parámetro que cumplan con los filtros de la aplicación.
    const applyFilters = cats => {
        let cs = clone(cats);

        if (search !== '') {
            cs = cs.filter(c => deleteAccents(c.name.toLowerCase()).includes(deleteAccents(search.toLowerCase())));
        }

        return cs;
    }

    // Elimina las categorías seleccionadas
    const onDelete = e => {
        if (selectedCategories.length === 0) {
            openModal({
                title: 'Atención',
                content: ['No has seleccionado ninguna categoría'],
                onAccept: () => closeModal()
            });
        } else {
            openModal({
                title: 'Atención',
                content: ['Función no implementada todavía...'],
                onAccept: () => closeModal()
            });
        }
    }

    // Actualiza las categorías seleccionadas
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

    // Oculta la pantalla principal
    if (hide) {
        return '';
    }

    return (
        <Suspense>
            <StyledCategories>
                <header>
                    <GradientBackground
                        className="bg1"
                        dark="linear-gradient(60deg, #2C394B 0%, #082032 100%)"
                        light="linear-gradient(to top, #F9F6F7 0%, #F0F0F0 100%)"
                    />

                    <div className="info">
                        <h1 className="info-title">{texts.txt8}</h1>

                        <p className="info-body">{texts.txt9}</p>

                        <p className="info-footer">{texts.txt10}</p>
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
                    <DangerButton onClick={onDelete} disabled={selectedCategories.length === 0}>{texts.txt7}</DangerButton>
                </div>

                {categories && categories.length > 0 && (
                    <CategoriesTable categories={filteredCategories} selectionMode={true} onSelectedChange={onSelectedChange} />
                )}

                {categories && categories.length > 0 && filteredCategories.length === 0 && (
                    <StyledNotFoundCategories>{texts.txt4(search)}</StyledNotFoundCategories>
                )}

                {categories && categories.length === 0 && (
                    <StyledNotFoundCategories>
                        <span>{texts.txt5}</span>
                        <span>{texts.txt6}</span>
                    </StyledNotFoundCategories>
                )}
            </StyledCategories>
        </Suspense>
    );
}
