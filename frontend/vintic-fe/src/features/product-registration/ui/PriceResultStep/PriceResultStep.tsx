'use client';

import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Header } from '@/shared/ui/Header';
import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import type { ProductRegistrationFormValues } from '@/features/product-registration/model/schema';
import * as styles from './PriceResultStep.css';

type PriceResultStepProps = {
  form: UseFormReturn<ProductRegistrationFormValues>;
  onEditPrice: () => void;
  onUseRecommendedPrice: () => void;
};

function formatPrice(price?: number) {
  if (!price) {
    return '0';
  }

  return price.toLocaleString();
}

export function PriceResultStep({
  form,
  onEditPrice,
  onUseRecommendedPrice,
}: PriceResultStepProps) {
  const [isReasonOpen, setIsReasonOpen] = useState(false);

  const recommendedPrice = form.watch('recommendedPrice');
  const minRecommendedPrice = form.watch('minRecommendedPrice');
  const maxRecommendedPrice = form.watch('maxRecommendedPrice');
  const reason = form.watch('reason');

  const handleReasonToggle = () => {
    setIsReasonOpen((prev) => !prev);
  };

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

        <div className={styles.priceSection}>
          <p className={styles.priceLabel}>기준가</p>

          <div className={styles.priceRow}>
            <strong className={styles.price}>{formatPrice(recommendedPrice)}</strong>
            <span className={styles.priceUnit}>원</span>
          </div>

          <div className={styles.rangeTextGroup}>
            <p className={styles.rangeText}>
              <strong className={styles.rangePrice}>
                {formatPrice(minRecommendedPrice)}원
              </strong>
              {'에 빠르게 판매할 수 있어요.'}
            </p>

            <p className={styles.rangeText}>
              <strong className={styles.rangePrice}>
                {formatPrice(maxRecommendedPrice)}원
              </strong>
              {'에 판매하는 것도 고려해볼 수 있어요.'}
            </p>
          </div>
        </div>

        <div className={styles.reasonSection}>
          <button
            type="button"
            className={styles.reasonButton}
            onClick={handleReasonToggle}
            aria-expanded={isReasonOpen}
          >
            가격 산정 근거 자세히 보기
            <img
              src={
                isReasonOpen
                  ? '/icons/icn_arrow_up_20px.svg'
                  : '/icons/icn_arrow_down_20px.svg'
              }
              alt=""
              className={styles.reasonArrowIcon}
              aria-hidden="true"
            />
          </button>

          {isReasonOpen && reason && (
            <p className={styles.reasonText}>{reason}</p>
          )}
        </div>
      </section>

      <BottomButtonBar
        layout="double"
        leftAction={{
          label: '가격 수정하기',
          variant: 'secondary',
          onClick: onEditPrice,
        }}
        rightAction={{
          label: '기준가로 설정하기',
          variant: 'primary',
          onClick: onUseRecommendedPrice,
        }}
      />
    </div>
  );
}