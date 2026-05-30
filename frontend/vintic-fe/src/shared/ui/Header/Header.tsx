'use client';

import type { ReactNode } from 'react';
import * as styles from './Header.css';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  hasBottomBorder?: boolean;
  rightSlot?: ReactNode;
  onBackClick?: () => void;
};

export function Header({
  title,
  showBackButton = true,
  hasBottomBorder = true,
  rightSlot,
  onBackClick,
}: HeaderProps) {
  return (
    <header className={[styles.header, hasBottomBorder ? styles.border : ''].join(' ')}>
      <div className={styles.leftArea}>
        {showBackButton && (
          <button
            type="button"
            className={styles.backButton}
            aria-label="이전 화면으로 이동"
            onClick={onBackClick}
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
    </header>
  );
}