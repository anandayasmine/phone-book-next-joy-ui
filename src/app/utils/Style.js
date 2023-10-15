import _ from 'lodash';
import { extendTheme } from '@mui/joy/styles';
import { ColorPaletteProp } from '@mui/joy/styles';
import {
  CheckCircle,
  Warning,
  Report,
  Info,
} from '@mui/icons-material';
import * as React from 'react';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}
// ==> mui breakpoint https://mui.com/material-ui/customization/breakpoints/#css-media-queries

const mq = _.mapValues(breakpoints, bp => `@media (min-width: ${bp}px)`)

export { mq }

const ellipsis = {
  textOverflow: 'ellipsis',
  maxWidth: '100px',
  overflow: 'hidden'
}

const mainColor = {
  lightGrey: '#d2d2d7',
}


const shadow = {
  boxShadow: `
  0px 0.9px 2.2px rgba(0, 0, 0, 0.008),
  0px 2.1px 5.3px rgba(0, 0, 0, 0.012),
  0px 4px 10px rgba(0, 0, 0, 0.015),
  0px 7.1px 17.9px rgba(0, 0, 0, 0.018),
  0px 13.4px 33.4px rgba(0, 0, 0, 0.022),
  0px 32px 80px rgba(0, 0, 0, 0.03)
  `
}


export const alertDetail = {
  'success': { title: 'Success', color: 'success', icon: <CheckCircle /> },
  'warning': { title: 'Warning', color: 'warning', icon: <Warning /> },
  'danger': { title: 'Error', color: 'danger', icon: <Report /> },
  'neutral': { title: 'Neutral', color: 'neutral', icon: <Info /> },
}

const Style = {
  floatFull: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
  },
  shadow,
  ellipsis,
}




export const JoyTheme = extendTheme({
  components: {
    JoyCard: {
      defaultProps: {
        variant: 'plain',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...({
            color: theme.vars.palette.text.primary,
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '1rem',
            ...Style.shadow
          }),
        }),
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...({
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-primary)',
            fontWeight: 700,
          }),
        }),
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...({
            fontFamily: 'var(--font-primary)',
            color: 'var(--color-primary)',
          }),
        }),
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-primary)',
          fontWeight: 700,
        }
      }
    },
    JoyListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          ':not(.Mui-selected, [aria-selected="true"]):active': {
            backgroundColor: '#EDF5FD',
          },
        }
      }
    },
  },
  fontWeight: {
    xs: 200,
  },
})



export default Style


