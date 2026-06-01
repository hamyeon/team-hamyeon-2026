import type { UseFormReturn } from 'react-hook-form';
import { Header } from '@/shared/ui/Header';
import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import type { ProductRegistrationFormValues } from '@/features/product-registration/model/schema';
import * as styles from './PriceEditStep.css';

type PriceEditStepProps = {
  form: UseFormReturn<ProductRegistrationFormValues>;
  onComplete: () => void;
};

function formatPrice(price?: number) {
  if (!price) {
    return '0';
  }

  return price.toLocaleString();
}

export function PriceEditStep({ form, onComplete }: PriceEditStepProps) {
  const finalPrice = form.watch('finalPrice');
  const recommendedPrice = form.watch('recommendedPrice');
  const minRecommendedPrice = form.watch('minRecommendedPrice');
  const maxRecommendedPrice = form.watch('maxRecommendedPrice');

  const minPrice = minRecommendedPrice ?? 0;
  const maxPrice = maxRecommendedPrice ?? 0;
  const currentPrice = finalPrice ?? recommendedPrice ?? minPrice;

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('finalPrice', Number(event.target.value), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const isSliderDisabled = minPrice === 0 || maxPrice === 0;

  return (
    <div className={styles.step}>
      <Header
        title="상품 등록하기"
        showBackButton
        hasBottomBorder
        fallbackHref="/"
        progress={4 / 5}
      />

      <section className={styles.content}>
        <p className={styles.stepText}>4/5</p>

        <div className={styles.titleRow}>
          <h1 className={styles.title}>판매 가격 설정</h1>
          <img
            src="/icons/icn_info_24px.svg"
            alt=""
            className={styles.infoIcon}
            aria-hidden="true"
          />
        </div>

        <p className={styles.description}>
          기준가는 유사 거래 데이터를 바탕으로
          <br />
          상품 상태를 보정하여 산출된 상품의 적정 가격이에요.
        </p>

        <div className={styles.priceEditor}>
          <p className={styles.priceText}>
            판매가: <strong className={styles.priceValue}>{formatPrice(currentPrice)}</strong>원
          </p>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1000}
            value={currentPrice}
            className={styles.slider}
            onChange={handlePriceChange}
            aria-label="판매가 조정"
            disabled={isSliderDisabled}
          />

          <div className={styles.rangeLabelRow}>
            <span>{formatPrice(minPrice)}원</span>
            <span>{formatPrice(maxPrice)}원</span>
          </div>
        </div>
      </section>

      <BottomButtonBar
        layout="single"
        action={{
          label: '수정 완료',
          variant: 'primary',
          onClick: onComplete,
        }}
      />
    </div>
  );
}