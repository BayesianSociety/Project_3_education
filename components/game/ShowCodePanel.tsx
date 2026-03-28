'use client';

type Props = {
  code: string;
  open: boolean;
  onClose: () => void;
};

export default function ShowCodePanel({ code, open, onClose }: Props) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Program text"
      style={{
        position: 'absolute',
        top: 24,
        right: 24,
        width: 360,
        maxWidth: '80vw',
        background: 'rgba(10, 9, 30, 0.95)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 20,
        padding: 20,
        color: 'white',
        boxShadow: 'var(--shadow-soft)',
        zIndex: 30,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <strong>Show Code</strong>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: 18,
            cursor: 'pointer',
          }}
          aria-label="Close code preview"
        >
          ×
        </button>
      </header>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: 13,
          lineHeight: 1.5,
          maxHeight: 320,
          overflowY: 'auto',
          margin: 0,
        }}
      >
        {code || '// No commands yet'}
      </pre>
    </div>
  );
}
