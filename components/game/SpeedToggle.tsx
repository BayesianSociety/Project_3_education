'use client';

type SpeedValue = 'slow' | 'normal' | 'fast';

const SPEED_LABEL: Record<SpeedValue, string> = {
  slow: 'Slow',
  normal: 'Normal',
  fast: 'Fast',
};

type Props = {
  value: SpeedValue;
  onChange: (value: SpeedValue) => void;
};

export default function SpeedToggle({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Playback speed" style={{ display: 'flex', gap: 8 }}>
      {(Object.keys(SPEED_LABEL) as SpeedValue[]).map((speed) => {
        const active = value === speed;
        return (
          <button
            key={speed}
            type="button"
            onClick={() => onChange(speed)}
            aria-pressed={active}
            style={{
              borderRadius: 999,
              border: active ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
              background: active ? 'rgba(92, 242, 210, 0.15)' : 'transparent',
              color: 'white',
              padding: '6px 12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {SPEED_LABEL[speed]}
          </button>
        );
      })}
    </div>
  );
}

export type { SpeedValue };
