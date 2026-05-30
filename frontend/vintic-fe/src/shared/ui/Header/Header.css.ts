import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const header = style({
  display: 'grid',
  gridTemplateColumns: '52px 1fr 52px',
  alignItems: 'center',
  width: '100%',
  height: '56px',
  background: vars.color.white,
});

export const border = style({
  borderBottom: `1px solid ${vars.color.gray2}`,
});

export const leftArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
  paddingLeft: vars.spacing[8],
});

export const rightArea = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export const backButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
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

export const backIcon = style({
  display: 'block',
  width: '36px',
  height: '36px',
});

export const title = style({
  margin: 0,
  textAlign: 'center',
  color: vars.color.black,

  fontSize: vars.typography.fontSize.head02,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[140],
  letterSpacing: vars.typography.letterSpacing.default,
});