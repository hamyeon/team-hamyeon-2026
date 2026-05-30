import * as styles from './page.css';
import * as text from '@/shared/styles/text.css';
import { HomeHeader } from '@/shared/ui/HomeHeader';
import { Header } from '@/shared/ui/Header';
import { FloatingActionButton } from '@/shared/ui/FloatingActionButton';

export default function HomePage() {

  return (
    <main className={styles.page}>
      <HomeHeader />
      {/* <Header title="상품 등록하기" showBackButton hasBottomBorder /> */}
      
      <FloatingActionButton className={styles.fab}>
        상품 등록하기
      </FloatingActionButton>
    </main>
  );
}