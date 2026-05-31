import type {
  ApiResponse,
  RegisterProductData,
  RegisterProductRequest,
} from './types';
import { createFailureResponse, createSuccessResponse, delay } from './mockUtils';

export async function registerProduct(
  request: RegisterProductRequest,
): Promise<ApiResponse<RegisterProductData>> {
  await delay(1000);

  if (!request.imageUrls.frontImageUrl || !request.imageUrls.backImageUrl) {
    return createFailureResponse(
      40001,
      '필수 이미지 URL은 필수입니다.',
    );
  }

  if (!request.finalPrice) {
    return createFailureResponse(40001, '최종 판매가는 필수입니다.');
  }

  return createSuccessResponse({
    id: 1,
    imageUrls: request.imageUrls,
    brand: request.brand,
    modelName: request.modelName,
    color: request.color,
    size: request.size,
    conditionGrade: request.conditionGrade,
    componentStatus: request.componentStatus,
    recommendedPrice: request.recommendedPrice,
    baseMarketPrice: request.baseMarketPrice,
    priceRange: request.priceRange,
    finalPrice: request.finalPrice,
    reason:
      request.reason ||
      'KREAM/eBay 유사 거래 평균가를 기준으로 기준 시세를 계산하고, 상품 상태 등급과 구성품 여부를 반영해 추천 가격을 산정했습니다.',
    description: request.description,
    createdAt: '2026-05-30T00:00:00',
  });
}