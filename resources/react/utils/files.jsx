import mime from 'mime';
// import { fileTypeFromBuffer } from 'file-type';
import FileType from 'file-type';
import { Buffer } from 'buffer';

/**
 * Returns the extension and the Content Type of a base64.
 */
export const getBase64MimeInfo = async b64 => {
    const buffer = Buffer.from(b64, 'base64');
    return FileType.fromBuffer(buffer);
}

/**
 * Convert a base64 file to a Blob file
 */
export const base64toBlob = (base64, contentType, sliceSize = 512) => {
    const byteCharacters = Buffer.from(base64, 'base64');
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.at(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

/**
 * Convert a File instance object into a base64 string promise.
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
 * Convert a File instance object into a base64 string promise.
 * @param limit max length of the base64 string. Reduce the image quality until the resulting base64 fits this value.
 */
export const fileToReducedBase64 = (file, limit) => (new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(event) {
        const image = new Image();
        
        image.onload = function() {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            
            const dimensions = resizeImage(image.width, image.height); //[width, height, ratio]
            const width = dimensions[0];
            const height = dimensions[1];
            let ratio = dimensions[2];
            
            canvas.width = width;
            canvas.height = height;
            
            context.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
            
            let result = canvas.toDataURL("image/jpeg", ratio);
            while (result.length > limit) {
                ratio = ratio / 2.5;
                result = canvas.toDataURL("image/jpeg", ratio);
            }
            resolve(result);
        }
        
        image.src = event.target.result.toString();
    }

    reader.onerror = function(error) {
        reject(error);
    }
}));

/**
 * Returns the contentType of a base64 for displaying.
 */
export const getBase64ContentType = async b64 => {
    const info = await getBase64MimeInfo(b64);
    return info ? `data:${info.mime};base64,` : '';
}



/**
 * Indicate the Content Type (image/png, application/pdf, etc) based on the path passed as argument.
 * @param path Path or type of the file. P.e: 'pdf', 'file.pdf', '../src/file.pdf'...
 */
export const getMimeContentType = path => {
    return mime.getType(path);
}

/**
 * Returns the extension of a file based on the content type passed as argument.
 */
export const getMimeExtension = contentType => {
    return mime.getExtension(contentType);
}

/**
 * Resize an image, based on the height and width passed as arguments.
 * @param w     width (px) of the image
 * @param h     height (px) of the image
 * @returns     An array with the new dimensions: width, height and aspect ratio between the old dimensions and the newest dimensions.
 */
export const resizeImage = (w, h) => {
    const hdWidth = 1920; //px
    const hdHeight = 1080; //px
    
    if (w > h) {
        const width = w < hdWidth ? w : hdWidth;
        const ratio = width / w;
        const height = h * ratio;
        return [width, height, ratio];
    }
    
    else {
        const height = h < hdHeight ? h : hdHeight;
        const ratio = height / h;
        const width = w * ratio;
        return [width, height, ratio];
    }
}

/**
 * Converts a base64 string into a File instance object.
 * @param url           Base64 string
 * @param filename      File name
 * @param mimeType      Content Type: application/pdf, image/jpeg, image/gif...
 */
export const urlToFile = (url, filename, mimeType) => fetch(url)
    .then(function(res) {
        return res.arrayBuffer();
    })
    .then(function(buf) {
        return new File([buf], filename, { type:mimeType });
    });




/**
 * Devuelve el formato del base64 pasado por parámetro
 */
export const getBase64Type = b64 => {
    const [firstPart] = b64.split(";");
    const [data, type] = firstPart.split(":");
    return type;
}
