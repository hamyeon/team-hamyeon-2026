import type { Metadata } from 'next';
import { pretendard } from './fonts';
import '@/shared/styles/global.css';
import * as styles from './layout.css';

export const metadata: Metadata = {
  title: 'Vintic',
  description: 'AI 기반 빈티지 상품 등록 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <div className={styles.app}>{children}</div>
      </body>
    </html>
  );
}