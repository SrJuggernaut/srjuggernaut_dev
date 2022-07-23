import { ThemeOptions } from '@mui/material'

const themeBase: Partial<ThemeOptions> = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      /* roboto-300 - latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        src: local(''),
             url('/fonts/roboto-v30-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/roboto-v30-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      
      /* roboto-regular - latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local(''),
             url('/fonts/roboto-v30-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/roboto-v30-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      
      /* roboto-500 - latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        src: local(''),
             url('/fonts/roboto-v30-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/roboto-v30-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      
      /* roboto-700 - latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: local(''),
             url('/fonts/roboto-v30-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/roboto-v30-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* source-code-pro-regular - latin */
      @font-face {
        font-family: 'Source Code Pro';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url('/fonts/source-code-pro-v21-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/source-code-pro-v21-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* source-code-pro-900 - latin */
      @font-face {
        font-family: 'Source Code Pro';
        font-style: normal;
        font-weight: 900;
        src: local(''),
            url('/fonts/source-code-pro-v21-latin-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/source-code-pro-v21-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      body {
        transition: background-color 0.5s ease, color 0.5s ease;
      }
      `
    }
  },
  typography: {
    h1: {
      fontFamily: 'Source Code Pro',
      fontSize: 40,
      fontWeight: 900
    },
    h2: {
      fontFamily: 'Source Code Pro',
      fontSize: 33,
      fontWeight: 900
    },
    h3: {
      fontFamily: 'Source Code Pro',
      fontSize: 28,
      fontWeight: 900
    },
    h4: {
      fontFamily: 'Source Code Pro',
      fontSize: 24,
      fontWeight: 900
    },
    h5: {
      fontFamily: 'Source Code Pro',
      fontSize: 20,
      fontWeight: 900
    },
    h6: {
      fontFamily: 'Source Code Pro',
      fontWeight: 900,
      fontSize: 16
    },
    subtitle1: {
      fontFamily: 'Source Code Pro',
      fontSize: 24
    },
    subtitle2: {
      fontFamily: 'Source Code Pro',
      fontSize: 20
    },
    body1: {
      fontFamily: 'Roboto',
      fontSize: '1rem'
    },
    fontSize: 16,
    fontFamily: 'Roboto',
    button: {
      fontWeight: 700,
      fontSize: 14
    },
    caption: {
      fontSize: '0.85rem'
    }
  },
  spacing: 16
}

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#20C997'
    },
    secondary: {
      main: '#D3AC5F'
    },
    error: {
      main: '#FF3D57'
    },
    success: {
      main: '#79B20E'
    },
    info: {
      main: '#028EF9'
    },
    warning: {
      main: '#FCC202'
    },
    background: {
      default: '#031611'
    },
    text: {
      primary: '#F6FEFC'
    }
  },
  ...themeBase
}

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#006345'
    },
    secondary: {
      main: '#BC7E47'
    },
    background: {
      default: '#F6FEFC'
    },
    text: {
      primary: '#031611'
    },
    error: {
      main: '#FF3D57'
    },
    success: {
      main: '#79B20E'
    },
    info: {
      main: '#028EF9'
    },
    warning: {
      main: '#FCC202'
    }
  },
  ...themeBase
}
