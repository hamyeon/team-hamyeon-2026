import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '54px',
  borderRadius: vars.radius[8],
  border: 'none',
  cursor: 'pointer',

  fontSize: vars.typography.fontSize.head03,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,

  transition: 'background-color 0.12s ease, opacity 0.12s ease',

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const variant = styleVariants({
  primary: {
    background: vars.color.black,
    color: vars.color.white,

    selectors: {
      '&:active:not(:disabled)': {
        background: vars.color.gray7,
      },
      '&:disabled': {
        background: vars.color.gray5
      }
    },
  },
  secondary: {
    background: vars.color.gray5,
    color: vars.color.white,

    selectors: {
      '&:active:not(:disabled)': {
        background: vars.color.gray4,
      },
      '&:disabled': {
        background: vars.color.gray2
      }
    },
  },
});