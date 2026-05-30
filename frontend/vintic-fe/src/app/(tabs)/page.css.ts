import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const page = style({
  position: 'relative',
  minHeight: '100%',
  background: vars.color.white,
});

export const fabLink = style({
  position: 'fixed',
  right: vars.spacing[20],
  bottom: `calc(72px + ${vars.spacing[24]} + env(safe-area-inset-bottom))`,
  zIndex: 10,
});