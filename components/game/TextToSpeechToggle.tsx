'use client';

type Props = {
  enabled: boolean;
  onToggle: (next: boolean) => void;
};

export default function TextToSpeechToggle({ enabled, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!enabled)}
      aria-pressed={enabled}
      style={{
        borderRadius: 999,
        border: enabled ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
        background: enabled ? 'rgba(92, 242, 210, 0.2)' : 'transparent',
        color: 'white',
        padding: '8px 16px',
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {enabled ? 'Narration: On' : 'Narration: Off'}
    </button>
  );
}
