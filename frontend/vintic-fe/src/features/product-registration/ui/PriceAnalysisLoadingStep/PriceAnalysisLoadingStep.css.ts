import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/styles/theme.css';

export const step = style({
  minHeight: '100dvh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: vars.color.white,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingRight: vars.spacing[20],
  paddingLeft: vars.spacing[20],
});

export const loadingBox = style({
  width: '96px',
  height: '96px',
  background: vars.color.gray1,
});

export const description = style({
  marginTop: vars.spacing[24],
  marginBottom: 0,
  color: vars.color.black,

  fontSize: vars.typography.fontSize.body03,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,
});