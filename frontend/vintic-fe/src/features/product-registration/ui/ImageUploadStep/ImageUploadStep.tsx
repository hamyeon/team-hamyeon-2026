import type {
  ProductImageFiles,
  ProductImageType,
} from '@/features/product-registration/model/types';
import { PRODUCT_IMAGE_SLOTS } from '@/features/product-registration/model/constants';
import { Header } from '@/shared/ui/Header';
import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import { ImageUploadButton } from '../ImageUploadButton';
import * as styles from './ImageUploadStep.css';

const IMAGE_FILE_FIELD = {
  front: 'frontImage',
  back: 'backImage',
  side: 'sideImage',
  defect: 'defectImage',
} as const satisfies Record<ProductImageType, keyof ProductImageFiles>;

type ImageUploadStepProps = {
  images: ProductImageFiles;
  onImageChange: (type: ProductImageType, file: File) => void;
  onNext: () => void;
};

export function ImageUploadStep({
  images,
  onImageChange,
  onNext,
}: ImageUploadStepProps) {
  const canGoNext = Boolean(images.frontImage && images.backImage);

  return (
    <div className={styles.step}>
      <Header
        title="상품 등록하기"
        showBackButton
        hasBottomBorder
        fallbackHref="/"
        progress={1 / 5}
      />

      <section className={styles.content}>
        <p className={styles.stepText}>1/5</p>

        <div className={styles.titleRow}>
          <h1 className={styles.title}>상품 이미지 업로드</h1>
          <img
            src="/icons/icn_info_24px.svg"
            alt=""
            className={styles.infoIcon}
            aria-hidden="true"
          />
        </div>

        <p className={styles.description}>
          밝고 깨끗한 장소에서 촬영한 이미지를 업로드해주세요.
        </p>

        <div className={styles.imageGrid}>
          {PRODUCT_IMAGE_SLOTS.map((slot) => {
            const fileField = IMAGE_FILE_FIELD[slot.type];

            return (
              <ImageUploadButton
                key={slot.type}
                label={slot.label}
                required={slot.required}
                file={images[fileField]}
                onChange={(file) => onImageChange(slot.type, file)}
              />
            );
          })}
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