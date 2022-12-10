/**
 * Devuelve un color en hexadecimal con transparencia (formato: #XXXXXXXX)
 * 
 * @param {*} hex       Color en hexadecimal
 * @param {*} alpha     Nivel de opacidad [0 - 1]
 */
export const addOpacityToHex = (hex, alpha) => `${hex}${Math.floor(alpha * 255).toString(16).padStart(2, 0)}`;

/**
 * Convierte un color en rgb/rgba a hexadecimal
 * 
 * @param {*} rgba      String con la representación del color en rgb/rgba
 */
// export const rgba2hex = rgba => {
//     const rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
//     const alpha = (rgb && rgb[4] || "").trim();

//     const hex = rgb 
//         ? (rgb[1] | 1 << 8).toString(16).slice(1) + (rgb[2] | 1 << 8).toString(16).slice(1) + (rgb[3] | 1 << 8).toString(16).slice(1)
//         : rgba;
//     const a = (((alpha !== "" ? alpha : 01) * 255) | 1 << 8).toString(16).slice(1);

//     return `${hex}${a}`;
// }

/**
 * Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo
 * 
 * @param {*} color     String con el color RR, GG o BB
 * @param {*} amount    Porcentaje de aclarado
 * @returns 
 */
const addLight = (color, amount) => {
    let cc = parseInt(color, 16) + amount;
    let c = (cc > 255) ? 255 : (cc);
    c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
    return c;
}

/**
 * Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo
 * 
 * @param {*} color     String con el color RR, GG o BB
 * @param {*} amount    Porcentaje de oscurecimiento
 */
const substractLight = (color, amount) => {
    let cc = parseInt(color, 16) - amount;
    let c = (cc < 0) ? 0 : (cc);
    c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
    return c;
}

/**
 * Aclara un color hexadecimal de 6 caracteres #RRGGBB según el porcentaje indicado
 * 
 * @param {*} color     String con el color en formato hexadecimal
 * @param {*} amount    Porcentaje [0 - 100] de aclarado
 */
export const lighten = (color, amount) => {
    const newColor = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
    const formattedAmount = parseInt((255 * amount) / 100);

    return `#${addLight(newColor.substring(0,2), formattedAmount)}${addLight(newColor.substring(2,4), formattedAmount)}${addLight(newColor.substring(4,6), formattedAmount)}`;
}

/**
 * Oscurece un color hexadecimal de 6 caracteres #RRGGBB según el porcentaje indicado
 * 
 * @param {*} color     String con el color en formato hexadecimal
 * @param {*} amount    Porcentaje [0 - 100] de aclarado
 */
export const darken = (color, amount) => {
    const newColor = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
    const formattedAmount = parseInt((255 * amount) / 100);

    return `#${substractLight(newColor.substring(0,2), formattedAmount)}${substractLight(newColor.substring(2,4), formattedAmount)}${substractLight(newColor.substring(4,6), formattedAmount)}`;
}
