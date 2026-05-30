import * as styles from './page.css';
import { HomeHeader } from '@/shared/ui/HomeHeader';
import { FloatingActionButton } from '@/shared/ui/FloatingActionButton';

export default function HomePage() {

  return (
    <main className={styles.page}>
      <HomeHeader />
      
      <FloatingActionButton className={styles.fab}>
        상품 등록하기
      </FloatingActionButton>
    </main>
  );
}