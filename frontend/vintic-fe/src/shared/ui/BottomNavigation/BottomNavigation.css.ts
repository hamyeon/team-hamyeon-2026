import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const navigation = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  alignItems: 'center',
  width: '100%',
  height: '72px',
  paddingTop: vars.spacing[12],
  paddingBottom: `calc(${vars.spacing[8]} + env(safe-area-inset-bottom))`,
  background: vars.color.white,
  borderTop: `1px solid ${vars.color.gray2}`,
});

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing[4],
  color: vars.color.gray5,
  textDecoration: 'none',

  fontSize: vars.typography.fontSize.label01,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[140],
  letterSpacing: vars.typography.letterSpacing.tight,

  selectors: {
    '&:active': {
      opacity: 0.6,
    },
  },
});

export const activeItem = style({
  color: vars.color.black,
});

export const icon = style({
  display: 'block',
  width: '24px',
  height: '24px',
});

export const label = style({
  display: 'block',
});