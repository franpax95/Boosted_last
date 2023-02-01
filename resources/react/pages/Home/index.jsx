import React, { useContext } from 'react';
import useLanguage from '../../hooks/useLanguage';
import { SettingsContext } from '../../contexts/SettingsContext';
import { StyledHome } from './style';
import { ImageBackground } from '../../components/Background';
import LightIMG from '../../../images/bruce-mars.jpg';
import LightVerticalIMG from '../../../images/total-shape.jpg';
import LightHorizontalIMG from '../../../images/cathy-pham.jpg';
import DarkIMG from '../../../images/victor-freitas.jpg';
import DarkVerticalIMG from '../../../images/charles-gaudreault.jpg';
import DarkHorizontalIMG from '../../../images/luis-vidal.jpg';
import { LANG } from '../../states/lang';
import { AnimatedButton } from '../../components/Button';
import { useNavigate } from 'react-router';

export default function Home() {
    /** History */
    const navigate = useNavigate();
    /** Settings Context */
    const { lang } = useContext(SettingsContext);
    /** Language */
    const { pages: { Home: texts }} = useLanguage();

    /** Manejador de eventos click del botón animado */
    const onClick = event => {
        navigate('/routines');
    }

    return (
        <StyledHome>
            <h1 className={`home-title ${lang === LANG.ESP ? 'esp' : 'eng'}`}>
                <span>{texts.txt1}</span>
                <span className="colored">{texts.txt2}</span>
            </h1>

            <div className="info">
                <h3>{texts.txt3}<br />{texts.txt4}</h3>
                <p>{texts.txt5}</p>
                <AnimatedButton onClick={onClick}>{texts.txt6}</AnimatedButton>
            </div>

            <div className="img-1">
                <ImageBackground 
                    light={LightVerticalIMG}
                    dark={DarkVerticalIMG}
                />
            </div>

            <div className="img-2">
                <ImageBackground 
                    light={LightHorizontalIMG}
                    dark={DarkHorizontalIMG}
                />
            </div>

            <div className="img-3">
                <ImageBackground 
                    light={LightIMG}
                    dark={DarkIMG}
                />
            </div>
        </StyledHome>
    );
}
