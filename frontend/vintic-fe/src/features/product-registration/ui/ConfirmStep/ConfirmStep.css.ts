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
  paddingTop: vars.spacing[32],
  paddingRight: vars.spacing[20],
  paddingLeft: vars.spacing[20],
  paddingBottom: vars.spacing[32],
});

export const stepText = style({
  margin: 0,
  color: vars.color.gray5,

  fontSize: vars.typography.fontSize.body06,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: vars.typography.lineHeight[140],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[4],
  marginTop: 0,
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
  marginTop: vars.spacing[8],
  marginBottom: 0,
  color: vars.color.black,

  fontSize: vars.typography.fontSize.body05,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const summary = style({
  marginTop: vars.spacing[28],
});

export const imageRow = style({
  display: 'flex',
  gap: vars.spacing[8],
  marginBottom: vars.spacing[20],
});

export const productImage = style({
  width: '72px',
  height: '72px',
  objectFit: 'cover',
  border: `1px solid ${vars.color.gray1}`,
});

export const infoList = style({
  margin: 0,
});

export const infoItem = style({
  marginBottom: vars.spacing[16],

  selectors: {
    '& dt': {
      marginBottom: vars.spacing[4],
      color: vars.color.black,
      fontSize: vars.typography.fontSize.head03,
      fontWeight: vars.typography.fontWeight.semibold,
      lineHeight: vars.typography.lineHeight[160],
      letterSpacing: vars.typography.letterSpacing.default,
    },
    '& dd': {
      margin: 0,
      color: vars.color.black,
      fontSize: vars.typography.fontSize.body05,
      fontWeight: vars.typography.fontWeight.regular,
      lineHeight: vars.typography.lineHeight[160],
      letterSpacing: vars.typography.letterSpacing.default,
    },
  },
});