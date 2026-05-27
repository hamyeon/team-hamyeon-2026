import * as styles from './page.css';
import * as text from '@/shared/styles/text.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={`${styles.title} ${text.title01}`}>Vintic</h1>
    </main>
  );
}
