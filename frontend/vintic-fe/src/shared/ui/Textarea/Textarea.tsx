import type { TextareaHTMLAttributes } from 'react';
import * as styles from './Textarea.css';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isError?: boolean;
};

export function Textarea({ isError = false, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={[styles.textarea, isError ? styles.error : '', className ?? ''].join(' ')}
      aria-invalid={isError}
      {...props}
    />
  );
}