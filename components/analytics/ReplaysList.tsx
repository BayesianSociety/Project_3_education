type Attempt = {
  attemptId: string;
  status: string;
  failureReason: string | null;
  endedAt: string | null;
};

type Props = {
  attempts: Attempt[];
  selected?: string | null;
  onSelect: (attemptId: string) => void;
};

export default function ReplaysList({ attempts, selected, onSelect }: Props) {
  if (!attempts.length) {
    return (
      <div className="tablet-panel">
        <p className="text-muted">No attempts logged for this puzzle.</p>
      </div>
    );
  }

  return (
    <div className="tablet-panel">
      <h3 style={{ marginTop: 0 }}>Recent Attempts</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {attempts.map((attempt) => {
          const isActive = attempt.attemptId === selected;
          return (
            <li key={attempt.attemptId}>
              <button
                type="button"
                onClick={() => onSelect(attempt.attemptId)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  borderRadius: 12,
                  border: isActive ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.15)',
                  background: isActive ? 'rgba(92, 242, 210, 0.12)' : 'rgba(255,255,255,0.02)',
                  color: 'white',
                  padding: '10px 14px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{attempt.status}</span>
                  <span style={{ fontSize: 12, opacity: 0.7 }}>{attempt.endedAt ? new Date(attempt.endedAt).toLocaleString() : 'In progress'}</span>
                </div>
                {attempt.failureReason && <p style={{ margin: '6px 0 0', fontSize: 12 }}>Reason: {attempt.failureReason}</p>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
