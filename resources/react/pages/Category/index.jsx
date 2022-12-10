import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PrimaryButton, SuccessButton, DangerButton } from '../../components/Button';
import { RandomImageCard } from '../../components/Card';
import { PrimaryInput, SearchBar } from '../../components/Input';
import { ExercisesTable } from '../../components/Table';
import { SettingsContext } from '../../contexts/SettingsContext';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { beautifyDate, clone, deleteAccents } from '../../utils';
import { StyledCategory, StyledToggleCategoryForm } from './style';

export default function Category() {
    /** Url Params */
    const { id } = useParams();
    /** Navigation */
    const navigate = useNavigate();

    /** Settings Context */
    const { setLoading, openModal, closeModal, closeAllModal } = useContext(SettingsContext);
    /** Categories Context */
    const { category, fetchCategory, updateCategory, deleteCategory } = useContext(CategoriesContext);
    /** ExercisesContext */
    const { exercises, fetchExercises } = useContext(ExercisesContext);

    /** state to render Edit Form */
    const [showForm, setShowForm] = useState(false);
    /** state with a copy of the category to handle form fields */
    const [name, setName] = useState('');

    /** Oculta la pantalla. Útil sobretodo para esperar al fetch inicial. */
    const [hide, setHide] = useState(true);
    /** Ejercicios a mostrar, después de ser aplicados los filtros */
    const [filteredExercises, setFilteredExercises] = useState([]);
    /** Valor del campo búsqueda sobre el que filtrar ejercicios */
    const [search, setSearch] = useState('');

    // ComponentDidMount para pedir categoría
    useEffect(() => {
        const fetch = async () => {
            if(category === null || category.id !== Number(id)) {
                await fetchCategory({ id });
            }
            setHide(false);
        }

        fetch();
    }, []);

    // ComponentDidUpdate: category. Actualiza los valores del formulario si se actualiza la categoría.
    useEffect(() => {
        if(category !== null) {
            setName(category.name);
        }
    }, [category]);

    // componentDidUpdate. Actualiza las categorías mostradas si cambian las categories.
    useEffect(() => {
        if(category !== null) {
            setFilteredExercises(applyFilters(category.exercises));
        }
    }, [category, search]);

    // Devuelve los ejercicios pasadas por parámetro que cumplan con los filtros de la aplicación.
    const applyFilters = exercises => {
        let exs = clone(exercises);

        if(search !== '') {
            exs = exs.filter(ex => {
                // const values = Object.values(c);
                // return values.some(value => (deleteAccents(value.toString().toLowerCase()).includes(deleteAccents(search.toLowerCase()))));
                return deleteAccents(ex.name.toLowerCase()).includes(deleteAccents(search.toLowerCase()));
            });
        }

        return exs;
    }

    /**
     * Muestra el formulario de edición
     */
    const onEditClick = event => {
        // event.preventDefault();
        // event.stopPropagation();

        // Si hay categoría seteada...
        if(category !== null) {
            setShowForm(true);
        }
    }

    /**
     * Guarda los cambios en el formulario de edición
     */
    const onSaveClick = async event => {
        // event.preventDefault();
        // event.stopPropagation();

        // Actualiza la categoría
        const cat = { id: category.id, name };
        const ok = await updateCategory({ category: cat });
        if(ok) {
            setShowForm(false);
        }
    }

    const onCancelClick = event => {
        // event.preventDefault();
        // event.stopPropagation();

        // Resetea el formulario con los valores de la categoría
        setName(category.name);
        setShowForm(false);
    }

    /**
     * Muestra dos modales de confirmación antes de borrar la categoría
     */
    const onDeleteClick = async event => {
        event.preventDefault();
        event.stopPropagation();

        // Si hay categoría seteada...
        if(category !== null) {
            openModal({
                title: 'Aviso',
                content: ["Va a proceder a borrar la categoría. ¿Está seguro de que desea continuar?"],
                onAccept: () => openModal({
                    title: 'Aviso',
                    content: ["Si continúas perderás los ejercicios asociados a esta categoría y no podrás recuperarlos. ¿Desea continuar aun así?"],
                    onAccept: () => {
                        const delCat = async () => {
                            setLoading(true);

                            const ok = await deleteCategory({ id: category.id, loading: false });
                            if(exercises) {
                                await fetchExercises({ loading: false, toast: false });
                            }

                            setLoading(false);

                            if(ok) {
                                navigate("/categories");
                            }

                            closeAllModal();
                        }

                        delCat();
                    },
                    onCancel: () => closeAllModal()
                }),
                onCancel: () => closeModal()
            });
        }
    }

    // Oculta la pantalla principal
    if(hide) {
        return '';
    }

    // Muestra mensaje en caso de no haber categoría cargada
    if(category === null) {
        return (
            <div>No se encuentra la categoría que buscas...</div>
        );
    }

    return (
        <StyledCategory>
            <RandomImageCard>
                <StyledToggleCategoryForm active={showForm}>
                    <div className="front">
                        <div className="header">
                            <PrimaryButton className="header-btn" onClick={onEditClick}>Editar categoría</PrimaryButton>
                            <PrimaryButton className="header-btn" onClick={onDeleteClick}>Eliminar categoría</PrimaryButton>
                        </div>

                        <div className="category">
                            <div className="group">
                                <label>Nombre</label>
                                <span>{category.name}</span>
                            </div>
                            <div className="group">
                                <label>Fecha de creación</label>
                                <span>{beautifyDate(category.created_at)}</span>
                            </div>
                            <div className="group">
                                <label>Última actualización</label>
                                <span>{beautifyDate(category.updated_at)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="back">
                        <h1>Editar categoría</h1>

                        <form className="category-form">
                            <PrimaryInput 
                                name="name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="Nombre de la categoría" 
                                label="Categoría"
                                autoComplete="off"
                            />
                        </form>

                        <div className="header">
                            <SuccessButton className="header-btn" onClick={onSaveClick}>Guardar cambios</SuccessButton>
                            <DangerButton className="header-btn" onClick={onCancelClick}>Cancelar cambios</DangerButton>
                        </div>
                    </div>
                </StyledToggleCategoryForm>
            </RandomImageCard>
            
            <h1 className="title">Ejercicios asociados a la categoría</h1>

            <SearchBar 
                placeholder="Filtrar ejercicios..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                onClear={() => setSearch('')} 
            />

            <ExercisesTable exercises={filteredExercises} withCategories={false} />

        </StyledCategory>
    );
}
