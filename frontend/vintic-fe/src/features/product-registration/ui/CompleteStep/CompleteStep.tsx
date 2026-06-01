import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import * as styles from './CompleteStep.css';

type CompleteStepProps = {
  onComplete: () => void;
};

export function CompleteStep({ onComplete }: CompleteStepProps) {
  return (
    <div className={styles.step}>
      <section className={styles.content}>
        <div className={styles.imagePlaceholder} />

        <h1 className={styles.title}>상품이 성공적으로 등록되었어요!</h1>
        <p className={styles.description}>
          내 상품 관리 페이지에서
          <br />
          경매 시작 시간을 설정할 수 있어요.
        </p>
      </section>

      <BottomButtonBar
        layout="single"
        action={{
          label: '완료',
          variant: 'primary',
          onClick: onComplete,
        }}
      />
    </div>
  );
}