import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pick n Click',
  description: '고르고 클릭하여 골라 담는 쇼핑몰',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
