import * as styles from './page.css';
import { Header } from '@/shared/ui/Header';

export default function HomePage() {

  return (
    <main className={styles.page}>
      <Header title="상품 등록하기" showBackButton hasBottomBorder />
    </main>
  );
}