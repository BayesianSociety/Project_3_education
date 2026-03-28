'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import PuzzleProgress, { PuzzleProgressEntry } from './PuzzleProgress';

const PROGRESS_COOKIE = 'blockCodingProgress';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/puzzles', label: 'Puzzle Map' },
  { href: '/analytics', label: 'Analytics' },
];

type Props = {
  puzzles: PuzzleProgressEntry[];
};

type ProgressEvent = CustomEvent<{ progress: PuzzleProgressEntry[] }>;

function serializeProgress(entries: PuzzleProgressEntry[]) {
  const payload: Record<string, PuzzleProgressEntry['status']> = {};
  entries.forEach((entry) => {
    payload[entry.id] = entry.status;
  });
  return JSON.stringify(payload);
}

function readCookie(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  return document.cookie.split(';').reduce<Record<string, string>>((acc, part) => {
    const [key, ...value] = part.trim().split('=');
    if (!key) return acc;
    acc[key] = decodeURIComponent(value.join('='));
    return acc;
  }, {});
}

function loadFromLocalStorage(puzzles: PuzzleProgressEntry[]): PuzzleProgressEntry[] {
  if (typeof window === 'undefined') return puzzles;
  const stored = window.localStorage.getItem(PROGRESS_COOKIE);
  if (!stored) return puzzles;
  try {
    const parsed = JSON.parse(stored) as Record<string, PuzzleProgressEntry['status']>;
    return puzzles.map((entry, index) => ({
      ...entry,
      status: parsed[entry.id] ?? entry.status ?? (index === 0 ? 'available' : 'locked'),
    }));
  } catch (error) {
    console.warn('Failed to parse local progress', error);
    return puzzles;
  }
}

export default function TopBar({ puzzles }: Props) {
  const pathname = usePathname();
  const [progress, setProgress] = useState<PuzzleProgressEntry[]>(() => puzzles);

  useEffect(() => {
    setProgress(puzzles);
  }, [puzzles]);

  useEffect(() => {
    setProgress((prev) => loadFromLocalStorage(prev));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleProgressEvent(event: Event) {
      const custom = event as ProgressEvent;
      if (!custom.detail) return;
      setProgress(custom.detail.progress);
      const serialized = serializeProgress(custom.detail.progress);
      window.localStorage.setItem(PROGRESS_COOKIE, serialized);
      document.cookie = `${PROGRESS_COOKIE}=${encodeURIComponent(serialized)};path=/;max-age=${60 * 60 * 24 * 365}`;
    }

    window.addEventListener('puzzle-progress-updated', handleProgressEvent as EventListener);
    return () => window.removeEventListener('puzzle-progress-updated', handleProgressEvent as EventListener);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    const cookieBag = readCookie();
    if (!cookieBag[PROGRESS_COOKIE]) {
      const serialized = serializeProgress(progress);
      document.cookie = `${PROGRESS_COOKIE}=${encodeURIComponent(serialized)};path=/;max-age=${60 * 60 * 24 * 365}`;
      window.localStorage.setItem(PROGRESS_COOKIE, serialized);
    }
  }, [progress]);

  const activePath = useMemo(() => pathname ?? '/', [pathname]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backdropFilter: 'blur(12px)',
        background: 'rgba(14, 5, 24, 0.88)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="page-shell"
        style={{
          paddingTop: 18,
          paddingBottom: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" aria-label="Go to landing">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'white',
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              BLOCK CODING PUZZLES
            </span>
          </Link>
          <nav aria-label="Primary">
            <ul style={{ listStyle: 'none', display: 'flex', gap: 12, margin: 0, padding: 0 }}>
              {NAV_LINKS.map((link) => {
                const isActive = activePath === link.href || (link.href !== '/' && activePath.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        color: isActive ? 'var(--color-mint-200)' : 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <PuzzleProgress entries={progress} />
      </div>
    </header>
  );
}
