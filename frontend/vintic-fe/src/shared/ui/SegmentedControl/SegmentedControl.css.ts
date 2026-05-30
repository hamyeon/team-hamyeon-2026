import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const group = style({
  display: 'grid',
  width: '100%',
  gap: vars.spacing[8],
  //paddingRight: vars.spacing[20],
  //paddingLeft: vars.spacing[20],
});

export const columns = styleVariants({
  2: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  3: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  4: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
});

export const option = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '40px',
  borderRadius: vars.radius[4],
  border: `1px solid ${vars.color.gray2}`,
  background: vars.color.white,
  color: vars.color.black,
  cursor: 'pointer',

  fontSize: vars.typography.fontSize.body05,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,

  transition: 'border-color 0.12s ease, background-color 0.12s ease, color 0.12s ease',

  selectors: {
    '&:active:not(:disabled)': {
      background: vars.color.gray2,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: vars.color.gray5,
      background: vars.color.gray2,
    },
  },
});

export const selected = style({
  borderColor: vars.color.gray6,
  background: vars.color.gray6,
  color: vars.color.white,
});

export const unselected = style({
  borderColor: vars.color.gray2,
  background: vars.color.white,
  color: vars.color.black,

  selectors: {
    '&:active': {
      background: vars.color.gray1,
    },
  },
});