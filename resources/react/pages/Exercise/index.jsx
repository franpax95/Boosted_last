import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PrimaryLink } from '../../components/Anchor';
import { PrimaryButton } from '../../components/Button';
import { Input } from '../../components/Input';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ExercisesContext } from '../../contexts/ExercisesContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import { clone } from '../../utils';
import { StyledExercise } from './style';

export default function Exercise() {
    /** Url Params */
    const { id } = useParams();
    /** Navigation */
    const navigate = useNavigate();

    /** Categories Context */
    const { categories, fetchCategories } = useContext(CategoriesContext);
    /** Categories Context */
    const { exercise, fetchExercise, updateExercise, deleteExercise } = useContext(ExercisesContext);
    /** Settings Context */
    const { openModal, closeModal, closeAllModal } = useContext(SettingsContext);

    /** Oculta la pantalla. Útil sobretodo para esperar al fetch inicial. */
    const [hide, setHide] = useState(true);
    /** state to render Edit Form */
    const [showForm, setShowForm] = useState(false);
    /** state with a copy of the exercise to handle form fields */
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null);

    // ComponentDidMount para pedir categoría
    useEffect(() => {
        const fetch = async () => {
            // Cargamos las categorías si no lo estuvieran ya, de manera concurrente
            if(categories === null) {
                fetchCategories();
            }
    
            // Cargamos el ejercicio
            await fetchExercise({ id });

            // Una vez cargado el ejercicio, mostramos el contenido de la página
            setHide(false);
        }

        fetch();
    }, []);

    // ComponentDidUpdate: exercise. Actualiza los valores del formulario si se actualiza el exercise.
    useEffect(() => {
        if(exercise !== null) {
            setName(exercise.name);
            setDescription(exercise.description);
            setCategoryId(exercise.category_id);
        }
    }, [exercise]);

    
    const onEditClick = async event => {
        event.preventDefault();
        event.stopPropagation();

        // Si no se muestra formulario y hay categoría seteada, muestra el formulario
        if(!showForm && exercise !== null) {
            setShowForm(true);
        } 
        
        // Si no, si se está mostrando el formulario, hace la petición de editar el exercise y cierra el formulario si ha ido bien
        else if(showForm) {
            const ex = { id: exercise.id, name, description, category_id: categoryId };
            const ok = await updateExercise({ exercise: ex });

            if(ok) {
                setShowForm(false);
            }
        }
    }

    const onDeleteClick = async event => {
        event.preventDefault();
        event.stopPropagation();

        // Si se está mostrando el formulario, hace de botón de Cancelar formulario, es decir, lo oculta y resetea
        if(showForm) {
            setName(exercise.name);
            setShowForm(false);
        }

        // Si no se muestra el formulario, lanza modal para preguntar si debe eliminar el ejercicio
        else {
            openModal({
                title: 'Aviso',
                content: ["Va a proceder a borrar el ejercicio. ¿Está seguro de que desea continuar?"],
                onAccept: () => openModal({
                    title: 'Aviso',
                    content: ["Si continúas no podrás recuperar el ejercicio. ¿Desea continuar aun así?"],
                    onAccept: () => {
                        const delExe = async () => {
                            const ok = await deleteExercise({ id: exercise.id });
                            if(ok) {
                                navigate("/exercises");
                            }

                            closeAllModal();
                        }

                        delExe();
                    },
                    onCancel: () => closeAllModal()
                }),
                onCancel: () => closeModal()
            });
        }
    }


    if(hide) {
        return 'Cargando...';
    }

    // Muestra mensaje en caso de no haber ejercicio cargado
    if(exercise === null) {
        return (
            <div>No se encuentra el ejercicio que buscas...</div>
        );
    }

    return (
        <StyledExercise>
            {/* <PrimaryButton onClick={onEditClick}>Editar ejercicio</PrimaryButton> */}
            <PrimaryLink to={`/exercises/edit/${id}`}>Editar ejercicio</PrimaryLink>
            <PrimaryButton onClick={onDeleteClick}>Eliminar ejercicio</PrimaryButton>

            {showForm && <form>
                <Input 
                    name="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Nombre del ejercicio" 
                />

                <textarea
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descripción del ejercicio"
                ></textarea>

                <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                    {categories && categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </form>}

            {!showForm && <div className="exercise">
                {exercise.image && <div className="image">
                    <img src={exercise.image} alt={exercise.name} />
                </div>}

                <div className="name">
                    {exercise.name}
                </div>    

                {exercise.description && <div className="description">
                    {exercise.description}
                </div>}

                <div className="category">
                    <Link to={`/categories/${exercise.category_id}`}>{exercise.category_name}</Link>
                </div>
            </div>}
        </StyledExercise>
    );
}
