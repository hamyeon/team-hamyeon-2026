import type { InputHTMLAttributes } from 'react';
import * as styles from './Input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
};

export function Input({ isError = false, className, ...props }: InputProps) {
  return (
    <input
      className={[styles.input, isError ? styles.error : '', className ?? ''].join(' ')}
      aria-invalid={isError}
      {...props}
    />
  );
}