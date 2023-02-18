import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { SettingsContext } from './SettingsContext';
import { FetchingContext } from './FetchContext';
import useLanguage from '../hooks/useLanguage';
import { getPromise } from '../utils';

const CategoriesContext = React.createContext([{}, () => {}]);

function CategoriesProvider({ children }) {
    /** Settings */
    const { setLoading, toastConfig } = useContext(SettingsContext);
    /** Requests */
    const { request } = useContext(FetchingContext);
    /** Categories loaded in the application */
    const [categories, setCategoriesState] = useState(null);
    /** Category loaded in the application */
    const [category, setCategoryState] = useState(null);
    /** Language */
    const { contexts: { Categories: texts }} = useLanguage();

    /**
     * Consult the categories available to the user and set them in the application, if they were not.
     * Returns a copy of the categories loaded in the application.
     */
    async function fetchCategories({ loading: haveLoading = true, toast: haveToast = true } = {}) {
        const data = await request('GET', '/api/categories', { haveLoading, failToast: haveToast ? '' : null })
            .then(data => {
                setCategoriesState(data);
                return data;
            })
            .catch(error => {
                console.error(error);
                setCategoriesState([]);
                return [];
            });

        return data;
    }

    /**
     * Returns a category based on the id passed by parameter, or null if it is not among the categories available to the user.
     * If force to true is specified, make the call regardless of the value.
     */
    async function fetchCategory({ id, force = false, loading: haveLoading = true, toast: haveToast = true } = {}) {
        if (force === true || category === null || (category !== null && category.id !== id)) {
            const data = await request('GET', `/api/categories/${id}`, { haveLoading, failToast: haveToast ? '' : null })
                .then(data => {
                    const { category } = data;
                    setCategoryState(category);
                    return category;
                })
                .catch(error => {
                    console.error(error);
                    setCategoryState(null);
                    return null;
                });

            return data;
        }

        return category;
    }

    /**
     * Insert a collection of categories. 
     * Returns the recently inserted data.
     */
    async function insertCategories({ categories, loading: haveLoading = true, toast: haveToast = true, refresh: shouldRefresh = true } = {}) {
        const successMessage = texts.txt1;
        const errorMessage = texts.txt2;
        
        if (haveLoading) setLoading(true);
        const data = await request('POST', '/api/categories', { 
                body: categories, 
                haveLoading: false, 
                successToast: haveToast ? successMessage : null, 
                failToast: haveToast ? errorMessage : null 
            })
            .then(data => data)
            .catch(error => {
                console.error(error);
                return null;
            });

        if (data && shouldRefresh) await refresh();
        if (haveLoading) setLoading(false);

        return data;
    }

    /**
     * Edit a category. If edited successfully, it asks for the category again.
     * Returns true or false indicating whether the edit was successful.
     */
    async function updateCategory({ category, loading: haveLoading = true, toast: haveToast = true, refresh: shouldRefresh = true } = {}) {
        const successMessage = texts.txt3;
        const errorMessage = texts.txt4;
        const showErrorToast = () => toast.error(errorMessage, toastConfig());

        // Check category
        if (typeof category.id !== 'number') {
            console.error('Bad Category.');
            if (haveToast) showErrorToast();
            return false;
        }   

        if (haveLoading) setLoading(true);

        const editted = await request('PUT', `/api/categories/${category.id}`, { 
            body: category, 
            haveLoading: false, 
            successToast: haveToast ? successMessage : null, 
            failToast: haveToast ? errorMessage : null 
        })
            .then(data => true)
            .catch(error => {
                console.error(error);
                return false;
            });

        if (editted && shouldRefresh) await refresh();
        if (haveLoading) setLoading(false);

        return editted;
    }

    /**
     * Delete a category. If it is removed successfully, it asks for the categories again.
     * Returns true or false indicating whether the deletion was successful.
     */
    async function deleteCategory({ id, loading: haveLoading = true, toast: haveToast = true, refresh: shouldRefresh = true } = {}) {
        const successMessage = texts.txt5;
        const errorMessage = texts.txt6;
        const showErrorToast = () => toast.error(errorMessage, toastConfig());

        // Check category id
        if (typeof id !== 'number') {
            console.error('Bad Category Id.');
            if (haveToast) showErrorToast();
            return false;
        } 

        if (haveLoading) setLoading(true);

        const deleted = await request('DELETE', `/api/categories/${id}`, { 
            haveLoading: false, 
            successToast: haveToast ? successMessage : null, 
            failToast: haveToast ? errorMessage : null 
        })
            .then(data => true)
            .catch(error => false);

        if (deleted && shouldRefresh) await refresh();
        if (haveLoading) setLoading(false);
        
        return deleted;
    }

    /**
     * Delete a group of categories. If it is removed successfully, it asks for the categories again.
     * Returns true or false indicating whether the deletion was successful.
     */
    async function deleteCategories({ categories, loading: haveLoading = true, toast: haveToast = true, refresh: shouldRefresh = true } = {}) {
        const successMessage = texts.txt7;
        const errorMessage = texts.txt8;
        const showErrorToast = () => toast.error(errorMessage, toastConfig());

        // Check category id
        if (categories.some(id => typeof id !== 'number')) {
            console.error('Bad Categories Ids.');
            if (haveToast) showErrorToast();
            return false;
        } 

        if (haveLoading) setLoading(true);

        const deleted = await request('DELETE', `/api/categories`, { 
            body: { categories },
            haveLoading: false, 
            successToast: haveToast ? successMessage : null, 
            failToast: haveToast ? errorMessage : null 
        })
            .then(data => true)
            .catch(error => false);

        if (deleted && shouldRefresh) await refresh();
        if (haveLoading) setLoading(false);
        
        return deleted;
    }

    /**
     * Refresh the data loaded in the context
     */
    async function refresh() {
        let promises = [];

        if (categories !== null) {
            const [categoriesProm, categoriesResolve, categoriesReject] = getPromise();
            promises.push(categoriesProm);

            fetchCategories({ loading: false, toast: false })
                .then(cats => categoriesResolve())
                .catch(cats => categoriesReject());
        }

        if (category !== null) {
            const [categoryProm, categoryResolve, categoryReject] = getPromise();
            promises.push(categoryProm);

            fetchCategory({ loading: false, toast: false, force: true, id: category.id })
                .then(cat => categoryResolve())
                .catch(cat => categoryReject());
        }

        await Promise.all(promises).then(values => {
            console.dir(values);
        });
    }

    const value = {
        categories, category, 
        fetchCategories, fetchCategory, 
        insertCategories, updateCategory, 
        deleteCategory, deleteCategories,
        refresh,
    };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

export { CategoriesContext, CategoriesProvider };
