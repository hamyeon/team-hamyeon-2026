import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import * as styles from './BottomButton.css';

export type BottomButtonVariant = 'primary' | 'secondary';

type BottomButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: BottomButtonVariant;
  }
>;

export function BottomButton({
  children,
  variant = 'primary',
  className,
  ...props
}: BottomButtonProps) {
  return (
    <button
      className={[styles.button, styles.variant[variant], className ?? ''].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}