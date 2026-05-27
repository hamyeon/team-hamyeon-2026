import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  minHeight: '100%',
  background: vars.color.white,
  color: vars.color.black,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('body', {
  overflowX: 'hidden',
  wordBreak: 'keep-all',
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('ul, ol', {
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: 0,
});
