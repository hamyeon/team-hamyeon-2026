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
    return '-';
  }

  return price.toLocaleString();
}

function getPriceRangeLines(priceRange?: string) {
  if (!priceRange || priceRange === '시세 정보 없음') {
    return {
      fastSaleText: '시세 정보를 찾지 못했어요.',
      highSaleText: '직접 판매 가격을 설정해주세요.',
    };
  }

  const [minPrice, maxPrice] = priceRange.split('~').map((value) => value.trim());

  return {
    fastSaleText: `${minPrice}에 빠르게 판매할 수 있어요.`,
    highSaleText: `${maxPrice}에 판매하는 것도 고려해볼 수 있어요.`,
  };
}

export function PriceResultStep({
  form,
  onEditPrice,
  onUseRecommendedPrice,
}: PriceResultStepProps) {
  const recommendedPrice = form.watch('recommendedPrice');
  const priceRange = form.watch('priceRange');

  const { fastSaleText, highSaleText } = getPriceRangeLines(priceRange);

  return (
    <div className={styles.step}>
      <Header title="상품 등록하기" showBackButton hasBottomBorder />

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
            <p className={styles.rangeText}>{fastSaleText}</p>
            <p className={styles.rangeText}>{highSaleText}</p>
          </div>
        </div>

        <button type="button" className={styles.reasonButton}>
          가격 산정 근거 자세히 보기
          <img
            src="/icons/icn_arrow_right_16px.svg"
            alt=""
            className={styles.reasonArrowIcon}
            aria-hidden="true"
          />
        </button>
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