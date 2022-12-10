import { THEME } from '../states/theming';
import { lighten, darken, addOpacityToHex } from './utils';

// Paleta de colores LIGHT
const primaryLight = '#FF971D';
// const primaryLight = '#888888';
const secondaryLight = '#FFE8D6';
// const secondaryLight = '#FFE8DF';
const tertiaryLight = '#F9F6F7';
// const tertiaryLight = '#F0F0F0';
const quaternaryLight = '#FFFFFF';
// const quaternaryLight = '#FFFFFF';
const textLight = '#4D4D4D';

// Paleta de colores DARK
// const primaryDark = '#A7D129';
const primaryDark = '#FF4C29';
// const secondaryDark = '#616F39';
const secondaryDark = '#334756';
// const tertiaryDark = '#3E432E';
const tertiaryDark = '#2C394B';
// const quaternaryDark = '#2b2b2b';
const quaternaryDark = '#082032';
const textDark = '#F5F5F5';

export default {
    /**
     * Paleta de colores
     */
    color: {
        facebook: '#3F62A9',
        twitter: '#1C99E6',
        instagram: '#D22774',
        linkedin: '#0075AC',

        text: {
            [THEME.LIGHT]: textLight,
            [THEME.DARK]: textDark
        },

        primary: {
            [THEME.LIGHT]: {
                default: primaryLight,
                hover: lighten(primaryLight, 8),
                active: lighten(primaryLight, 16),
                disabled: addOpacityToHex(primaryLight, .6)
            },
            [THEME.DARK]: {
                default: primaryDark,
                hover: darken(primaryDark, 10),
                active: darken(primaryDark, 20),
                disabled: addOpacityToHex(primaryDark, .6)
            }
        },

        secondary: {
            [THEME.LIGHT]: {
                default: secondaryLight,
                hover: darken(secondaryLight, 8),
                active: darken(secondaryLight, 16),
                disabled: addOpacityToHex(secondaryLight, .6)
            },
            [THEME.DARK]: {
                default: secondaryDark,
                hover: lighten(secondaryDark, 10),
                active: lighten(secondaryDark, 20),
                disabled: addOpacityToHex(secondaryDark, .6)
            }
        },

        tertiary: {
            [THEME.LIGHT]: {
                default: tertiaryLight,
                hover: darken(tertiaryLight, 8),
                active: darken(tertiaryLight, 16),
                disabled: addOpacityToHex(tertiaryLight, .6)
            },
            [THEME.DARK]: {
                default: tertiaryDark,
                hover: lighten(tertiaryDark, 10),
                active: lighten(tertiaryDark, 20),
                disabled: addOpacityToHex(tertiaryDark, .6)
            }
        },

        quaternary: {
            [THEME.LIGHT]: {
                default: quaternaryLight,
                hover: darken(quaternaryLight, 8),
                active: darken(quaternaryLight, 16),
                disabled: addOpacityToHex(quaternaryLight, .6)
            },
            [THEME.DARK]: {
                default: quaternaryDark,
                hover: lighten(quaternaryDark, 10),
                active: lighten(quaternaryDark, 20),
                disabled: addOpacityToHex(quaternaryDark, .6)
            }
        },
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
