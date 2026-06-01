import type {
  ComponentStatus,
  ConditionGrade,
  ProductImageFiles,
  ProductImageUrls,
} from '../model/types';

export const PRODUCT_API_BASE_URL = 'http://44.193.0.36:8080';

export const PRODUCT_API_ENDPOINTS = {
  analyzeProductImages: '/api/products/analyze',
  analyzeRecommendedPrice: '/api/products/calculate-price',
  registerProduct: '/api/products',
} as const;

export type ApiError = {
  code: number;
  message: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  error: null;
};

export type ApiFailureResponse = {
  success: false;
  data: null;
  error: ApiError;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export type AnalyzeProductImagesRequest = {
  images: ProductImageFiles;
};

export type AnalyzeProductImagesData = {
  imageUrls: ProductImageUrls;
  brand: string;
  modelName: string;
  color: string;
  size: number;
  conditionDescription: string;
  conditionGrade: ConditionGrade;
};

export type AnalyzeRecommendedPriceRequest = {
  brand: string;
  modelName: string;
  color: string;
  size: number;
  conditionGrade: ConditionGrade;
  componentStatus: ComponentStatus;
};

export type MarketMatch = {
  source: 'KREAM' | 'EBAY';
  brand: string;
  modelName: string;
  color: string;
  size: number;
  conditionGrade: string;
  componentStatus: ComponentStatus | null;
  price: number;
  url: string;
};

export type AnalyzeRecommendedPriceData = {
  recommendedPrice: number;
  baseMarketPrice: number;
  kreamAveragePrice: number;
  ebayAveragePrice: number;
  minRecommendedPrice: number;
  maxRecommendedPrice: number;
  priceRange: string;
  reason: string;
  kreamMatches: MarketMatch[];
  ebayMatches: MarketMatch[];
};

export type RegisterProductRequest = {
  imageUrls: ProductImageUrls;
  brand: string;
  modelName: string;
  color: string;
  size: number;
  conditionGrade: ConditionGrade;
  componentStatus: ComponentStatus;
  recommendedPrice: number;
  baseMarketPrice: number;
  priceRange: string;
  finalPrice: number;
  reason: string;
  description?: string;
};

export type RegisterProductData = RegisterProductRequest & {
  id: number;
  createdAt: string;
};