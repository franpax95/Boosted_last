import theme from 'styled-theming';
import { THEME } from '../states/theming';
import { lighten, darken, addOpacityToHex } from './utils';


export const textLight = '#4D4D4D';
export const textDark = '#F5F5F5';

export const successColor = '#28a745';
export const dangerColor = '#dc3545';

export const primaryLight = '#FF971D';
// export const primaryLight = '#888888';
export const secondaryLight = '#FFE8D6';
// export const secondaryLight = '#FFE8DF';
export const tertiaryLight = '#F9F6F7';
// export const tertiaryLight = '#F0F0F0';
export const quaternaryLight = '#FFFFFF';
// export const quaternaryLight = '#FFFFFF';

// export const primaryDark = '#A7D129';
export const primaryDark = '#FF4C29';
// export const secondaryDark = '#616F39';
export const secondaryDark = '#334756';
// export const tertiaryDark = '#3E432E';
export const tertiaryDark = '#2C394B';
// export const quaternaryDark = '#2b2b2b';
export const quaternaryDark = '#082032';

export const primaryLightHover = lighten(primaryLight, 8);
export const secondaryLightHover = darken(secondaryLight, 8);
export const tertiaryLightHover = darken(tertiaryLight, 8);
export const quaternaryLightHover = darken(quaternaryLight, 8);

export const primaryDarkHover = darken(primaryDark, 10);
export const secondaryDarkHover = lighten(secondaryDark, 10);
export const tertiaryDarkHover = lighten(tertiaryDark, 10);
export const quaternaryDarkHover = lighten(quaternaryDark, 10);

export const primaryLightActive = lighten(primaryLight, 16);
export const secondaryLightActive = darken(secondaryLight, 16);
export const tertiaryLightActive = darken(tertiaryLight, 16);
export const quaternaryLightActive = darken(quaternaryLight, 16);

export const primaryDarkActive = darken(primaryDark, 20);
export const secondaryDarkActive = lighten(secondaryDark, 20);
export const tertiaryDarkActive = lighten(tertiaryDark, 20);
export const quaternaryDarkActive = lighten(quaternaryDark, 20);

export const primaryLightDisabled = addOpacityToHex(primaryLight, .6);
export const secondaryLightDisabled = addOpacityToHex(secondaryLight, .6);
export const tertiaryLightDisabled = addOpacityToHex(tertiaryLight, .6);
export const quaternaryLightDisabled = addOpacityToHex(quaternaryLight, .6);

export const primaryDarkDisabled = addOpacityToHex(primaryDark, .6);
export const secondaryDarkDisabled = addOpacityToHex(secondaryDark, .6);
export const tertiaryDarkDisabled = addOpacityToHex(tertiaryDark, .6);
export const quaternaryDarkDisabled = addOpacityToHex(quaternaryDark, .6);


export default {
    /**
     * Paleta de colores
     */
    color: {
        facebook: '#3F62A9',
        twitter: '#1C99E6',
        instagram: '#D22774',
        linkedin: '#0075AC',

        text: theme('mode', { [THEME.LIGHT]: textLight, [THEME.DARK]: textDark }),

        primary: {
            default: theme('mode', { [THEME.LIGHT]: primaryLight, [THEME.DARK]: primaryDark }),
            hover: theme('mode', { [THEME.LIGHT]: primaryLightHover, [THEME.DARK]: primaryDarkHover }),
            active: theme('mode', { [THEME.LIGHT]: primaryLightActive, [THEME.DARK]: primaryDarkActive }),
            disabled: theme('mode', { [THEME.LIGHT]: primaryLightDisabled, [THEME.DARK]: primaryDarkDisabled }),
        },

        secondary: {
            default: theme('mode', { [THEME.LIGHT]: secondaryLight, [THEME.DARK]: secondaryDark }),
            hover: theme('mode', { [THEME.LIGHT]: secondaryLightHover, [THEME.DARK]: secondaryDarkHover }),
            active: theme('mode', { [THEME.LIGHT]: secondaryLightActive, [THEME.DARK]: secondaryDarkActive }),
            disabled: theme('mode', { [THEME.LIGHT]: secondaryLightDisabled, [THEME.DARK]: secondaryDarkDisabled }),
        },

        tertiary: {
            default: theme('mode', { [THEME.LIGHT]: tertiaryLight, [THEME.DARK]: tertiaryDark }),
            hover: theme('mode', { [THEME.LIGHT]: tertiaryLightHover, [THEME.DARK]: tertiaryDarkHover }),
            active: theme('mode', { [THEME.LIGHT]: tertiaryLightActive, [THEME.DARK]: tertiaryDarkActive }),
            disabled: theme('mode', { [THEME.LIGHT]: tertiaryLightDisabled, [THEME.DARK]: tertiaryDarkDisabled }),
        },

        quaternary: {
            default: theme('mode', { [THEME.LIGHT]: quaternaryLight, [THEME.DARK]: quaternaryDark }),
            hover: theme('mode', { [THEME.LIGHT]: quaternaryLightHover, [THEME.DARK]: quaternaryDarkHover }),
            active: theme('mode', { [THEME.LIGHT]: quaternaryLightActive, [THEME.DARK]: quaternaryDarkActive }),
            disabled: theme('mode', { [THEME.LIGHT]: quaternaryLightDisabled, [THEME.DARK]: quaternaryDarkDisabled }),
        },

        success: {
            default: successColor,
            hover: darken(successColor, 8),
            active: darken(successColor, 16),
            disabled: addOpacityToHex(successColor, .6)
        },

        danger: {
            default: dangerColor,
            hover: darken(dangerColor, 8),
            active: darken(dangerColor, 16),
            disabled: addOpacityToHex(dangerColor, .6)
        }
    },

    /**
     * Font sizes
     */
    font: {
        xs: '9px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '30px',
        xxl: '50px'
    },

    /**
     * Width Viewport Breakpoints
     */
    media: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992, 
        xl: 1200,
        xxl: 1400
    },

    /**
     * Default transition duration
     */
    transitionDuration: '.25s',
};
