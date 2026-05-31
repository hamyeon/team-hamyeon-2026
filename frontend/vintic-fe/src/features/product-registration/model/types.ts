export type ProductImageType = 'front' | 'back' | 'side' | 'defect';

export type ProductImageFiles = {
  frontImage?: File;
  backImage?: File;
  sideImage?: File;
  defectImage?: File;
};

export type ProductImageUrls = {
  frontImageUrl?: string;
  backImageUrl?: string;
  sideImageUrl?: string;
  defectImageUrl?: string;
};

export type ComponentStatus = 'all' | 'partial' | 'none';

export type ConditionGrade = 'S' | 'A' | 'B' | 'C' | 'D';

export type ProductRegistrationStep =
  | 'imageUpload'
  | 'productAnalysisLoading'
  | 'productAnalysisResult'
  | 'additionalInfo'
  | 'priceAnalysisLoading'
  | 'priceResult'
  | 'priceEdit'
  | 'confirm'
  | 'complete';