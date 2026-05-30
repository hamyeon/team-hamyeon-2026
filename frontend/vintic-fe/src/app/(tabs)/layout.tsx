import type { ReactNode } from 'react';
import { BottomNavigation } from '@/shared/ui/BottomNavigation';
import * as styles from './layout.css';

type TabsLayoutProps = {
  children: ReactNode;
};

export default function TabsLayout({ children }: TabsLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>{children}</div>
      <BottomNavigation />
    </div>
  );
}