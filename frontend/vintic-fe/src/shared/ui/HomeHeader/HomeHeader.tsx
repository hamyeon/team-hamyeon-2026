'use client';

import * as styles from './HomeHeader.css';

type HomeHeaderProps = {
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onBagClick?: () => void;
};

export function HomeHeader({
  onSearchClick,
  onNotificationClick,
  onBagClick,
}: HomeHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>홈</h1>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="검색"
          onClick={onSearchClick}
        >
          <img
            src="/icons/icn_search_24px.svg"
            alt=""
            className={styles.icon}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="알림"
          onClick={onNotificationClick}
        >
          <img
            src="/icons/icn_bell_24px.svg"
            alt=""
            className={styles.icon}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="쇼핑백"
          onClick={onBagClick}
        >
          <img
            src="/icons/icn_bag_24px.svg"
            alt=""
            className={styles.icon}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}