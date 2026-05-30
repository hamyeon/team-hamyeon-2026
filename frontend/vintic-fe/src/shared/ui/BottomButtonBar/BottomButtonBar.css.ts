import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const container = style({
  position: 'sticky',
  bottom: 0,
  width: '100%',
  paddingTop: vars.spacing[12],
  paddingRight: vars.spacing[20],
  paddingLeft: vars.spacing[20],
  paddingBottom: `calc(${vars.spacing[12]} + env(safe-area-inset-bottom))`,
  background: vars.color.white,
});

export const doubleGroup = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: vars.spacing[12],
});