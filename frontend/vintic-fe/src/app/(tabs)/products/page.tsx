import { Header } from '@/shared/ui/Header';
import * as styles from './page.css';

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <Header title="상품 찾기" showBackButton={false} hasBottomBorder />
    </main>
  );
}