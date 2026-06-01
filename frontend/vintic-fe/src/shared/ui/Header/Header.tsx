'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import * as styles from './Header.css';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  hasBottomBorder?: boolean;
  rightSlot?: ReactNode;
  fallbackHref?: string;
  onBackClick?: () => void;
  progress?: number;
};

function clampProgress(progress: number) {
  if (progress < 0) {
    return 0;
  }

  if (progress > 1) {
    return 1;
  }

  return progress;
}

export function Header({
  title,
  showBackButton = true,
  hasBottomBorder = true,
  rightSlot,
  fallbackHref,
  onBackClick,
  progress,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  const hasProgress = typeof progress === 'number';
  const progressWidth = hasProgress ? `${clampProgress(progress) * 100}%` : undefined;

  return (
    <header className={styles.wrapper}>
      <div
        className={[
          styles.header,
          hasBottomBorder && !hasProgress ? styles.border : '',
        ].join(' ')}
      >
        <div className={styles.leftArea}>
          {showBackButton && (
            <button
              type="button"
              className={styles.backButton}
              aria-label="이전 화면으로 이동"
              onClick={handleBackClick}
            >
              <img
                src="/icons/icn_arrow_left_36px.svg"
                alt=""
                className={styles.backIcon}
                aria-hidden="true"
              />
            </button>
          )}
        </div>

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.rightArea}>{rightSlot}</div>
      </div>

      {hasProgress && (
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressBar} style={{ width: progressWidth }} />
        </div>
      )}
    </header>
  );
}