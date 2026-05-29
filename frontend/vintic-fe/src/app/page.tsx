import * as styles from './page.css';
import * as text from '@/shared/styles/text.css';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { FloatingActionButton } from '@/shared/ui/FloatingActionButton';

export default function HomePage() {

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <h1 className={text.title01}>Vintic</h1>
      </section>

      <Input placeholder="비어있는 텍스트필드입니다" defaultValue="Jordan 1 Lost and Found" />
      <Textarea placeholder="상품에 대한 추가 정보가 있다면 입력해주세요." />
      
      <FloatingActionButton className={styles.fab}>
        상품 등록하기
      </FloatingActionButton>
    </main>
  );
}