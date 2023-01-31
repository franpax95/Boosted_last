import React, { useContext, useState, Suspense, lazy } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AiOutlineClose } from 'react-icons/ai';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import { StyledCategoriesAdd } from './style';
import { THEME } from '../../states/theming';
import { clone, deleteArrayElement, getPromise } from '../../utils';
import { ScreenSpinner } from '../../components/Spinner';

const PrimaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.PrimaryButton })));
const SecondaryButton = lazy(() => import('../../components/Button').then(module => ({ default: module.SecondaryButton })));
const PrimaryInput = lazy(() => import('../../components/Input').then(module => ({ default: module.PrimaryInput })));

export default function CategoriesAdd() {
    /** Navigate effect */
    const navigate = useNavigate();
    /** Settings Context */
    const { theme, openModal, closeModal, setLoading } = useContext(SettingsContext);
    /** Categories Context */
    const { insertCategory } = useContext(CategoriesContext);
    /** Form values */
    const [nameController, setNameController] = useState(['']);

    /**
     * Manejador de eventos para añadir un input
     */
    const onAddClick = event => {
        setNameController(prev => {
            let names = clone(prev);
            names.push('');
            return names;
        });
    }

    /**
     * Manejador de eventos para quitar un input concreto
     */
    const onQuitClick = (event, index) => {
        if(nameController[index] === '') {
            setNameController(prev => deleteArrayElement(prev, index));
        } else {
            openModal({
                title: 'Atención',
                content: ['Has rellenado este campo. ¿Estás seguro de que quieres quitarlo?'],
                onAccept: () => {
                    setNameController(prev => deleteArrayElement(prev, index));
                    closeModal();
                },
                onCancel: () => closeModal()
            });
        }
    }

    /**
     * Manejador de eventos de los inputs 'name'
     */
    const onInputChange = (event, index) => {
        const { value } = event.target;
        setNameController(prev => {
            let names = clone(prev);
            names[index] = value;
            return names;
        });
    }

    /**
     * Sube las categorías
     */
    const onSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);

        let promisesDefinitions = nameController.map(name => getPromise());
        let promises = promisesDefinitions.map(p => p[0]);
        let resolves = promisesDefinitions.map(p => p[1]);

        nameController.forEach((name, index) => {
            const category = { name };
            insertCategory({ category, loading: false, toast: false }).then(inserted => resolves[index](inserted));
        });

        const values = await Promise.all(promises);

        // Si alguna categoría tiene fallo...
        if(values.some(value => value === null)) {
            // Filtramos las categorías que no han podido insertarse
            let controller = nameController.filter((name, index) => (values[index] === false));
            setNameController(controller);

            const message = values.length === 1 
                ? 'No se ha podido insertar la categoría'
                : 'No se han podido insertar algunas categorías';

            toast.error(message, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: theme === THEME.DARK ? 'dark' : 'light'
            });
        }

        // Si se han insertado bien todas las categorías, se lanza toast y se navega hacia /categories
        else {
            const message = values.length === 1 
                ? 'Se ha insertado la categoría con éxito'
                : 'Se han insertado todas las categorías con éxito';

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

            navigate("/categories");
        }

        setLoading(false);
    }

    return (
        <Suspense fallback={<ScreenSpinner />}>
            <StyledCategoriesAdd>
                <form onSubmit={onSubmit}>
                    <PrimaryButton className="add-category-link">Pulsa aquí para insertar la{nameController.length > 1 ? 's' : ''} categoría{nameController.length > 1 ? 's' : ''}</PrimaryButton>

                    <h1 className="title">Añadir categoría</h1>

                    {nameController.map((name, index) => (
                        <div className="row" key={index}>
                            <PrimaryInput
                                name="name" 
                                value={name} 
                                onChange={event => onInputChange(event, index)} 
                                placeholder="Nombre de la categoría" 
                                label={`Categoría ${nameController.length > 1 ? (index + 1) : ''}`}
                                autoComplete="off"
                            />

                            {nameController.length > 1 && <button className="quit" onClick={event => onQuitClick(event, index)}>
                                <AiOutlineClose />
                            </button>}
                        </div>
                    ))}

                    <SecondaryButton type="button" onClick={onAddClick}>¡Quiero añadir más categorías!</SecondaryButton>
                </form>
            </StyledCategoriesAdd>
        </Suspense>
    );
}
