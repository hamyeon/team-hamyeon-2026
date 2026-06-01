import * as styles from './ProductAnalysisLoadingStep.css';

export function ProductAnalysisLoadingStep() {
  return (
    <div className={styles.step}>
      <div className={styles.content}>
        <div className={styles.loadingBox} />

        <p className={styles.description}>
          AI가 상품을 분석하고 있어요
          <br />
          잠시만 기다려 주세요
        </p>
      </div>
    </div>
  );
}