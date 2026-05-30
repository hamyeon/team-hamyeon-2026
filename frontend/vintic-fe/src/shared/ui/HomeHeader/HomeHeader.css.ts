import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '56px',
  paddingRight: vars.spacing[16],
  paddingLeft: vars.spacing[20],
  background: vars.color.white,
  borderBottom: `1px solid ${vars.color.gray2}`
});

export const title = style({
  margin: 0,
  color: vars.color.black,

  fontSize: vars.typography.fontSize.head02,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[140],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[16],
});

export const iconButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',

  selectors: {
    '&:active': {
      opacity: 0.8,
    },
  },
});

export const icon = style({
  display: 'block',
  width: '24px',
  height: '24px',
});