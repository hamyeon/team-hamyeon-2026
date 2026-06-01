import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const step = style({
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.white,
});

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: vars.spacing[20],
  paddingLeft: vars.spacing[20],
  textAlign: 'center',
});

export const imagePlaceholder = style({
  width: '96px',
  height: '96px',
  marginBottom: vars.spacing[24],
  background: vars.color.gray1,
});

export const title = style({
  margin: 0,
  color: vars.color.black,

  fontSize: vars.typography.fontSize.head01,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const description = style({
  marginTop: vars.spacing[4],
  marginBottom: 0,
  color: vars.color.gray6,

  fontSize: vars.typography.fontSize.body06,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: vars.typography.lineHeight[140],
  letterSpacing: vars.typography.letterSpacing.default,
});