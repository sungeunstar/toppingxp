import type { Metadata } from 'next';
import './globals.css';
import DragHandle from '@/components/DragHandle';

export const metadata: Metadata = {
  title: 'ToppingXP',
  description: 'ToppingXP - Widget and Web App',
  manifest: '/manifest.json',
  themeColor: '#000000'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <DragHandle />
        {children}
      </body>
    </html>
  );
}
