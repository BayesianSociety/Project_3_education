import type { Metadata } from 'next';
import '../styles/theme.css';

export const metadata: Metadata = {
  title: 'Block Coding Puzzles',
  description:
    'Progress through three luminous coding puzzles, craft visual programs, and watch telemetry-backed animations come alive.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-root">
        <div className="app-background" aria-hidden />
        <main className="app-shell">{children}</main>
      </body>
    </html>
  );
}
