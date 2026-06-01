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

export const priceEditor = style({
  marginTop: vars.spacing[28],
});

export const priceText = style({
  margin: 0,
  color: vars.color.black,

  fontSize: vars.typography.fontSize.body02,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: vars.typography.lineHeight[160],
  letterSpacing: vars.typography.letterSpacing.default,

  selectors: {
    '& strong': {
      fontWeight: vars.typography.fontWeight.semibold,
    },
  },
});

export const slider = style({
  width: '100%',
  height: '24px',
  marginTop: vars.spacing[28],
  marginBottom: 0,
  padding: 0,
  appearance: 'none',
  background: 'transparent',
  cursor: 'pointer',

  selectors: {
    '&::-webkit-slider-runnable-track': {
      height: '4px',
      borderRadius: vars.radius[4],
      background: vars.color.gray1,
    },

    '&::-webkit-slider-thumb': {
      appearance: 'none',
      width: '24px',
      height: '24px',
      marginTop: '-10px',
      borderRadius: vars.radius[24],
      border: `1px solid ${vars.color.gray5}`,
      background: vars.color.white,
      boxShadow: 'none',
    },

    '&::-moz-range-track': {
      height: '4px',
      borderRadius: vars.radius[24],
      background: vars.color.gray1,
    },

    '&::-moz-range-thumb': {
      width: '24px',
      height: '24px',
      borderRadius: vars.radius[24],
      border: `1px solid ${vars.color.gray5}`,
      background: vars.color.white,
      boxShadow: 'none',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

export const rangeLabelRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: vars.spacing[16],
  color: vars.color.black,

  fontSize: vars.typography.fontSize.body06,
  fontWeight: vars.typography.fontWeight.regular,
  lineHeight: vars.typography.lineHeight[140],
  letterSpacing: vars.typography.letterSpacing.default,
});