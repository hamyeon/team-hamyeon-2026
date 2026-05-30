import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const layout = style({
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.white,
});

export const content = style({
  flex: 1,
  minHeight: 0,
});