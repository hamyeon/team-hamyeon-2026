import Link from 'next/link';
import * as styles from './page.css';
import { HomeHeader } from '@/shared/ui/HomeHeader';
import { FloatingActionButton } from '@/shared/ui/FloatingActionButton';

export default function HomePage() {

  return (
    <main className={styles.page}>
      <HomeHeader />
      
      <Link href="/sell" className={styles.fabLink} alt-label="상품 등록하기 페이지로 이동">
        <FloatingActionButton>
        상품 등록하기
       </FloatingActionButton>
      </Link>
    </main>
  );
}