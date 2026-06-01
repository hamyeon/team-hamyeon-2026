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

export const infoIcon = style({
  display: 'block',
  width: '24px',
  height: '24px',
  flexShrink: 0,
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

export const priceSection = style({
  marginTop: vars.spacing[32],
});

export const priceLabel = style({
  margin: 0,
  color: vars.color.black,

  fontSize: vars.typography.fontSize.body03,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const priceRow = style({
  display: 'flex',
  alignItems: 'baseline',
  marginTop: vars.spacing[4],
});

export const price = style({
  color: vars.color.black,

  fontSize: vars.typography.fontSize.title01,
  fontWeight: vars.typography.fontWeight.bold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const priceUnit = style({
  marginLeft: vars.spacing[4],
  color: vars.color.black,

  fontSize: vars.typography.fontSize.body03,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const rangeTextGroup = style({
  marginTop: vars.spacing[8],
});

export const rangeText = style({
  margin: 0,
  color: vars.color.black,

  fontSize: vars.typography.fontSize.body03,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,
});

export const reasonButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing[4],
  marginTop: vars.spacing[36],
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: vars.color.black,
  cursor: 'pointer',

  fontSize: vars.typography.fontSize.body03,
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,

  selectors: {
    '&:active': {
      opacity: 0.8,
    },
  },
});

export const reasonArrowIcon = style({
  display: 'block',
  width: '16px',
  height: '16px',
  flexShrink: 0,
});