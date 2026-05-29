'use client';

import { useState } from 'react';
import { SegmentedControl } from '@/shared/ui/SegmentedControl';
import { BottomButtonBar } from '@/shared/ui/BottomButtonBar';
import * as styles from './page.css';
import * as text from '@/shared/styles/text.css';

type ComponentStatus = 'all' | 'partial' | 'none';

const componentStatusOptions = [
  { label: '전체 있음', value: 'all' },
  { label: '일부 있음', value: 'partial' },
  { label: '구성품 없음', value: 'none' },
] satisfies { label: string; value: ComponentStatus }[];

export default function HomePage() {
  const [componentStatus, setComponentStatus] = useState<ComponentStatus>('all');

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <h1 className={text.title01}>Vintic</h1>
      </section>

      <SegmentedControl
        name="구성품 여부"
        options={componentStatusOptions}
        value={componentStatus}
        onChange={setComponentStatus}
        columns={3}
    />

      <BottomButtonBar
        layout="single"
        action={{
          label: '완료',
          variant: 'primary',
        }}
      />
      <BottomButtonBar
        layout="double"
        leftAction={{
          label: '가격 수정하기',
          variant: 'secondary',
        }}
        rightAction={{
          label: '기준가로 설정하기',
          variant: 'primary',
        }}
      />
    </main>
  );
}