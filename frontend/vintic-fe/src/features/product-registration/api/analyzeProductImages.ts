import type {
  AnalyzeProductImagesData,
  AnalyzeProductImagesRequest,
  ApiResponse,
} from './types';
import { createFailureResponse, createSuccessResponse, delay } from './mockUtils';

export async function analyzeProductImages(
  request: AnalyzeProductImagesRequest,
): Promise<ApiResponse<AnalyzeProductImagesData>> {
  await delay(1500);

  const { frontImage, backImage, sideImage, defectImage } = request.images;

  if (!frontImage || !backImage) {
    return createFailureResponse(
      40002,
      '앞면과 뒷면, 측면 이미지는 필수입니다.',
    );
  }

  return createSuccessResponse({
    imageUrls: {
      frontImageUrl:
        'https://vintic-mvp-bucket-123.s3.ap-northeast-2.amazonaws.com/mock-front-shoe.jpg',
      backImageUrl:
        'https://vintic-mvp-bucket-123.s3.ap-northeast-2.amazonaws.com/mock-back-shoe.jpg',
      sideImageUrl:
        'https://vintic-mvp-bucket-123.s3.ap-northeast-2.amazonaws.com/mock-side-shoe.jpg',
      defectImageUrl: defectImage
        ? 'https://vintic-mvp-bucket-123.s3.ap-northeast-2.amazonaws.com/mock-defect-shoe.jpg'
        : undefined,
    },
    brand: 'Nike',
    modelName: 'Jordan 1 Retro High',
    color: 'Black/Red',
    size: 270,
    conditionDescription: '오른쪽 발등 부분에 미세한 스크래치 있음',
    conditionGrade: 'B',
  });
}