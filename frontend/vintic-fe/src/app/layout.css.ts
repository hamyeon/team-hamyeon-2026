import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const app = style({
  width: '100%',
  maxWidth: '768px',
  minHeight: '100dvh',
  margin: '0 auto',
  background: vars.color.white,
});