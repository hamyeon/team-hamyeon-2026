import type { Metadata } from 'next';
import { pretendard } from './fonts';
import '@/shared/styles/global.css';

export const metadata: Metadata = {
  title: 'Vintic',
  description: 'AI Agent 기반 빈티지 거래 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
