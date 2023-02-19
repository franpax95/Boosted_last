import React, { useEffect, useState } from 'react';
import { getBase64ContentType } from '../../utils/files';

export const Base64Image = ({ src, ...props }) => {
    const [_src, set] = useState('');

    useEffect(() => {
        if (src !== '') {
            getBase64ContentType(src).then(contentType => set(`${contentType}${src}`));
        } else {
            set('');
        }
    }, [src]);

    if (_src === '') {
        return '';
    } 

    return <img src={_src} {...props} />;
}
