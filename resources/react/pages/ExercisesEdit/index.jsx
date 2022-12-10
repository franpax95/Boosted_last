import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { CategoryToggle, PrimaryFileInput, PrimaryInput, PrimaryTextarea } from '../../components/Input';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import { clone, deleteArrayElement, getBase64Type, getPromise } from '../../utils';
import { StyledExercisesEdit } from './style';
import { FaClone } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { THEME } from '../../states/theming';
import { toast } from 'react-toastify';

export default function ExercisesEdit() {
    /** Url Params */
    const { id } = useParams();
    /** Navigate effect */
    const navigate = useNavigate();
    /** Settings Context */
    const { theme, setLoading, openModal, closeModal } = useContext(SettingsContext);
    /** Categories Context */
    const { categories, fetchCategories, insertCategory } = useContext(CategoriesContext);
    /** Categories Context */
    const { exercise, fetchExercise, updateExercise } = useContext(ExercisesContext);
    /** Form values: each element of the collection is considered as a group */
    const [formController, setFormController] = useState({
        name: '',
        description: '',
        image: '',
        isNewCategory: false, // False para usar una categoría ya existente, true para añadir una categoría junto con el ejercicio
        categoryId: Array.isArray(categories) && categories.length ? categories[0].id : 0, // En caso de usar una categoría ya existente
        categoryName: '' // En caso de añadir categoría
    });

    useEffect(() => console.dir((formController)), [formController]);

    /** componentDidMount. Pide las categorías, si no estuvieran ya cargadas en la aplicación */
    useEffect(() => {
        const fetch = async () => {
            if(categories === null) {
                fetchCategories();
            }

            // Cargamos el ejercicio
            await fetchExercise({ id });
        }

        fetch();
    }, []);

    /** componentDidUpdate: categories. Actualiza los valores del formulario de categoría si hay alguno no seteado. */
    useEffect(() => {
        if(Array.isArray(categories)) {
            setFormController(prev => ({
                name: prev.name,
                description: prev.description,
                image: prev.image,
                isNewCategory: prev.isNewCategory, // False para usar una categoría ya existente, true para añadir una categoría junto con el ejercicio
                categoryId: prev.categoryId === 0 && categories.length > 0 ? categories[0].id : prev.categoryId, // En caso de usar una categoría ya existente
                categoryName: prev.categoryName // En caso de añadir categoría
            }));
        }
    }, [categories]);

    // ComponentDidUpdate: exercise. Actualiza los valores del formulario si se actualiza el exercise.
    useEffect(() => {
        if(exercise !== null) {
            if(exercise.image !== '') {
                // Transformamos el b64 a File y actualizamos el estado
                const type = getBase64Type(exercise.image);
                fetch(exercise.image)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], exercise.name, { type });
                        file.base64 = exercise.image;

                        setFormController(prev =>  ({
                            name: exercise.name,
                            description: exercise.description,
                            image: file,
                            iNewCategory: prev.isNewCategory,
                            categoryId: exercise.category_id,
                            categoryName: exercise.categoryName
                        }));
                    });
            } else {
                setFormController(prev =>  ({
                    name: exercise.name,
                    description: exercise.description,
                    image: '',
                    iNewCategory: prev.isNewCategory,
                    categoryId: exercise.category_id,
                    categoryName: exercise.categoryName
                }));
            }
        }
    }, [exercise]);

    /**
     * Manejador de eventos 'change'
     */
    const onFormGroupChange = (attr, value) => {
        setFormController(prev => {
            // Creamos una copia del objeto controlador
            let controller = clone(prev);

            // Rescatamos la imagen del objeto anterior (el método clone se carga instancias de File o Date)
            if(prev.image !== '') {
                let image = new File([prev.image], prev.image.name, { type: prev.image.type });
                image.base64 = prev.image.base64;
                controller.image = image;
            }

            // Actualizamos el valor que se ha cambiado
            controller[attr] = value;

            return controller;
        });
    }

    /**
     * Manejador de eventos 'submit' del formulario
     */
    const onSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);

        const categoryInserted = formController.isNewCategory 
            ? await insertCategory({ category: { name: formController.categoryName }, loading: false, toast: false })
            : null;
        
        const editted = {
            id: exercise.id,
            name: formController.name,
            description: formController.description,
            image: formController.image !== '' ? formController.image.base64 : '',
            category_id: categoryInserted ? categoryInserted.id : formController.categoryId
        };

        const inserted = await updateExercise({ exercise: editted, loading: false, toast: false });
        if(inserted) {
            toast.success('Se ha editado el ejercicio con éxito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });

            navigate(`/exercises/${exercise.id}`);
        } else {
            toast.error('No se ha podido editar el ejercicio', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });
        }

        setLoading(false);
    }

    return (
        <StyledExercisesEdit>
            <form onSubmit={onSubmit}>
                <PrimaryButton className="add-exercise-link">Pulsa aquí para editar el ejercicio</PrimaryButton>

                <h1 className="title">Añadir ejercicio</h1>

                <div className="form-group">
                    <PrimaryInput
                        className="exercise-name"
                        name="name" 
                        value={formController.name} 
                        onChange={event => onFormGroupChange('name', event.target.value)} 
                        placeholder="Nombre del ejercicio" 
                        label='Ejercicio'
                        autoComplete="off"
                    />

                    <h3 className="category-title">Asegúrate de tener seleccionada la opción que quieres</h3>
                    <CategoryToggle
                        className="category-toggle"
                        isNewCategory={formController.isNewCategory}
                        setIsNewCategory={value => onFormGroupChange('isNewCategory', value)}
                        categories={categories || []}
                        categoryId={formController.categoryId}
                        setCategoryId={value => onFormGroupChange('categoryId', value)}
                        categoryName={formController.categoryName}
                        setCategoryName={value => onFormGroupChange('categoryName', value)}
                    />

                    <PrimaryTextarea
                        className="exercise-description"
                        name="description" 
                        value={formController.description} 
                        onChange={event => onFormGroupChange('description', event.target.value)} 
                        placeholder="Descripción del ejercicio" 
                        label="Descripción"
                    />

                    <PrimaryFileInput 
                        id={`image`}
                        value={formController.image}
                        onChange={value => onFormGroupChange('image', value)}
                    />
                </div>
            </form>
        </StyledExercisesEdit>
    );
}
