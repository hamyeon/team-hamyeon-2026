'use client';

import * as styles from './SegmentedControl.css';

export type SegmentedControlOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlColumns = 2 | 3 | 4;

type SegmentedControlProps<T extends string> = {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: SegmentedControlColumns;
  name?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  columns = 3,
  name,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={[styles.group, styles.columns[columns]].join(' ')}
      role="radiogroup"
      aria-label={name}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            className={[styles.option, isSelected ? styles.selected : styles.unselected].join(' ')}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}