import React, { useEffect, useRef, useState } from 'react';
import { StyledCategoryToggle, StyledInput, StyledPrimaryFileInput, StyledPrimaryFileInputPreview, StyledPrimaryInput, StyledSearchBar } from './style';
import { AiOutlineSearch, AiOutlineClose, AiFillFileImage } from 'react-icons/ai';
import { clone, fileToBase64 } from '../../utils';
import { MdAdsClick } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { config, useTransition } from 'react-spring';
import { PrimaryButton } from '../Button';


export const Input = ({ id, className = '', type = 'text', name, value, onChange, placeholder, autoComplete = 'on' }) => (
    <StyledInput 
        id={id}
        className={className}
        type={type}
        name={name}
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        autoComplete={autoComplete}
    />
);

export const PrimaryInput = ({ id = '', className = '', type = 'text', name = '', value, onChange, placeholder = '', autoComplete = 'on', label = '' }) => {
    // label size
    const [size, set] = useState(0);
    // label ref
    const ref = useRef();

    // componentDidUpdate: label. Obtenemos el tamaño del label para saber cuánto 'text-indent' dejar en el input
    useEffect(() => {
        // Si hay label renderizada...
        if(ref.current) {
            set(ref.current.clientWidth);
        }
    }, [label]);

    return (
        <StyledPrimaryInput labelSize={size} className={className}>
            <input 
                id={id}
                type={type}
                name={name}
                value={value} 
                onChange={onChange} 
                placeholder={placeholder} 
                autoComplete={autoComplete}
            />

            {label !== '' && <label htmlFor={id} ref={ref}>{label}</label>}
        </StyledPrimaryInput>
    );
}

export const PrimarySelect = ({ id = '', className = '', name = '', options = [], value, onChange, placeholder = '', label = '' }) => {
    // label size
    const [size, set] = useState(0);
    // label ref
    const ref = useRef();

    // componentDidUpdate: label. Obtenemos el tamaño del label para saber cuánto 'text-indent' dejar en el input
    useEffect(() => {
        // Si hay label renderizada...
        if(ref.current) {
            set(ref.current.clientWidth);
        }
    }, [label]);

    const onSelectChange = event => {
        if(onChange) {
            onChange(event);
        }

        event.target.blur();
    }

    return (
        <StyledPrimaryInput labelSize={size} className={className}>
            <select 
                id={id}
                name={name}
                value={value} 
                onChange={onSelectChange} 
                placeholder={placeholder} 
            >
                {options.map(option => <option key={option.value} value={option.value}>{option.desc}</option>)}
            </select>

            {label !== '' && <label htmlFor={id} ref={ref}>{label}</label>}
        </StyledPrimaryInput>
    );
}

export const PrimaryTextarea = ({ id = '', className = '', name = '', value, onChange, placeholder = '', label = '', maxLength }) => {
    // label size
    const [size, setSize] = useState(0);
    // textarea height
    const [height, setHeight] = useState(0);
    // label ref
    const labelRef = useRef();
    // textarea ref
    const textareaRef = useRef();
    // fake textarea ref
    const hiddenRef = useRef();

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            if(hiddenRef.current) {
                setHeight(hiddenRef.current.scrollHeight);
            }
        }, { box: 'border-box' });

        if(hiddenRef.current) {
            observer.observe(hiddenRef.current);
        }
    }, []);

    // componentDidUpdate: label. Obtenemos el tamaño del label para saber cuánto 'text-indent' dejar en el input
    useEffect(() => {
        // Si hay label renderizada...
        if(labelRef.current) {
            setSize(labelRef.current.clientWidth);
        }
    }, [label]);

    // componentDidUpdate: value. Obtenemos la altura del contenido del formulario y la actualizamos
    useEffect(() => {
        if(hiddenRef.current) {
            setHeight(hiddenRef.current.scrollHeight);
        }
    }, [value]);

    useEffect(() => {
        if(textareaRef.current) {
            textareaRef.current.scrollTop = 0;
        }
    }, [value, height, textareaRef]);

    const onTextareaChange = event => {
        if(textareaRef.current) {
            textareaRef.current.scrollTop = 0;
        }

        if(onChange) {
            onChange(event);
        }
    }

    const onTextareaFocusBlur = event => {
        if(hiddenRef.current) {
            setHeight(hiddenRef.current.scrollHeight);
        }
    }

    return (
        <StyledPrimaryInput labelSize={size} className={className} height={height}>
            <textarea
                ref={textareaRef}
                id={id}
                name={name}
                value={value} 
                onChange={onTextareaChange} 
                onFocus={onTextareaFocusBlur} 
                onBlur={onTextareaFocusBlur}
                placeholder={placeholder}
                maxLength={maxLength}
                onScroll={e => e.preventDefault()}
            ></textarea>

            {label !== '' && <label htmlFor={id} ref={labelRef}>{label}</label>}

            <div className="hidden-textarea" ref={hiddenRef}>{value}.</div>
        </StyledPrimaryInput>
    );
}

export const PrimaryFileInput = ({ id = '', className = '', name = '', value = '', onChange, accept = "image/*" }) => {
    // input file ref
    const fileRef = useRef(null);
    
    // State to show photo visor
    const [showVisor, setVisor] = useState(false);

    // Animation to display photo visor
    const transitions = useTransition(showVisor, {
        from: { opacity: 0, top: '100%' },
        enter: { opacity: 1, top: '0%' },
        leave: { opacity: 0, top: '100%' },
        // reverse: showVisor,
        config: config.stiff,
        // onRest: () => setVisor(!showVisor)
    })
    
    // useEffect(() => console.dir(value), [value]);

    // Manejador de eventos 'change' del input file
    const onInputChange = async event => {
        if(event.target.files.length > 0) {
            let base64 = '';
            let [original] = event.target.files;
            let file = new File([original], original.name, { type: original.type });

            base64 = await fileToBase64(original);
            file.base64 = base64;

            if(onChange) {
                onChange(file);
                event.target.value = '';
            }
        }
    }

    // Elimina la imagen cargada
    const onCancelClick = event => {
        event.preventDefault();
        event.stopPropagation();

        if(onChange) {
            onChange('');
        }

        setVisor(false);
    }

    // Abre el visor de fotos asociado al input
    const onPreviewClick = event => {
        event.preventDefault();
        event.stopPropagation();

        setVisor(true);
    }

    // Permite subir otra imagen desde el visor de fotos directamente
    const onReloadClick = event => {
        event.preventDefault();
        event.stopPropagation();

        if(fileRef.current) {
            fileRef.current.click();
        }
    }
    
    return (<>
        <StyledPrimaryFileInput htmlFor={id} className={className} ref={fileRef}>
            <div className={`screen no-image ${value === '' && 'active'}`}>
                <div className="icon">
                    <AiFillFileImage />
                </div>

                <div className="text">
                    Pulsa aquí para subir una imagen
                </div>
            </div>

            <div className={`screen with-image ${value !== '' && 'active'}`}>
                {/** Vista previa y nombre de la imagen */}
                <div className="image">
                    <button className="hover-screen" onClick={onPreviewClick}>
                        <span>Vista previa</span>
                        <MdAdsClick />
                    </button>

                    {value !== '' && <img src={value.base64} alt={value.name} />}
                </div>

                <div className="text">
                    {value !== '' ? value.name : 'Imagen subida'}
                </div>
            </div>

            <input 
                id={id}
                type="file"
                accept={accept}
                name={name}
                onChange={onInputChange}
            />

            {value !== '' && <button type="button" className="quit" onClick={onCancelClick}>
                <IoMdClose />
            </button>}
        </StyledPrimaryFileInput>

        {transitions((styles, item) => item && <StyledPrimaryFileInputPreview style={styles} onClick={() => setVisor(false)}>
            <div className="box" onClick={event => event.stopPropagation()}>
                <div className="image">
                    {value !== '' && <img src={value.base64} alt={value.name} />}
                </div>

                <div className="footer">
                    <PrimaryButton type="button" onClick={onReloadClick}>Subir otra imagen</PrimaryButton>
                    <PrimaryButton type="button" onClick={onCancelClick}>Eliminar imagen</PrimaryButton>
                </div>
            </div>
        </StyledPrimaryFileInputPreview>)}
    </>);
}

export const SearchBar = ({ className = '', value, onChange, onClear, placeholder }) => {
    /** Si el input está focuseado, añade la clase active al StyledSearchBar */
    const [active, set] = useState(false);

    const onFocus = event => {
        set(true);
    }

    const onBlur = event => {
        set(false);
    }

    return (
        <StyledSearchBar className={`${className} ${active ? 'active' : ''}`}>
            <input 
                type="text"
                value={value} 
                onChange={onChange} 
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder} 
                autoComplete="off"
            />
    
            <button className={`icon clear ${value === '' ? 'hidden' : ''}`} onClick={onClear}>
                <AiOutlineClose />
            </button>
    
            <div className="icon search">
                <AiOutlineSearch />
            </div>
        </StyledSearchBar>
    );
}

export const CategoryToggle = ({ className = '', isNewCategory, setIsNewCategory, categories = [], categoryId, setCategoryId, categoryName, setCategoryName }) => {

    /** Cambia 'isNewCategory' */
    const onSideClick = (event, value) => {
        if(isNewCategory !== value) {
            setIsNewCategory(value);
        }
    }

    /** Manejador de eventos change de 'categoryId' */
    const onCategoryIdChange = event => {
        const { value } = event.target;
        setCategoryId(value);
    }

    /** Manejador de eventos change de 'categoryName' */
    const onCategoryNameChange = event => {
        const { value } = event.target;
        setCategoryName(value);
    }

    return (
        <StyledCategoryToggle className={className}>
            {/** Eligiendo categoría existente... (categoryId) */}
            <div className={`side left ${!isNewCategory && 'active'}`} onClick={e => onSideClick(e, false)}>
                <h4>Elige entre una categoría ya existente...</h4>

                <PrimarySelect 
                    options={categories.map(({ id, name }) => ({ value: id, desc: name }))}
                    placeholder="Categoría"
                    label="Selecciona"
                    value={categoryId}
                    onChange={onCategoryIdChange}
                />
            </div>

            {/** Creación de una nueva categoría... (categoryName) */}
            <div className={`side right ${isNewCategory && 'active'}`} onClick={e => onSideClick(e, true)}>
                <h4>...o añade una categoría nueva.</h4>
                <PrimaryInput
                    name="category_name" 
                    value={categoryName} 
                    onChange={onCategoryNameChange} 
                    placeholder="Nombre de la nueva categoría" 
                    label="Escribe"
                    autoComplete="off"
                />
            </div>
        </StyledCategoryToggle>
    );
}