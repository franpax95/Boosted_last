import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PrimaryButton, SecondaryButton } from '../../components/Button';
import { CategoryToggle, PrimaryFileInput, PrimaryInput, PrimaryTextarea } from '../../components/Input';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import { clone, deleteArrayElement, getPromise } from '../../utils';
import { StyledExercisesAdd } from './style';
import { FaClone } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { THEME } from '../../states/theming';
import { toast } from 'react-toastify';

export default function ExercisesAdd() {
    /** Navigate effect */
    const navigate = useNavigate();
    /** Settings Context */
    const { theme, setLoading, openModal, closeModal } = useContext(SettingsContext);
    /** Categories Context */
    const { categories, fetchCategories, insertCategory } = useContext(CategoriesContext);
    /** Categories Context */
    const { insertExercise } = useContext(ExercisesContext);
    /** Form values: each element of the collection is considered as a group */
    const [formController, setFormController] = useState([]);

    useEffect(() => console.dir((formController)), [formController]);

    /** componentDidMount. Pide las categorías, si no estuvieran ya cargadas en la aplicación */
    useEffect(() => {
        if(categories === null) {
            fetchCategories();
        }

        setFormController([getEmptyFormGroup()]);
    }, []);

    /** componentDidUpdate: categories. Actualiza los valores del formulario de categoría si hay alguno no seteado. */
    useEffect(() => {
        if(Array.isArray(categories)) {
            // Actualizamos los valores de categoría no seteados
            setFormController(prev => prev.map(group => ({
                name: group.name,
                description: group.description,
                image: group.image,
                isNewCategory: group.isNewCategory, // False para usar una categoría ya existente, true para añadir una categoría junto con el ejercicio
                categoryId: group.categoryId === 0 && categories.length > 0 ? categories[0].id : group.categoryId, // En caso de usar una categoría ya existente
                categoryName: group.categoryName // En caso de añadir categoría
            })));
        }
    }, [categories]);

    /**
     * Devuelve un 'form group' por defecto
     */
    const getEmptyFormGroup = () => ({
        name: '',
        description: '',
        image: '',
        isNewCategory: false, // False para usar una categoría ya existente, true para añadir una categoría junto con el ejercicio
        categoryId: categories ? categories[0].id : 0, // En caso de usar una categoría ya existente
        categoryName: '' // En caso de añadir categoría
    });

    /**
     * Devuelve true si un 'form group' es diferente de un 'form group' por defecto
     */
    const checkFormGroupChanges = (group) => {
        const { name, description, image, categoryId, categoryName } = getEmptyFormGroup();
        return name !== group.name 
            || description !== group.description 
            || image !== group.image 
            || categoryId !== group.categoryId 
            || categoryName !== group.categoryName;
    }

    /**
     * Manejador de eventos para añadir un 'form group'
     */
    const onAddFormGroupClick = event => {
        setFormController(prev => {
            let controller = clone(prev)
                .map((group, i) => {
                    if(group.image === '') {
                        return group;
                    }

                    let image = new File([prev[i].image], prev[i].image.name, { type: prev[i].image.type });
                    image.base64 = prev[i].image.base64;
                    return ({ ...group, image });
                });

            controller.push(getEmptyFormGroup());
            return controller;
        });
    }

    /**
     * Manejador de eventos para clonar un 'form group' concreto
     */
    const onCloneClick = (event, index) => {
        setFormController(prev => {
            let controller = clone(prev)
                .map((group, i) => {
                    if(group.image === '') {
                        return group;
                    }

                    let image = new File([prev[i].image], prev[i].image.name, { type: prev[i].image.type });
                    image.base64 = prev[i].image.base64;
                    return ({ ...group, image });
                });

            let group = clone(prev[index]);
            if(group.image !== '') {
                let image = new File([prev[index].image], prev[index].image.name, { type: prev[index].image.type });
                console.dir(image);
                image.base64 = prev[index].image.base64;
                group.image = image;
            }

            controller.push(group);
            return controller;
        });
    }

    /**
     * Manejador de eventos para quitar un 'form group' concreto
     */
    const onQuitClick = (event, index) => {
        // Función de apoyo que actualiza el controller borrando el form group indicado
        const updateController = () => setFormController(prev => deleteArrayElement(prev, index));

        if(formController.length > 1) {
            // Form group a eliminar
            const group = formController[index];

            // Si el group a borrar ha sido modificado, se pregunta al usuario antes
            if(checkFormGroupChanges(group)) {
                openModal({
                    title: 'Atención',
                    content: ['Has rellenado este campo. ¿Estás seguro de que quieres quitarlo?'],
                    onAccept: () => {
                        updateController();
                        closeModal();
                    },
                    onCancel: () => closeModal()
                });
            } 
            
            // Si el group a borrar no ha sido modificado, simplemente se borra
            else {
                updateController();
            }
        }
    }

    /**
     * Manejador de eventos 'change'
     */
    const onFormGroupChange = (attr, value, index) => {
        setFormController(prev => {
            let controller = clone(prev)
                .map((group, index) => {
                    if(prev[index].image === '') {
                        return group;
                    }

                    let image = new File([prev[index].image], prev[index].image.name, { type: prev[index].image.type });
                    image.base64 = prev[index].image.base64;
                    return ({ ...group, image });
                });

            controller[index][attr] = value;
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

        const categoriesToInsert = [];
        for(let i = 0; i < formController.length; i++) {
            const { categoryName, isNewCategory } = formController[i];
            if(isNewCategory) {
                const index = categoriesToInsert.findIndex(cat => cat === categoryName);
                if(index === -1) {
                    categoriesToInsert.push(categoryName);
                }
            }
        }

        const { inserted: categoriesInserted, notInserted: categoriesNotInserted } = await insertCategories(categoriesToInsert);
        const mappedExercises = formController
            .map(group => {
                if(!group.isNewCategory) {
                    return group;
                }

                const index = categoriesInserted.findIndex(cat => cat.name === group.categoryName);
                return index !== -1 ? ({ ...group, categoryId: categoriesInserted[index].id }) : group;
            });
            
        const exercisesToInsert = mappedExercises.filter(group => !group.isNewCategory || categoriesInserted.some(cat => cat.name === group.categoryName));
        const { inserted: exercisesInserted, notInserted: exercisesNotInserted } = await insertExercises(exercisesToInsert);
        const exercisesWithCategoriesNotInserted = mappedExercises.filter(group => group.isNewCategory && categoriesNotInserted.some(cat => cat.name === group.categoryName));

        const notInserted = exercisesWithCategoriesNotInserted.concat(exercisesNotInserted);

        // Si ha habido ejercicios sin insertar...
        if(notInserted.length > 0) {
            const message = formController.length === 1 
                ? 'No se ha podido insertar el ejercicio'
                : 'No se han podido insertar algunos ejercicios';

            toast.error(message, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });

            setFormController(notInserted);
        } else {
            const message = formController.length === 1 
                ? 'Se ha insertado el ejercicio con éxito'
                : 'Se han insertado todos los ejercicios con éxito';

            toast.success(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });

            navigate("/exercises");
        }

        setLoading(false);
    }

    /**
     * A la hora de insertar ejercicios, inserta las categorías y devuelve las categorías un objeto con las categorías insertadas y las no insertadas
     */
    const insertCategories = async categoriesToInsert => {
        if(categoriesToInsert.length > 0) {
            let promisesDefinitions = categoriesToInsert.map(name => getPromise());
            let promises = promisesDefinitions.map(p => p[0]);
            let resolves = promisesDefinitions.map(p => p[1]);

            categoriesToInsert.forEach((name, index) => {
                const category = { name };
                insertCategory({ category, loading: false, toast: false }).then(inserted => resolves[index](inserted));
            });

            const values = await Promise.all(promises);
            const inserted = values.filter(cat => cat !== null);
            const notInserted = categoriesToInsert.filter((cat, index) => (values[index] === null)).map((name) => ({ name }));
            return ({ inserted, notInserted });
        }

        return ({ inserted: [], notInserted: [] });
    }

    /**
     * Inserta los ejercicios. Devuelve un objeto con los ejercicios insertados por un lado, y los ejercicios no insertados por otro
     */
    const insertExercises = async exercisesToInsert => {
        if(exercisesToInsert.length > 0) {
            let promisesDefinitions = formController.map(group => getPromise());
            let promises = promisesDefinitions.map(p => p[0]);
            let resolves = promisesDefinitions.map(p => p[1]);

            exercisesToInsert.forEach(async (group, index) => {
                const exercise = { 
                    name: group.name,
                    description: group.description,
                    image: group.image.base64,
                    category_id: group.categoryId,
                };

                let ok = await insertExercise({ exercise, loading: false, toast: false });

                resolves[index](ok);
            });

            const values = await Promise.all(promises);
            const inserted = values.filter(ex => ex !== null);
            const notInserted = exercisesToInsert.filter((ex, index) => (values[index] === null));
            return ({ inserted, notInserted });
        }

        return ({ inserted: [], notInserted: [] });
    }

    return (
        <StyledExercisesAdd>
            <form onSubmit={onSubmit}>
                <PrimaryButton className="add-exercise-link">Pulsa aquí para insertar {formController.length > 1 ? 'los' : 'el'} ejercicio{formController.length > 1 ? 's' : ''}</PrimaryButton>

                <h1 className="title">Añadir ejercicio</h1>

                {formController.map((formGroup, index) => (
                    <div className="form-group" key={index}>
                        <div className="row">
                            <PrimaryInput
                                className="exercise-name"
                                name="name" 
                                value={formGroup.name} 
                                onChange={event => onFormGroupChange('name', event.target.value, index)} 
                                placeholder="Nombre del ejercicio" 
                                label={`Ejercicio ${formController.length > 1 ? (index + 1) : ''}`}
                                autoComplete="off"
                            />

                            <button type="button" className="icon-btn clone" title="Clonar ejercicio" onClick={e => onCloneClick(e, index)}>
                                <FaClone />
                            </button>

                            <button type="button" className="icon-btn quit" title="Borrar ejercicio" onClick={e => onQuitClick(e, index)}>
                                <AiOutlineClose />
                            </button>
                        </div>

                        <h3 className="category-title">Asegúrate de tener seleccionada la opción que quieres</h3>
                        <CategoryToggle
                            className="category-toggle"
                            isNewCategory={formGroup.isNewCategory}
                            setIsNewCategory={value => onFormGroupChange('isNewCategory', value, index)}
                            categories={categories || []}
                            categoryId={formGroup.categoryId}
                            setCategoryId={value => onFormGroupChange('categoryId', value, index)}
                            categoryName={formGroup.categoryName}
                            setCategoryName={value => onFormGroupChange('categoryName', value, index)}
                        />

                        <PrimaryTextarea
                            className="exercise-description"
                            name="description" 
                            value={formGroup.description} 
                            onChange={event => onFormGroupChange('description', event.target.value, index)} 
                            placeholder="Descripción del ejercicio" 
                            label="Descripción"
                        />

                        <PrimaryFileInput 
                            id={`image-${index}`}
                            value={formGroup.image}
                            onChange={value => onFormGroupChange('image', value, index)}
                        />
                    </div>
                ))}

                <SecondaryButton type="button" onClick={onAddFormGroupClick}>¡Quiero añadir más ejercicios!</SecondaryButton>
            </form>
        </StyledExercisesAdd>
    );
}
