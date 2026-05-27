import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const page = style({
  minHeight: '100vh',
  padding: vars.spacing[24],
  background: vars.color.white,
});

export const title = style({
  color: vars.color.black,
});
