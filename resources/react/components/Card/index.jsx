import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import { THEME } from '../../states/theming';
import { getRandomArbitrary } from '../../utils';
import { StyledRandomImageCard } from './style';

export const RandomImageCard = ({ interval = 10000, children }) => {
    const DARK_IMAGES = [
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80',
        'https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=994&q=80'
    ];

    const LIGHT_IMAGES = [
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
        'https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
        'https://images.unsplash.com/photo-1557564437-0995702f88fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    ];

    /** Settings Context */
    const { theme } = useContext(SettingsContext);

    /** Index de la imagen a mostrar */
    const [image, set] = useState(DARK_IMAGES.length > LIGHT_IMAGES.length ? getRandomArbitrary(0, LIGHT_IMAGES.length) : getRandomArbitrary(0, DARK_IMAGES.length));

    /** componentDidMount: Aumenta el contador 'image' para cambiar la imagen mostrada */
    useEffect(() => {
        const int = setInterval(() => {
            set(prev => prev + 1);
        }, interval);

        return () => clearInterval(int);
    }, []);

    return (
        <StyledRandomImageCard>
            {DARK_IMAGES.map((img, index) => <img 
                key={index} 
                className={`background ${theme === THEME.DARK && image % DARK_IMAGES.length === index ? 'active' : ''}`}
                src={img}
            ></img>)}

            {LIGHT_IMAGES.map((img, index) => <img 
                key={index} 
                className={`background ${theme === THEME.LIGHT && image % LIGHT_IMAGES.length === index ? 'active' : ''}`}
                src={img}
            ></img>)}

            <div className="content">
                {children}
            </div>
        </StyledRandomImageCard>
    );
}
