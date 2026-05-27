import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    primary: '#3662FF',
    primary_light: '#7190FF',

    white: '#FFFFFF',
    gray1: '#ECECEC',
    gray2: '#DADADA',
    gray3: '#D3D3D3',
    gray4: '#808080',
    gray5: '#4A4A4A',
    gray6: '#404040',
    black: '#1A1A1A',
  },

  spacing: {
    4: '4px',
    8: '8px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    36: '36px',
  },

  radius: {
    4: '4px',
    8: '8px',
    12: '12px',
    24: '24px',
  },

  typography: {
    fontFamily:
      'var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui, sans-serif',

    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },

    fontSize: {
      title01: '1.75rem', // 28px
      head01: '1.25rem', // 20px
      head02: '1.125rem', // 18px
      head03: '1rem', // 16px
      body01: '1rem', // 16px
      body02: '1rem', // 16px
      body03: '0.875rem', // 14px
      body04: '0.875rem', // 14px
      body05: '0.875rem', // 14px
      body06: '0.875rem', // 14px
      caption01: '0.75rem', // 12px
      label01: '0.625rem', // 10px
    },

    lineHeight: {
      140: '1.4',
      160: '1.6',
    },

    letterSpacing: {
      default: '0em',
      tight: '-0.01em',
    },
  },
});
