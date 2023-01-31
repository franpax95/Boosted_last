import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { StyledCategories, StyledNotFoundCategories } from './style';
import { clone, deleteAccents } from '../../utils';

const CategoriesTable = lazy(() => import('../../components/Table').then(module => ({ default: module.CategoriesTable })));
const SearchBar = lazy(() => import('../../components/Input').then(module => ({ default: module.SearchBar })));
const PrimaryLink = lazy(() => import('../../components/Anchor').then(module => ({ default: module.PrimaryLink })));

export default function Categories() {
    /** Categories Context */
    const { categories, fetchCategories } = useContext(CategoriesContext);

    /** Oculta la pantalla. Útil sobretodo para esperar al fetch inicial. */
    const [hide, setHide] = useState(true);
    /** Categorías a mostrar, después de ser aplicados los filtros */
    const [filteredCategories, setFilteredCategories] = useState([]);
    /** Valor del campo búsqueda sobre el que filtrar categorías */
    const [search, setSearch] = useState('');

    // componentDidMount. Trae las categorías al componente.
    useEffect(() => {
        const fetch = async () => {
            if(categories === null) {
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

        if(search !== '') {
            cs = cs.filter(c => {
                // const values = Object.values(c);
                // return values.some(value => (deleteAccents(value.toString().toLowerCase()).includes(deleteAccents(search.toLowerCase()))));
                return deleteAccents(c.name.toLowerCase()).includes(deleteAccents(search.toLowerCase()));
            });
        }

        return cs;
    }

    // Oculta la pantalla principal
    if(hide) {
        return '';
    }

    return (
        <Suspense>
            <StyledCategories>
                {/** Link a añadir categoría */}
                <PrimaryLink className="add-category-link" to="/categories/add">Añadir categoría</PrimaryLink>

                {/**  */}
                <h1 className="title">Categorías</h1>

                {/** Filtro de búsqueda */}
                {categories && categories.length > 0 && (
                    <SearchBar 
                        placeholder="Filtrar categorías..." 
                        value={search} 
                        onChange={e => setSearch(e.target.value)} 
                        onClear={() => setSearch('')} 
                    />
                )}

                {/** Tabla de categorías, en caso de que hubiera */}
                {categories && categories.length > 0 && (
                    <CategoriesTable categories={filteredCategories} />
                )}

                {/** Mensaje en caso de no haber resultados filtrados */}
                {categories && categories.length > 0 && filteredCategories.length === 0 && (
                    <StyledNotFoundCategories>No existen categorías coincidentes con '{search}'</StyledNotFoundCategories>
                )}

                {/** Si todavía no hay categorías asociadas al usuario... */}
                {categories && categories.length === 0 && (
                    <StyledNotFoundCategories>
                        <span>Todavía no has añadido ninguna categoría.</span>
                        <span>Puedes empezar pulsando el botón 'Añadir categoría'.</span>
                    </StyledNotFoundCategories>
                )}
            </StyledCategories>
        </Suspense>
    );
}
