import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const input = style({
  width: '100%',
  height: '50px',
  padding: `0 ${vars.spacing[12]}`,

  border: `1px solid ${vars.color.gray2}`,
  borderRadius: vars.radius[4],
  background: vars.color.white,
  color: vars.color.black,
  outline: 'none',

  fontSize: vars.typography.fontSize.body02,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,

  transition: 'border-color 0.12s ease, background-color 0.12s ease',

  selectors: {
    '&::placeholder': {
      color: vars.color.gray5,
    },

    '&:focus': {
      borderColor: vars.color.black,
    },

    '&:disabled': {
      cursor: 'not-allowed',
      background: vars.color.gray1,
      color: vars.color.gray5,
    },
  },
});

export const error = style({
  borderColor: vars.color.error,

  selectors: {
    '&:focus': {
      borderColor: vars.color.error,
    },
  },
});