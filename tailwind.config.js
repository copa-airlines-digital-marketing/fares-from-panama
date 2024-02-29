/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss';

const fade = {
  100: 'ff',
  99: 'fc',
  98: 'fa',
  97: 'f7',
  96: 'f5',
  95: 'f2',
  94: 'f0',
  93: 'ed',
  92: 'eb',
  91: 'e8',
  90: 'e6',
  89: 'e3',
  88: 'e0',
  87: 'de',
  86: 'db',
  85: 'd9',
  84: 'd6',
  83: 'd4',
  82: 'd1',
  81: 'cf',
  80: 'cc',
  79: 'c9',
  78: 'c7',
  77: 'c4',
  76: 'c2',
  75: 'bf',
  74: 'bd',
  73: 'ba',
  72: 'b8',
  71: 'b5',
  70: 'b3',
  69: 'b0',
  68: 'ad',
  67: 'ab',
  66: 'a8',
  65: 'a6',
  64: 'a3',
  63: 'a1',
  62: '9e',
  61: '9c',
  60: '99',
  59: '96',
  58: '94',
  57: '91',
  56: '8f',
  55: '8c',
  54: '8a',
  53: '87',
  52: '85',
  51: '82',
  50: '80',
  49: '7d',
  48: '7a',
  47: '78',
  46: '75',
  45: '73',
  44: '70',
  43: '6e',
  42: '6b',
  41: '69',
  40: '66',
  39: '63',
  38: '61',
  37: '5e',
  36: '5c',
  35: '59',
  34: '57',
  33: '54',
  32: '52',
  31: '4f',
  30: '4d',
  29: '4a',
  28: '47',
  27: '45',
  26: '42',
  25: '40',
  24: '3d',
  23: '3b',
  22: '38',
  21: '36',
  20: '33',
  19: '30',
  18: '2e',
  17: '2b',
  16: '29',
  15: '26',
  14: '24',
  13: '21',
  12: '1f',
  11: '1c',
  10: '1a',
  9: '17',
  8: '14',
  7: '12',
  6: '0f',
  5: '0d',
  4: '0a',
  3: '08',
  2: '05',
  1: '03',
  0: '00'
}

const baseFontSize = 16

const remValue = (size) => `${size / baseFontSize}rem`

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  plugins: [
    function ({
      addComponents
    }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          width: `calc(100% - ${remValue(32)})`,
          '@screen sm': {
            maxWidth: '100%',
            width: remValue(560)
          },
          '@screen md': {
            maxWidth: '100%',
            width: `calc(100% - ${remValue(144)})`
          },
          '@screen lg': {
            maxWidth: '100%',
            width: remValue(1200)
          }
        }
      })
    },
    plugin(function ({
      matchUtilities,
      theme
    }) {
      matchUtilities({
        square: (value) => ({
          height: value,
          width: value
        }),
      }, {
        values: theme('spacing')
      })
    })
  ],
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        ultradark: '#001A66',
        dark: '#002880',
        light: '#0E68FF',
        main: '#0032A0',
        ultralight: '#D6E3FF',
        faded: `#0E68FF${fade[40]}`
      },
      secondary: {
        main: '#00A3E0',
        faded: `#00A3E0${fade[50]}`
      },
      pardo: '#866D4B',
      gold: '#AD7C59',
      'dark-orange': '#B15C37',
      'light-orange': '#E2C070',
      'prefermember-blue': '#072241',
      bg: {
        'light-blue': '#EFF5FF',
        paper: '#FCFCFC'
      },
      warning: {
        main: '#FFC82C',
        faded: `#FFC82C${fade[15]}`
      },
      error: {
        main: '#D52525',
        faded: `#D52525${fade[15]}`
      },
      success: {
        main: '#0C7E3E',
        faded: `#0C7E3E${fade[15]}`
      },
      grey: {
        800: '#121212',
        700: '#333333',
        600: '#666666',
        500: '#999999',
        400: '#AAAAAB',
        300: '#CCCCCB',
        200: '#DBDAD8',
        100: '#EFEFEE',
        50: '#FFFFFF',
        '50-20': `#FFFFFF${fade[20]}`,
        '50-10': `#FFFFFF${fade[10]}`
      },
      fares: {
        economy: {
          basic: '#006CB3',
          classic: '#0E4A81',
          full: '#0D3050'
        },
        business: {
          promo: '#4B5D67',
          full: '#283238'
        },
        special: '#2A7795',
        first: '#000000'
      },
      red: '#e4002b'
    },
    container: {
      center: true
    },
    fontFamily: {
      sans: ['Gilroy', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontSize: {
      '76-80': [remValue(76), {
        lineHeight: remValue(80)
      }],
      '66-72': [remValue(66), {
        lineHeight: remValue(72)
      }],

      '60-64': [remValue(60), {
        lineHeight: remValue(64)
      }],
      '56-64': [remValue(56), {
        lineHeight: remValue(64)
      }],
      '52-56': [remValue(52), {
        lineHeight: remValue(56)
      }],
      '48-64': [remValue(48), {
        lineHeight: remValue(64)
      }],
      '44-48': [remValue(44), {
        lineHeight: remValue(48)
      }],
      '40-48': [remValue(40), {
        lineHeight: remValue(48)
      }],
      '36-40': [remValue(36), {
        lineHeight: remValue(40)
      }],
      '32-40': [remValue(32), {
        lineHeight: remValue(40)
      }],
      '30-40': [remValue(30), {
        lineHeight: remValue(40)
      }],
      '30-32': [remValue(28), {
        lineHeight: remValue(28)
      }],
      '28-32': [remValue(28), {
        lineHeight: remValue(28)
      }],
      '24-32': [remValue(24), {
        lineHeight: remValue(28)
      }],
      '20-32': [remValue(20), {
        lineHeight: remValue(28)
      }],
      '20-24': [remValue(20), {
        lineHeight: remValue(24)
      }],
      '18-24': [remValue(18), {
        lineHeight: remValue(24)
      }],
      '16-24': [remValue(16), {
        lineHeight: remValue(24)
      }],
      '14-20': [remValue(14), {
        lineHeight: remValue(20)
      }],
      '12-16': [remValue(12), {
        lineHeight: remValue(16)
      }]
    },
    letterSpacing: {
      0: '0px',
      '053': '0.53px',
      '063': '0.63px',
      '075': '0.75px',
      '088': '0.88px',
      '094': '0.94px',
      1: remValue(1),
      1025: '1.25px',
      1033: '1.33px',
      1042: '1.42px',
      105: '1.5px',
      1083: '1.83px',
      2017: '2.17px',
      2021: '2.21px',
      205: '2.5px',
      2061: '2.61px',
      3: '3px',
      r001: '0.01rem',
      r0018: '0.018rem',
      r0025: '0.025rem',
      r003: '0.03rem',
      r0033: '0.033rem',
      r004: '0.04rem',
      r0045: '0.045rem',
      r005: '0.05rem',
      r0054: '0.054rem',
      r006: '0.06rem',
    },
    screens: {
      sm: '600px',
      md: '960px',
      cal: '1236px',
      lg: '1367px'
    },
    spacing: {
      '2em': '2em',
      0: 0,
      1: remValue(1),
      2: remValue(2),
      4: remValue(4),
      8: remValue(8),
      12: remValue(12),
      16: remValue(16),
      24: remValue(24),
      32: remValue(32),
      40: remValue(40),
      48: remValue(48),
      56: remValue(56),
      64: remValue(64),
      72: remValue(72),
      80: remValue(80),
      88: remValue(88),
      96: remValue(96),
      112: remValue(112),
      136: remValue(136),
      152: remValue(152)
    },
  }
};

