// src/styles/theme.ts

export const THEME = {
    binghamtonGreen: '#004333',
    subtitleGreen: '#005A43',
    textGreen: '#3c4c4c',
    linkGreen: '#007541',
    boldGreen: '#007541',
    offWhite: '#fefefe',
    footerWhite: '#CCCCCC',
    pureWhite: '#FFFFFF',
    darkGrey: '#303c39'
  };
  
  export const buttonStyles = {
    primary: {
      backgroundColor: THEME.boldGreen,
      borderColor: THEME.boldGreen,
      color: THEME.pureWhite,
      '&:hover': {
        backgroundColor: THEME.binghamtonGreen,
        borderColor: THEME.binghamtonGreen
      }
    },
    outline: {
      color: THEME.boldGreen,
      borderColor: THEME.boldGreen,
      '&:hover': {
        backgroundColor: THEME.boldGreen,
        color: THEME.pureWhite
      }
    }
  };
  
  export const authStyles = {
    container: {
      backgroundColor: THEME.pureWhite,
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
      color: THEME.binghamtonGreen,
      fontWeight: 'bold',
      marginBottom: '1.5rem'
    },
    label: {
      color: THEME.textGreen,
      fontWeight: 500
    },
    input: {
      borderColor: THEME.footerWhite,
      '&:focus': {
        borderColor: THEME.boldGreen,
        boxShadow: `0 0 0 0.2rem rgba(0, 117, 65, 0.25)`
      }
    },
    submitButton: {
      backgroundColor: THEME.boldGreen,
      borderColor: THEME.boldGreen,
      padding: '0.75rem',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: THEME.binghamtonGreen,
        borderColor: THEME.binghamtonGreen
      }
    },
    link: {
      color: THEME.linkGreen,
      textDecoration: 'none',
      '&:hover': {
        color: THEME.binghamtonGreen
      }
    }
  };