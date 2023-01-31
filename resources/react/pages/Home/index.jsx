import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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

export default function Home() {
    /** Settings Context */
    const { lang } = useContext(SettingsContext);
    /** Language */
    const { pages: { Home: texts }} = useLanguage();

    return (
        <StyledHome>
            <h1 className={`home-title ${lang === LANG.ESP ? 'esp' : 'eng'}`}>
                <span>{texts.txt1}</span>
                <span className="colored">{texts.txt2}</span>
            </h1>

            <div className="info">
                <h3>{texts.txt3}<br />{texts.txt4}</h3>
                <p>{texts.txt5}</p>
                <Link to="/routines">{texts.txt6}</Link>
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

// const Home = () => {
//     const navigate = useNavigate();
//     const { setTheme } = useContext(SettingsContext);
//     const { logout } = useContext(UserContext);

//     const onClick = () => setTheme();

//     const onLogoutClick = async () => {
//         const ok = await logout();
//         if(ok) {
//             navigate('/login');
//         }
//     }

//     return (
//         <div>
//             <StyledPalette>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//             </StyledPalette>

//             <PrimaryButton>PRUEBA PRIMARY BUTTON</PrimaryButton>
//             <SecondaryButton>PRUEBA SECONDARY BUTTON</SecondaryButton>
//             <TertiaryButton>PRUEBA TERTIARY BUTTON</TertiaryButton>

//             <br />
//             <hr />
//             <br />
//             <hr />
//             <br />

//             <PrimaryButton onClick={onLogoutClick}>LOGOUT</PrimaryButton>
//             Home page works!
//             <PrimaryLink to="/notfound">Ir a NotFound</PrimaryLink>
//             <br/><br/><br />
//             <PrimaryButton onClick={onClick}>Cambiar tema</PrimaryButton>
//             <br/><br/><br />
//             <PrimaryButton>PRUEBA</PrimaryButton>
//             <br/><br/><br />
//             <PrimaryButton disabled={true}>Mucho texto loren ipsum tu sabe mami moto mami nuevo disco de rosalia</PrimaryButton>

//             <br/><br/><br />
//             <SecondaryButton>PRUEBA</SecondaryButton>
//             <br/><br/><br />
//             <SecondaryButton disabled={true}>Mucho texto loren ipsum tu sabe mami moto mami nuevo disco de rosalia</SecondaryButton>

//             <br/><br/><br />
//             <TertiaryButton>PRUEBA</TertiaryButton>
//             <br/><br/><br />
//             <TertiaryButton disabled={true}>Mucho texto loren ipsum tu sabe mami moto mami nuevo disco de rosalia</TertiaryButton>
//         </div>
//     );
// }

// export default Home;
