import type {
  AnalyzeRecommendedPriceData,
  AnalyzeRecommendedPriceRequest,
  ApiResponse,
} from './types';
import { createFailureResponse, createSuccessResponse, delay } from './mockUtils';

export async function analyzeRecommendedPrice(
  request: AnalyzeRecommendedPriceRequest,
): Promise<ApiResponse<AnalyzeRecommendedPriceData>> {
  await delay(1500);

  if (!request.brand) {
    return createFailureResponse(40001, '브랜드는 필수입니다.');
  }

  if (!request.modelName) {
    return createFailureResponse(40001, '모델명은 필수입니다.');
  }

  if (!request.color) {
    return createFailureResponse(40001, '컬러웨이는 필수입니다.');
  }

  if (!request.size) {
    return createFailureResponse(40001, '한국 사이즈는 필수입니다.');
  }

  return createSuccessResponse({
    recommendedPrice: 73000,
    baseMarketPrice: 120984,
    kreamAveragePrice: 114000,
    ebayAveragePrice: 137280,
    priceRange: '69,000원 ~ 77,000원',
    reason:
      'KREAM 유사 거래 1건의 평균가 114,000원과 eBay 유사 거래 50건의 평균가 137,280원을 각각 70%, 30% 비율로 반영해 기준 시세 120,984원을 계산했습니다. 상품 상태는 B 등급으로 판단했으며, 구성품 여부를 반영해 최종 추천가를 산정했습니다.',
    kreamMatches: [
      {
        source: 'KREAM',
        brand: request.brand,
        modelName: request.modelName,
        color: request.color,
        size: request.size,
        conditionGrade: 'DS',
        componentStatus: null,
        price: 114000,
        url: 'https://kream.co.kr/products/548447',
      },
    ],
    ebayMatches: [
      {
        source: 'EBAY',
        brand: request.brand,
        modelName: request.modelName,
        color: 'Black Red',
        size: request.size,
        conditionGrade: 'B',
        componentStatus: null,
        price: 27000,
        url: 'https://www.ebay.com/...',
      },
    ],
  });
}