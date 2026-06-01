import * as styles from './PriceAnalysisLoadingStep.css';

export function PriceAnalysisLoadingStep() {
  return (
    <div className={styles.step}>
      <div className={styles.content}>
        <div className={styles.loadingBox} />

        <p className={styles.description}>
            AI가 기준가를 분석하고 있어요
            <br />
            잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
}