'use client';

import type { ReactNode } from 'react';
import SpeedToggle, { type SpeedValue } from './SpeedToggle';

type Props = {
  isPlaying: boolean;
  onPlay: () => void;
  onReset: () => void;
  disablePlay?: boolean;
  speed: SpeedValue;
  onSpeedChange: (value: SpeedValue) => void;
  onToggleCode: () => void;
  showCode: boolean;
  auxiliary?: ReactNode;
};

export default function RunControls({
  isPlaying,
  onPlay,
  onReset,
  disablePlay,
  speed,
  onSpeedChange,
  onToggleCode,
  showCode,
  auxiliary,
}: Props) {
  return (
    <section
      aria-label="Run controls"
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap',
        background: 'rgba(18, 6, 32, 0.8)',
        padding: 16,
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type={isPlaying ? 'button' : 'submit'}
          onClick={onPlay}
          disabled={disablePlay}
          style={{
            border: 'none',
            borderRadius: 24,
            padding: '10px 22px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            background: disablePlay ? 'rgba(255,255,255,0.2)' : '#ffa158',
            color: disablePlay ? 'rgba(0,0,0,0.4)' : '#1b1024',
            cursor: disablePlay ? 'not-allowed' : 'pointer',
          }}
        >
          {isPlaying ? 'Running…' : 'Play'}
        </button>
        <button
          type="button"
          onClick={onReset}
          style={{
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'transparent',
            color: 'white',
            padding: '10px 22px',
            fontWeight: 600,
          }}
        >
          Reset
        </button>
      </div>
      <SpeedToggle value={speed} onChange={onSpeedChange} />
      <button
        type="button"
        onClick={onToggleCode}
        style={{
          borderRadius: 999,
          border: showCode ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
          background: showCode ? 'rgba(92, 242, 210, 0.15)' : 'transparent',
          color: 'white',
          padding: '8px 16px',
          fontWeight: 600,
        }}
        aria-pressed={showCode}
      >
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>
      {auxiliary}
    </section>
  );
}
