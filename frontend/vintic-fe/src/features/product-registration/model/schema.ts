import { z } from 'zod';

export const componentStatusSchema = z.enum(['all', 'partial', 'none']);

export const conditionGradeSchema = z.enum(['S', 'A', 'B', 'C', 'D']);

export const productRegistrationSchema = z.object({
  frontImageUrl: z.string().optional(),
  backImageUrl: z.string().optional(),
  sideImageUrl: z.string().optional(),
  defectImageUrl: z.string().optional(),

  brand: z.string().min(1, '브랜드를 입력해주세요.'),
  modelName: z.string().min(1, '모델명을 입력해주세요.'),
  color: z.string().min(1, '컬러를 입력해주세요.'),
  size: z.number().positive('사이즈를 입력해주세요.'),

  conditionDescription: z.string().min(1, '상품 상태 정보를 입력해주세요.'),
  conditionGrade: conditionGradeSchema,

  componentStatus: componentStatusSchema,
  description: z.string().optional(),

  recommendedPrice: z.number().optional(),
  baseMarketPrice: z.number().optional(),
  kreamAveragePrice: z.number().optional(),
  ebayAveragePrice: z.number().optional(),
  minRecommendedPrice: z.number().optional(),
  maxRecommendedPrice: z.number().optional(),
  priceRange: z.string().optional(),
  reason: z.string().optional(),

  finalPrice: z.number().positive('최종 판매가는 필수입니다.').optional(),
});

export type ProductRegistrationFormValues = z.infer<
  typeof productRegistrationSchema
>;