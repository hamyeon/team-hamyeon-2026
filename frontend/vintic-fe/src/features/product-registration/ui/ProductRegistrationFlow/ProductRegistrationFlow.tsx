'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  productRegistrationSchema,
  type ProductRegistrationFormValues,
} from '@/features/product-registration/model/schema';
import type {
  ProductImageFiles,
  ProductImageType,
  ProductRegistrationStep
} from '@/features/product-registration/model/types';
import { PRODUCT_REGISTRATION_STEPS } from '@/features/product-registration/model/steps';
import {
  analyzeProductImages,
  analyzeRecommendedPrice,
  registerProduct,
} from '@/features/product-registration/api';

import { ImageUploadStep } from '../ImageUploadStep';
import { ProductAnalysisLoadingStep } from '../ProductAnalysisLoadingStep';
import { ProductAnalysisResultStep } from '../ProductAnalysisResultStep';
import { AdditionalInfoStep } from '../AdditionalInfoStep';
import { PriceAnalysisLoadingStep } from '../PriceAnalysisLoadingStep';
import { PriceResultStep } from '../PriceResultStep';
import { PriceEditStep } from '../PriceEditStep';
import { ConfirmStep } from '../ConfirmStep';
import { CompleteStep } from '../CompleteStep';

import * as styles from './ProductRegistrationFlow.css';

const IMAGE_FILE_FIELD = {
  front: 'frontImage',
  back: 'backImage',
  side: 'sideImage',
  defect: 'defectImage',
} as const satisfies Record<ProductImageType, keyof ProductImageFiles>;

export function ProductRegistrationFlow() {
  const router = useRouter();

  const [step, setStep] = useState<ProductRegistrationStep>(
    PRODUCT_REGISTRATION_STEPS.IMAGE_UPLOAD,
  );
  const [images, setImages] = useState<ProductImageFiles>({});

  const form = useForm<ProductRegistrationFormValues>({
    resolver: zodResolver(productRegistrationSchema),
    defaultValues: {
      brand: '',
      modelName: '',
      color: '',
      size: 0,
      conditionDescription: '',
      conditionGrade: 'B',
      componentStatus: 'all',
      description: '',
    },
  });

  const handleImageChange = (type: ProductImageType, file: File) => {
    const fileField = IMAGE_FILE_FIELD[type];

    setImages((prevImages) => ({
      ...prevImages,
      [fileField]: file,
    }));
  };

  const handleAnalyzeProductImages = async () => {
    setStep(PRODUCT_REGISTRATION_STEPS.PRODUCT_ANALYSIS_LOADING);

    const response = await analyzeProductImages({
      images,
    });

    if (!response.success) {
      alert(response.error.message);
      setStep(PRODUCT_REGISTRATION_STEPS.IMAGE_UPLOAD);
      return;
    }

    form.setValue('frontImageUrl', response.data.imageUrls.frontImageUrl);
    form.setValue('backImageUrl', response.data.imageUrls.backImageUrl);
    form.setValue('sideImageUrl', response.data.imageUrls.sideImageUrl);
    form.setValue('defectImageUrl', response.data.imageUrls.defectImageUrl);

    form.setValue('brand', response.data.brand);
    form.setValue('modelName', response.data.modelName);
    form.setValue('color', response.data.color);
    form.setValue('size', response.data.size);
    form.setValue('conditionDescription', response.data.conditionDescription);
    form.setValue('conditionGrade', response.data.conditionGrade);

    setStep(PRODUCT_REGISTRATION_STEPS.PRODUCT_ANALYSIS_RESULT);
  };

  const handleMoveToAdditionalInfo = async () => {
    const isValid = await form.trigger([
      'brand',
      'modelName',
      'color',
      'size',
      'conditionDescription',
      'conditionGrade',
    ]);

    if (!isValid) {
      return;
    }

    setStep(PRODUCT_REGISTRATION_STEPS.ADDITIONAL_INFO);
  };

  const handleAnalyzeRecommendedPrice = async () => {
    setStep(PRODUCT_REGISTRATION_STEPS.PRICE_ANALYSIS_LOADING);

    const values = form.getValues();

    const response = await analyzeRecommendedPrice({
      brand: values.brand,
      modelName: values.modelName,
      color: values.color,
      size: values.size,
      conditionGrade: values.conditionGrade,
      componentStatus: values.componentStatus,
    });

    if (!response.success) {
      alert(response.error.message);
      setStep(PRODUCT_REGISTRATION_STEPS.ADDITIONAL_INFO);
      return;
    }

    form.setValue('recommendedPrice', response.data.recommendedPrice);
    form.setValue('baseMarketPrice', response.data.baseMarketPrice);
    form.setValue('kreamAveragePrice', response.data.kreamAveragePrice);
    form.setValue('ebayAveragePrice', response.data.ebayAveragePrice);
    form.setValue('minRecommendedPrice', response.data.minRecommendedPrice);
    form.setValue('maxRecommendedPrice', response.data.maxRecommendedPrice);
    form.setValue('priceRange', response.data.priceRange);
    form.setValue('reason', response.data.reason);
    form.setValue('finalPrice', response.data.recommendedPrice);

    setStep(PRODUCT_REGISTRATION_STEPS.PRICE_RESULT);
  };

  const handleEditPrice = () => {
    setStep(PRODUCT_REGISTRATION_STEPS.PRICE_EDIT);
  };

  const handleUseRecommendedPrice = () => {
    const recommendedPrice = form.getValues('recommendedPrice');

    if (!recommendedPrice) {
      alert('추천 가격이 없습니다.');
      return;
    }

    form.setValue('finalPrice', recommendedPrice, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setStep(PRODUCT_REGISTRATION_STEPS.CONFIRM);
  };

  const handleCompletePriceEdit = async () => {
    const isValid = await form.trigger('finalPrice');

    if (!isValid) {
      return;
    }

    setStep(PRODUCT_REGISTRATION_STEPS.CONFIRM);
  };

  const handleRegisterProduct = async () => {
    const values = form.getValues();

    const response = await registerProduct({
      imageUrls: {
        frontImageUrl: values.frontImageUrl,
        backImageUrl: values.backImageUrl,
        sideImageUrl: values.sideImageUrl,
        defectImageUrl: values.defectImageUrl,
      },
      brand: values.brand,
      modelName: values.modelName,
      color: values.color,
      size: values.size,
      conditionGrade: values.conditionGrade,
      componentStatus: values.componentStatus,
      recommendedPrice: values.recommendedPrice ?? 0,
      baseMarketPrice: values.baseMarketPrice ?? 0,
      priceRange: values.priceRange ?? '',
      finalPrice: values.finalPrice ?? 0,
      reason: values.reason ?? '',
      description: values.description,
    });

    if (!response.success) {
      alert(response.error.message);
      return;
    }

    setStep(PRODUCT_REGISTRATION_STEPS.COMPLETE);
  };

  const handleComplete = () => {
    router.push('/');
  };

  return (
    <div className={styles.flow}>
      {step === PRODUCT_REGISTRATION_STEPS.IMAGE_UPLOAD && (
        <ImageUploadStep
          images={images}
          onImageChange={handleImageChange}
          onNext={handleAnalyzeProductImages}
        />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.PRODUCT_ANALYSIS_LOADING && (
        <ProductAnalysisLoadingStep />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.PRODUCT_ANALYSIS_RESULT && (
        <ProductAnalysisResultStep
          form={form}
          onNext={handleMoveToAdditionalInfo}
        />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.ADDITIONAL_INFO && (
        <AdditionalInfoStep
          form={form}
          onNext={handleAnalyzeRecommendedPrice}
        />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.PRICE_ANALYSIS_LOADING && (
        <PriceAnalysisLoadingStep />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.PRICE_RESULT && (
        <PriceResultStep
          form={form}
          onEditPrice={handleEditPrice}
          onUseRecommendedPrice={handleUseRecommendedPrice}
        />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.PRICE_EDIT && (
        <PriceEditStep form={form} onComplete={handleCompletePriceEdit} />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.CONFIRM && (
        <ConfirmStep form={form} onSubmit={handleRegisterProduct} />
      )}

      {step === PRODUCT_REGISTRATION_STEPS.COMPLETE && (
        <CompleteStep onComplete={handleComplete} />
      )}
    </div>
  );
}