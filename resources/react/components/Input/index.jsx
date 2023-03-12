import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyledCategoryToggle, StyledInput, StyledPrimaryCheckbox, StyledPrimaryFileInput, StyledPrimaryFileInputPreview, StyledPrimaryInput, StyledSearchBar } from './style';
import { AiOutlineSearch, AiOutlineClose, AiFillFileImage } from 'react-icons/ai';
import { fileToBase64, getBase64ContentType } from '../../utils/files';
import { MdAdsClick } from 'react-icons/md';
import { config, useTransition } from 'react-spring';
import { PrimaryButton } from '../Button';
import { SettingsContext } from '../../contexts/SettingsContext';
import { THEME } from '../../states/theming';

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

export const PrimaryInput = (({ id = '', className = '', type = 'text', name = '', value, onChange, placeholder = '', autoComplete = 'on', label = '', labelSize }) => {
    // label size
    const [size, set] = useState(labelSize || 0);
    // label ref
    const ref = useRef();

    // componentDidUpdate: label. Obtenemos el tamaño del label para saber cuánto 'text-indent' dejar en el input
    useEffect(() => {
        // Si hay label renderizada...
        if (labelSize) {
            set(labelSize);
        } else if (ref.current) {
            set(ref.current.clientWidth);
        }
    }, [label, labelSize]);

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
});

export const PrimarySelect = ({ id = '', className = '', name = '', options = [], value, onChange, placeholder = '', label = '', labelSize }) => {
    // label size
    const [size, set] = useState(labelSize || 0);
    // label ref
    const ref = useRef();

    // componentDidUpdate: label. Obtenemos el tamaño del label para saber cuánto 'text-indent' dejar en el input
    useEffect(() => {
        // Si hay label renderizada...
        if (labelSize) {
            set(labelSize);
        } else if (ref.current) {
            set(ref.current.clientWidth);
        }
    }, [label, labelSize]);

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

export const PrimaryTextarea = ({ id = '', className = '', name = '', value, onChange, placeholder = '', label = '', maxLength, labelSize }) => {
    // label size
    const [size, setSize] = useState(labelSize || 0);
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
            if (hiddenRef.current) {
                setHeight(hiddenRef.current.scrollHeight);
            }
        }, { box: 'border-box' });

        if (hiddenRef.current) {
            observer.observe(hiddenRef.current);
        }
    }, []);

    // componentDidUpdate: label. Obtenemos el tamaño del label para saber cuánto 'text-indent' dejar en el input
    useEffect(() => {
        // Si hay label renderizada...
        if (labelSize) {
            setSize(labelSize);
        } else if (labelRef.current) {
            setSize(labelRef.current.clientWidth);
        }
    }, [label, labelSize]);

    // componentDidUpdate: value. Obtenemos la altura del contenido del formulario y la actualizamos
    useEffect(() => {
        if (hiddenRef.current) {
            setHeight(hiddenRef.current.scrollHeight);
        }
    }, [value]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = 0;
        }
    }, [value, height, textareaRef]);

    const onTextareaChange = event => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = 0;
        }

        if(onChange) {
            onChange(event);
        }
    }

    const onTextareaFocusBlur = event => {
        if (hiddenRef.current) {
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

/**
 * Component to handle images. 
 * Receives and emit a Document object ({ name, base64 }).
 */
export const PrimaryImageInput = ({ id = '', className = '', name = '', value = null, onChange, accept = "image/*" }) => {
    // input file ref
    const fileRef = useRef(null);
    // State to show photo visor
    const [showVisor, setVisor] = useState(false);
    // Image prepared to display, with content type setted
    const [image, setImage] = useState('');

    // Animation to display photo visor
    const transitions = useTransition(showVisor, {
        from: { opacity: 0, top: '100%' },
        enter: { opacity: 1, top: '0%' },
        leave: { opacity: 0, top: '100%' },
        // reverse: showVisor,
        config: config.stiff,
        // onRest: () => setVisor(!showVisor)
    })
    
    // componentDidUpdate: value. If value passed, prepare the preview image with the content type.
    useEffect(() => {
        if (value !== null) {
            getBase64ContentType(value.base64).then(b64ContentType => setImage(`${b64ContentType}${value.base64}`));
        } else if (image !== '') { // value null and image not empty
            setImage('');
        }
    }, [value]);

    // useEffect(() => console.dir(image), [image])

    // 'Change' event handler for file input
    const onInputChange = async event => {
        if (event.target.files.length > 0) {
            let base64 = '';
            let [original] = event.target.files;
            base64 = await fileToBase64(original);
            const newImage = { name: original.name, base64: base64.split(',')[1] };

            if (onChange) {
                // console.dir(newImage);
                onChange(newImage);
            }

            event.target.value = '';
        }
    }

    // 'Click' event handle to delete the image loaded
    const onCancelClick = event => {
        event.preventDefault();
        event.stopPropagation();

        if (onChange) {
            onChange(null);
        }

        setVisor(false);
    }

    // 'Click' event handler for Open Preview Btn.
    const onPreviewClick = event => {
        event.preventDefault();
        event.stopPropagation();

        setVisor(true);
    }

    // 'Click' event handler for Reload Btn.
    const onReloadClick = event => {
        event.preventDefault();
        event.stopPropagation();

        if (fileRef.current) {
            fileRef.current.click();
        }
    }
    
    return (<>
        <StyledPrimaryFileInput htmlFor={id} className={className} ref={fileRef}>
            <div className={`screen no-image ${value === null ? 'active' : ''}`}>
                <div className="icon">
                    <AiFillFileImage />
                </div>

                <div className="text">
                    Pulsa aquí para subir una imagen
                </div>
            </div>

            <div className={`screen with-image ${value !== null ? 'active' : ''}`}>
                {/** Vista previa y nombre de la imagen */}
                <div className="image">
                    <button className="hover-screen" onClick={onPreviewClick}>
                        <span>Vista previa</span>
                        <MdAdsClick />
                    </button>

                    {value !== '' && <img src={image} alt={value && value.name ? value.name : ''} />}
                </div>

                <div className="text">
                    {value && value.name ? value.name : 'Imagen subida'}
                </div>
            </div>

            <input 
                id={id}
                type="file"
                accept={accept}
                name={name}
                onChange={onInputChange}
            />

            {value !== null && <button type="button" className="quit" onClick={onCancelClick}>
                <AiOutlineClose />
            </button>}
        </StyledPrimaryFileInput>

        {transitions((styles, item) => item && <StyledPrimaryFileInputPreview style={styles} onClick={() => setVisor(false)}>
            <div className="box" onClick={event => event.stopPropagation()}>
                <div className="image">
                    {value !== null && <img src={image} alt={value && value.name ? value.name : ''} />}
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

export const PrimaryCheckbox = ({ value, onChange }) => {
    /** Settings Context */
    const { theme } = useContext(SettingsContext);

    return (
        <StyledPrimaryCheckbox>
            <label className={`checkbox path ${theme === THEME.LIGHT ? '' : 'hide'}`}>
                <input type="checkbox" checked={value} onChange={onChange} onClick={e => e.stopPropagation()} />
                <svg viewBox="0 0 21 21">
                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                </svg>
            </label>

            <label className={`checkbox bounce ${theme === THEME.DARK ? '' : 'hide'}`}>
                <input type="checkbox" checked={value} onChange={onChange} onClick={e => e.stopPropagation()} />
                <svg viewBox="0 0 21 21">
                    <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
            </label>
        </StyledPrimaryCheckbox>
    );
}
