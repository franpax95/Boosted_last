
export const beautifyDate = str => {
    const date = new Date(str);

    const yyyy = date.getFullYear().toString().padStart(4, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");

    const hh = date.getHours().toString().padStart(2, "0");
    const mn = date.getMinutes().toString().padStart(2, "0");


    return `${dd}-${mm}-${yyyy} ${hh}:${mn}`;
}

/**
 * Crea una copia de un objeto
 * 
 * @param original   objeto a copiar
 * @returns          copia del objeto
 */
export const clone = original => {
    return JSON.parse(JSON.stringify(original));
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
 * Devuelve una promesa para transformar un File en un string base64
 * @param file 
 * @returns 
 */
export const fileToBase64 = file => (new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
        resolve(reader.result);
    }

    reader.onerror = function(error) {
        reject(error);
    }
}));

/**
 * Devuelve el formato del base64 pasado por parámetro
 */
export const getBase64Type = b64 => {
    const [firstPart] = b64.split(";");
    const [data, type] = firstPart.split(":");
    return type;
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
