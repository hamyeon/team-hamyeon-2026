'use client';

import { useWatch, type UseFormReturn } from 'react-hook-form';
import { Header } from '@/shared/ui/Header';
import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import type { ProductRegistrationFormValues } from '@/features/product-registration/model/schema';
import * as styles from './ProductAnalysisResultStep.css';

type ProductAnalysisResultStepProps = {
  form: UseFormReturn<ProductRegistrationFormValues>;
  onNext: () => void;
};

export function ProductAnalysisResultStep({
  form,
  onNext,
}: ProductAnalysisResultStepProps) {
  const [brand, modelName, color, size, conditionDescription] = useWatch({
    control: form.control,
    name: ['brand', 'modelName', 'color', 'size', 'conditionDescription'],
  });

  const canGoNext =
    Boolean(brand?.trim()) &&
    Boolean(modelName?.trim()) &&
    Boolean(color?.trim()) &&
    Number(size) > 0 &&
    Boolean(conditionDescription?.trim());

  return (
    <div className={styles.step}>
      <Header title="상품 등록하기" showBackButton hasBottomBorder />

      <section className={styles.content}>
        <p className={styles.stepText}>2/5</p>

        <div className={styles.titleRow}>
          <h1 className={styles.title}>AI 상품 분석</h1>
          <img
            src="/icons/icn_info_24px.svg"
            alt=""
            className={styles.infoIcon}
            aria-hidden="true"
          />
        </div>

        <p className={styles.description}>
          업로드한 이미지를 바탕으로 AI가 상품을 분석했어요.
          <br />
          잘못된 정보가 있다면 알맞게 수정해주세요.
        </p>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>브랜드</label>
            <Input placeholder="브랜드를 입력해주세요." {...form.register('brand')} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>모델명</label>
            <Input placeholder="모델명을 입력해주세요." {...form.register('modelName')} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>컬러</label>
            <Input placeholder="컬러를 입력해주세요." {...form.register('color')} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>사이즈</label>
            <Input
              type="number"
              placeholder="사이즈를 입력해주세요."
              {...form.register('size', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>상태 설명</label>
            <Textarea
              placeholder="상품 상태를 입력해주세요."
              {...form.register('conditionDescription')}
            />
          </div>
        </div>
      </section>

      <BottomButtonBar
        layout="single"
        action={{
          label: '다음',
          variant: 'primary',
          disabled: !canGoNext,
          onClick: onNext,
        }}
      />
    </div>
  );
}