import { Header } from '@/shared/ui/Header';
import * as styles from './page.css';

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <Header title="마이페이지" showBackButton={false} hasBottomBorder />
    </main>
  );
}