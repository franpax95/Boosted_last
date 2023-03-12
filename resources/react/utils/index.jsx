/**
 * Crea una copia de un objeto
 * 
 * @param original   objeto a copiar
 * @returns          copia del objeto
 */
export const clone = original => {
    // if (Array.isArray(original)) {
    //     return original.map(el => structuredClone(el));
    // } 
    
    // else if (typeof original === 'object') {
    //     let copy = {};

    //     for (let attr in original) {
    //         copy[attr] = structuredClone(original[attr]);
    //     }

    //     return copy;
    // }

    return structuredClone(original);
    return JSON.parse(JSON.stringify(original));
}

/**
 * Callback para comparar strings a la hora de ordenar arrays.
 * Elimina las tildes y las ñs a la hora de ordenar. 
 * Por defecto, devuelve la lista en orden descendente, a no ser que se especifique la variable 'asc' a true.
 */
export const compareStringArray = (a, b, asc) => {
    const valueA = deleteAccents(a.replace(/ñ/g, "nZ").replace(/Ñ/g, "NZ")).toLowerCase();
    const valueB = deleteAccents(b.replace(/ñ/g, "nZ").replace(/Ñ/g, "NZ")).toLowerCase();

    if (valueA > valueB) {
        return asc ? -1 : 1;
    }

    if (valueB > valueA) {
        return asc ? 1 : -1;
    }

    return 0;
}

/**
 * Elimina los acentos de un texto
 */
export const deleteAccents = text => text
    .slice()
    .normalize('NFD')
    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
    .normalize();

/**
 * Devuelve una copia de array sin el índice indicado
 */
export const deleteArrayElement = (arr, i) => {
    let array = arr.slice();
    array.splice(i, 1);
    return array;
}

/**
 * Devuelve una promesa. Usado para sincronizar timeouts de peticiones fake, entre otras cosas.
 */
export const getPromise = () => {
    let promiseResolve = () => {};
    let promiseReject = () => {};
    
    const prom = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
    });

    return [prom, promiseResolve, promiseReject];
}

// Retorna un número aleatorio entre min (incluido) y max (excluido)
export const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Devuelve true si existe un estado concreto en una definición de estado pasados por parámetros.
 */
export const validateState = (definition, state) => definition && state && Object.values(definition).includes(state);
