import { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { LANG } from '../states/lang';
import esp from '../lang/esp';
import eng from '../lang/eng';

const getTxt = langState => {
    let txt;

    switch(langState) {
        case LANG.ESP:
            txt = esp;
            break;
        
        case LANG.ENG:
            txt = eng;
            break;

        default:
            txt = esp;
    }

    return txt;
}

export default () => {
    const { lang } = useContext(SettingsContext);
    const [txt, setTxt] = useState(getTxt(lang));
    useEffect(() => setTxt(getTxt(lang)), [lang]);
    return txt;
}
