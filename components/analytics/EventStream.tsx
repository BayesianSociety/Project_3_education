type EventItem = {
  type: string;
  detail: unknown;
  createdAt: string;
};

type Props = {
  events: EventItem[];
};

export default function EventStream({ events }: Props) {
  if (!events.length) {
    return (
      <div className="tablet-panel">
        <p className="text-muted">No events recorded for this attempt yet.</p>
      </div>
    );
  }

  return (
    <div className="tablet-panel" aria-live="polite">
      <h3 style={{ marginTop: 0 }}>Event Stream</h3>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {events.map((event, index) => (
          <li
            key={`${event.type}-${index}`}
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              padding: '8px 12px',
              color: 'white',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7 }}>{new Date(event.createdAt).toLocaleTimeString()}</div>
            <div style={{ fontWeight: 600 }}>{event.type}</div>
            {event.detail && (
              <pre
                style={{
                  fontSize: 12,
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {JSON.stringify(event.detail, null, 2)}
              </pre>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
