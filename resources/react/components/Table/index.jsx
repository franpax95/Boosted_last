import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clone, compareStringArray } from '../../utils';
import { beautifyDate } from '../../utils/dates';
import { PrimaryCheckbox } from '../Input';
import { StyledTable } from './style';
import { BsChevronDown } from 'react-icons/bs';
import useLanguage from '../../hooks/useLanguage';
import { Base64Image } from '../Image';

export const CategoriesTable = memo(({ categories = [], selectionMode = false, onSelectedChange }) => {
    /** Header values to set sort by */
    const HEADERS = { NAME: 'name', CREATED_AT: 'created_at', UPDATED_AT: 'updated_at' };
    /** Categories to show in the table */
    const [data, set] = useState([]);
    /** Attribute to sort by */
    const [sortBy, setSortBy] = useState('');
    /** Language */
    const { components: { Table: texts }} = useLanguage();

    // componentDidUpdate: sort the collection when it changes
    useEffect(() => set(sort(categories)), [categories]);

    // componentDidUpdate: sort the collection based on 'sortBy'
    useEffect(() => {
        if (data.length > 0) {
            set(sort(data));
        }
    }, [sortBy]);

    // Add 'selected' attr to the collection passed as argument.
    const parse = collection => {
        let data = clone(collection);
        return data.map(elem => ({ ...elem, selected: !!elem.selected }));
    }

    // Returns the collection passed as argument sorted based on the state.
    const sort = collection => {
        let data = clone(collection);

        if (sortBy !== '') {
            const asc = sortBy.charAt(0) === '-';
            const attr = asc ? sortBy.substring(1) : sortBy;
            data = data.sort((a, b) => compareStringArray(a[attr] || '', b[attr] || '', asc));
        } else {
            data = data.sort((a, b) => (b.id - a.id));
        }

        return parse(data);
    }

    // 'Change' event handler for select checkbox.
    const onCheckboxChange = (event, id) => {
        if (selectionMode) {
            if (onSelectedChange) {
                onSelectedChange(id);
            }

            set(prev => {
                let data = clone(prev);
                const index = data.findIndex(elem => elem.id === id);
                
                if (index !== -1) {
                    data[index].selected = !data[index].selected;
                }

                return data;
            });
        } else {
            event.preventDefault();
        }
    }

    // 'Click' event handler for header columns
    const onHeaderClick = (event, header) => {
        if (sortBy === header) {
            setSortBy(`-${header}`);
        } else if (sortBy === `-${header}`) {
            setSortBy('');
        } else {
            setSortBy(header);
        }
    }

    return (
        <StyledTable className={`categories ${selectionMode ? 'selection-mode' : ''}`}>
            <div className="row header category">
                {selectionMode ? <div className="check"></div> : ''}

                <div className="preview">
                    <span>{texts.txt4}</span>
                </div>

                <div className="name" onClick={e => onHeaderClick(e, HEADERS.NAME)}>
                    <span>{texts.txt1}</span>

                    <div className={`icon ${(sortBy === HEADERS.NAME || sortBy === `-${HEADERS.NAME}`) ? 'active' : ''} ${(sortBy === `-${HEADERS.NAME}`) ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>

                <div className="created_at" onClick={e => onHeaderClick(e, HEADERS.CREATED_AT)}>
                    <span>{texts.txt2}</span>

                    <div className={`icon ${sortBy === HEADERS.CREATED_AT || sortBy === `-${HEADERS.CREATED_AT}` ? 'active' : ''} ${sortBy === `-${HEADERS.CREATED_AT}` ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>

                <div className="updated_at" onClick={e => onHeaderClick(e, HEADERS.UPDATED_AT)}>
                    <span>{texts.txt3}</span>

                    <div className={`icon ${sortBy === HEADERS.UPDATED_AT || sortBy === `-${HEADERS.UPDATED_AT}` ? 'active' : ''} ${sortBy === `-${HEADERS.UPDATED_AT}` ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>
            </div>

            <div className="body">
                {data.map(category => (
                    <Link key={category.id} className="row category" to={`/categories/${category.id}`}>
                        {selectionMode ? <div className="check">
                            <PrimaryCheckbox value={category.selected} onChange={e => onCheckboxChange(e, category.id)} />
                        </div> : ''}

                        <div className="preview">
                            {category.image && <Base64Image src={category.image.base64} alt={category.image.name} />}
                        </div>

                        <div className="name">
                            <span>{category.name}</span>
                        </div>

                        <div className="created_at centered">
                            <span>{beautifyDate(category.created_at)}</span>
                        </div>

                        <div className="updated_at centered">
                            <span>{beautifyDate(category.updated_at)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </StyledTable>
    );
});

export const ExercisesTable = memo(({ exercises = [], withCategories = false, selectionMode = false, onSelectedChange }) => {
    /** Header values to set sort by */
    const HEADERS = { NAME: 'name', DESCRIPTION: 'description', CATEGORY: 'category_name', CREATED_AT: 'created_at', UPDATED_AT: 'updated_at' };
    /** Exercises to show in the table */
    const [data, set] = useState([]);
    /** Attribute to sort by */
    const [sortBy, setSortBy] = useState('');
    /** Language */
    const { components: { Table: texts }} = useLanguage();

    // componentDidUpdate: sort the collection when it changes
    useEffect(() => set(sort(exercises)), [exercises]);

    // componentDidUpdate: sort the collection based on 'sortBy'
    useEffect(() => {
        if (data.length > 0) {
            set(sort(data));
        }
    }, [sortBy]);

    // Add 'selected' attr to the collection passed as argument.
    const parse = collection => {
        let data = clone(collection);
        return data.map(elem => ({ ...elem, selected: !!elem.selected }));
    }

    // Returns the collection passed as argument sorted based on the state
    const sort = collection => {
        let data = clone(collection);

        if (sortBy !== '') {
            const asc = sortBy.charAt(0) === '-';
            const attr = asc ? sortBy.substring(1) : sortBy;
            data = data.sort((a, b) => compareStringArray(a[attr] || '', b[attr] || '', asc));
        } else {
            data = data.sort((a, b) => (b.id - a.id));
        }

        return parse(data);
    }

    // 'Change' event handler for select checkbox.
    const onCheckboxChange = (event, id) => {
        if (selectionMode) {
            if (onSelectedChange) {
                onSelectedChange(id);
            }

            set(prev => {
                let data = clone(prev);
                const index = data.findIndex(elem => elem.id === id);
                
                if (index !== -1) {
                    data[index].selected = !data[index].selected;
                }

                return data;
            });
        } else {
            event.preventDefault();
        }
    }

    // 'Click' event handler for header columns
    const onHeaderClick = (event, header) => {
        if (sortBy === header) {
            setSortBy(`-${header}`);
        } else if (sortBy === `-${header}`) {
            setSortBy('');
        } else {
            setSortBy(header);
        }
    }

    return (
        <StyledTable className={`exercises ${selectionMode ? 'selection-mode' : ''}`}>
            <div className={`row header exercise ${withCategories ? 'with-category' : ''}`}>
                {selectionMode ? <div className="check"></div> : ''}

                <div className="preview">
                    <span>{texts.txt4}</span>
                </div>

                <div className="name" onClick={e => onHeaderClick(e, HEADERS.NAME)}>
                    <span>{texts.txt1}</span>

                    <div className={`icon ${(sortBy === HEADERS.NAME || sortBy === `-${HEADERS.NAME}`) ? 'active' : ''} ${(sortBy === `-${HEADERS.NAME}`) ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>

                <div className="description" onClick={e => onHeaderClick(e, HEADERS.DESCRIPTION)}>
                    <span>{texts.txt5}</span>

                    <div className={`icon ${(sortBy === HEADERS.DESCRIPTION || sortBy === `-${HEADERS.DESCRIPTION}`) ? 'active' : ''} ${(sortBy === `-${HEADERS.DESCRIPTION}`) ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>

                {withCategories ? <div className="category_name" onClick={e => onHeaderClick(e, HEADERS.CATEGORY)}>
                    <span>{texts.txt6}</span>

                    <div className={`icon ${(sortBy === HEADERS.CATEGORY || sortBy === `-${HEADERS.CATEGORY}`) ? 'active' : ''} ${(sortBy === `-${HEADERS.CATEGORY}`) ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div> : ''}

                <div className="created_at" onClick={e => onHeaderClick(e, HEADERS.CREATED_AT)}>
                    <span>{texts.txt2}</span>

                    <div className={`icon ${sortBy === HEADERS.CREATED_AT || sortBy === `-${HEADERS.CREATED_AT}` ? 'active' : ''} ${sortBy === `-${HEADERS.CREATED_AT}` ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>

                <div className="updated_at" onClick={e => onHeaderClick(e, HEADERS.UPDATED_AT)}>
                    <span>{texts.txt3}</span>

                    <div className={`icon ${sortBy === HEADERS.UPDATED_AT || sortBy === `-${HEADERS.UPDATED_AT}` ? 'active' : ''} ${sortBy === `-${HEADERS.UPDATED_AT}` ? 'reverse' : ''}`}>
                        <BsChevronDown />
                    </div>
                </div>
            </div>

            <div className="body">
                {data.map(exercise => (
                    <Link key={exercise.id} className={`row exercise ${withCategories ? 'with-category' : ''}`} to={`/exercises/${exercise.id}`}>
                        {selectionMode ? <div className="check">
                            <PrimaryCheckbox value={exercise.selected} onChange={e => onCheckboxChange(e, exercise.id)} />
                        </div> : ''}

                        <div className="preview">
                            {exercise.image && <Base64Image src={exercise.image} alt={exercise.name} />}
                        </div>

                        <div className="name">
                            <span>{exercise.name}</span>
                        </div>

                        <div className="description">
                            <span>{exercise.description}</span>
                        </div>

                        {withCategories ? <div className="category_name">
                            <span>{exercise.category_name}</span>
                        </div> : ''}

                        <div className="created_at centered">
                            <span>{beautifyDate(exercise.created_at)}</span>
                        </div>

                        <div className="updated_at centered">
                            <span>{beautifyDate(exercise.updated_at)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </StyledTable>
    );
});
