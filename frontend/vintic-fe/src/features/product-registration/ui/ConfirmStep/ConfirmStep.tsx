import type { UseFormReturn } from 'react-hook-form';
import { Header } from '@/shared/ui/Header';
import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import type { ProductRegistrationFormValues } from '@/features/product-registration/model/schema';
import * as styles from './ConfirmStep.css';

type ConfirmStepProps = {
  form: UseFormReturn<ProductRegistrationFormValues>;
  onSubmit: () => void;
};

function formatPrice(price?: number) {
  if (!price) {
    return '-';
  }

  return `${price.toLocaleString()}원`;
}

export function ConfirmStep({ form, onSubmit }: ConfirmStepProps) {
  const values = form.watch();

  return (
    <div className={styles.step}>
      <Header
        title="상품 등록하기"
        showBackButton
        hasBottomBorder
        fallbackHref="/"
        progress={5 / 5}
      />

      <section className={styles.content}>
        <p className={styles.stepText}>5/5</p>

        <div className={styles.titleRow}>
          <h1 className={styles.title}>상품 정보 확인</h1>
        </div>

        <p className={styles.description}>
          입력한 정보가 맞는지 마지막으로 확인해주세요.
        </p>

        <div className={styles.summary}>
          <div className={styles.imageRow}>
            {values.frontImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={values.frontImageUrl} alt="상품 앞면" className={styles.productImage} />
            )}
            {values.backImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={values.backImageUrl} alt="상품 뒷면" className={styles.productImage} />
            )}
            {values.sideImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={values.sideImageUrl} alt="상품 측면" className={styles.productImage} />
            )}
            {values.defectImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={values.defectImageUrl} alt="상품 하자" className={styles.productImage} />
            )}
          </div>

          <dl className={styles.infoList}>
            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>브랜드</dt>
              <dd className={styles.infoDescription}>{values.brand}</dd>
            </div>

            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>모델명</dt>
              <dd className={styles.infoDescription}>{values.modelName}</dd>
            </div>

            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>컬러</dt>
              <dd className={styles.infoDescription}>{values.color}</dd>
            </div>

            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>사이즈</dt>
              <dd className={styles.infoDescription}>{values.size}</dd>
            </div>

            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>판매가</dt>
              <dd className={styles.infoDescription}>{formatPrice(values.finalPrice)}</dd>
            </div>

            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>상태 설명</dt>
              <dd className={styles.infoDescription}>{values.conditionDescription}</dd>
            </div>

            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>구성품 여부</dt>
              <dd className={styles.infoDescription}>{values.componentStatus}</dd>
            </div>

            <div className={styles.infoItem}>
              <dt className={styles.infoTerm}>판매자 설명</dt>
              <dd className={styles.infoDescription}>{values.description || '-'}</dd>
            </div>
          </dl>
        </div>
      </section>

      <BottomButtonBar
        layout="single"
        action={{
          label: '상품 등록하기',
          variant: 'primary',
          onClick: onSubmit,
        }}
      />
    </div>
  );
}