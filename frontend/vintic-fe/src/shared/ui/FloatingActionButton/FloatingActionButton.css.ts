import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing[4],

  height: '48px',
  paddingTop: vars.spacing[12],
  paddingRight: vars.spacing[16],
  paddingLeft: vars.spacing[12],
  paddingBottom: vars.spacing[12],
  border: 'none',
  borderRadius: vars.radius[24],

  background: vars.color.black,
  color: vars.color.white,
  cursor: 'pointer',

  fontSize: vars.typography.fontSize.body03,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,

  transition: 'background-color 0.12s ease, opacity 0.12s ease',

  selectors: {
    '&:active:not(:disabled)': {
      background: vars.color.gray7,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      background: vars.color.gray5,
    },
  },
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  flexShrink: 0,
});

export const iconImage = style({
  display: 'block',
  width: '20px',
  height: '20px',
});

export const label = style({
  display: 'inline-flex',
  alignItems: 'center',
});