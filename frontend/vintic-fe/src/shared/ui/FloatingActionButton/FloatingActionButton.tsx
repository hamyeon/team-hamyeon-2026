import type { ButtonHTMLAttributes, ReactNode } from 'react';
import * as styles from './FloatingActionButton.css';

type FloatingActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  children: ReactNode;
};

export function FloatingActionButton({
  icon = <img src="/icons/icn_add_20px.svg" alt="" className={styles.iconImage} />,
  children,
  className,
  ...props
}: FloatingActionButtonProps) {
  return (
    <button
      type="button"
      className={[styles.button, className ?? ''].join(' ')}
      {...props}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.label}>{children}</span>
    </button>
  );
}