import { Controller, type UseFormReturn } from 'react-hook-form';
import { Header } from '@/shared/ui/Header';
import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { Textarea } from '@/shared/ui/Textarea';
import { COMPONENT_STATUS_OPTIONS } from '@/features/product-registration/model/constants';
import type { ProductRegistrationFormValues } from '@/features/product-registration/model/schema';
import * as styles from './AdditionalInfoStep.css';

type AdditionalInfoStepProps = {
  form: UseFormReturn<ProductRegistrationFormValues>;
  onNext: () => void;
};

export function AdditionalInfoStep({ form, onNext }: AdditionalInfoStepProps) {
  return (
    <div className={styles.step}>
      <Header
        title="상품 등록하기"
        showBackButton
        hasBottomBorder
        fallbackHref="/"
        progress={3 / 5}
      />

      <section className={styles.content}>
        <p className={styles.stepText}>3/5</p>

        <div className={styles.titleRow}>
          <h1 className={styles.title}>추가 정보 입력</h1>
        </div>

        <p className={styles.description}>
          추가적인 정보가 있다면 입력해주세요.
          <br />
          일부 구성품이 없는 경우 설명을 함께 적어주시면 좋아요.
        </p>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>구성품 여부</label>

            <Controller
              control={form.control}
              name="componentStatus"
              render={({ field }) => (
                <SegmentedControl
                  name="구성품 여부"
                  options={COMPONENT_STATUS_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  columns={3}
                />
              )}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>판매자 설명</label>
            <Textarea
              placeholder="상품에 대한 추가 정보가 있다면 입력해주세요."
              {...form.register('description')}
            />
          </div>
        </div>
      </section>

      <BottomButtonBar
        layout="single"
        action={{
          label: 'AI 기준가 분석하기',
          variant: 'primary',
          onClick: onNext,
        }}
      />
    </div>
  );
}