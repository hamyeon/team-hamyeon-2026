import type {
  ComponentStatus,
  ConditionGrade,
  ProductImageType,
} from './types';

export const PRODUCT_IMAGE_SLOTS = [
  {
    type: 'front',
    label: '앞면',
    required: true,
  },
  {
    type: 'back',
    label: '뒷면',
    required: true,
  },
  {
    type: 'side',
    label: '측면',
    required: true,
  },
  {
    type: 'defect',
    label: '하자',
    required: false,
  },
] satisfies {
  type: ProductImageType;
  label: string;
  required: boolean;
}[];

export const COMPONENT_STATUS_OPTIONS = [
  { label: '전체 있음', value: 'all' },
  { label: '일부 있음', value: 'partial' },
  { label: '구성품 없음', value: 'none' },
] satisfies {
  label: string;
  value: ComponentStatus;
}[];

export const CONDITION_GRADE_OPTIONS = [
  { label: 'S', value: 'S' },
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
] satisfies {
  label: string;
  value: ConditionGrade;
}[];