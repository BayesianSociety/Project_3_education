'use client';

import { useEffect, useMemo, useState } from 'react';
import ReplaysList from './ReplaysList';
import EventStream from './EventStream';
import MovementReplay from './MovementReplay';

type PuzzleMeta = {
  id: string;
  title: string;
  grid: {
    width: number;
    height: number;
    goal: { x: number; y: number };
    hazard?: { x: number; y: number; type: string };
  };
};

type Summary = {
  totalUsers: number;
  totalSessions: number;
  totalAttempts: number;
  successRate: number;
  averageCommands: number;
  eventsByType: { type: string; count: number }[];
  puzzleLeaderboard: { id: string; title: string; attempts: number; clears: number }[];
};

type SummaryResponse = {
  ok: boolean;
  summary: Summary;
  error?: string;
};

type PuzzleAnalytics = {
  puzzleId: string;
  title: string;
  attempts: number;
  clears: number;
  averageDurationMs: number;
  failureReasons: { reason: string; count: number }[];
  recentAttempts: {
    attemptId: string;
    status: string;
    failureReason: string | null;
    endedAt: string | null;
  }[];
};

type PuzzleAnalyticsResponse = {
  ok: boolean;
  detail: PuzzleAnalytics;
  error?: string;
};

type ReplayPayload = {
  attempt: {
    id: string;
    puzzleId: string;
    sessionId: string;
    status: string;
    failureReason: string | null;
  };
  events: { type: string; detail: unknown; createdAt: string }[];
  movements: { stepIndex: number; x: number; y: number; action: string; timestamp: string }[];
};

type Props = {
  puzzleMetas: PuzzleMeta[];
};

export default function Dashboard({ puzzleMetas }: Props) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [selectedPuzzle, setSelectedPuzzle] = useState<string | null>(null);
  const [puzzleAnalytics, setPuzzleAnalytics] = useState<PuzzleAnalytics | null>(null);
  const [puzzleError, setPuzzleError] = useState<string | null>(null);
  const [selectedAttempt, setSelectedAttempt] = useState<string | null>(null);
  const [replay, setReplay] = useState<ReplayPayload | null>(null);
  const [replayError, setReplayError] = useState<string | null>(null);

  useEffect(() => {
    fetchJSON<SummaryResponse>('/api/analytics/summary')
      .then((payload) => {
        if (!payload.ok) throw new Error(payload.error ?? 'Summary fetch failed');
        setSummary(payload.summary);
        setSummaryError(null);
        if (!selectedPuzzle && payload.summary.puzzleLeaderboard.length) {
          setSelectedPuzzle(payload.summary.puzzleLeaderboard[0].id);
        }
      })
      .catch((error) => setSummaryError(error.message));
  }, []);

  useEffect(() => {
    if (!selectedPuzzle) return;
    setPuzzleAnalytics(null);
    setPuzzleError(null);
    fetchJSON<PuzzleAnalyticsResponse>(`/api/analytics/puzzle/${selectedPuzzle}`)
      .then((payload) => {
        if (!payload.ok) throw new Error(payload.error ?? 'Puzzle analytics fetch failed');
        setPuzzleAnalytics(payload.detail);
        setPuzzleError(null);
        if (payload.detail.recentAttempts.length) {
          setSelectedAttempt(payload.detail.recentAttempts[0].attemptId);
        } else {
          setSelectedAttempt(null);
          setReplay(null);
        }
      })
      .catch((error) => setPuzzleError(error.message));
  }, [selectedPuzzle]);

  useEffect(() => {
    if (!selectedAttempt) {
      setReplay(null);
      return;
    }
    setReplayError(null);
    fetchJSON<{ ok: boolean; replay: ReplayPayload; error?: string }>(`/api/analytics/replay/${selectedAttempt}`)
      .then((payload) => {
        if (!payload.ok) throw new Error(payload.error ?? 'Replay fetch failed');
        setReplay(payload.replay);
        setReplayError(null);
      })
      .catch((error) => setReplayError(error.message));
  }, [selectedAttempt]);

  const selectedPuzzleMeta = useMemo(() => puzzleMetas.find((meta) => meta.id === selectedPuzzle) ?? puzzleMetas[0], [puzzleMetas, selectedPuzzle]);

  return (
    <section style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <SummaryCards summary={summary} error={summaryError} />
      <Leaderboard summary={summary} />
      <div className="tablet-panel">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Puzzle Detail</h3>
          <select
            value={selectedPuzzle ?? ''}
            onChange={(event) => setSelectedPuzzle(event.target.value)}
            style={{ borderRadius: 999, padding: '6px 16px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white' }}
          >
            {puzzleMetas.map((meta) => (
              <option key={meta.id} value={meta.id} style={{ color: 'black' }}>
                {meta.title}
              </option>
            ))}
          </select>
        </div>
        {puzzleError && <p className="text-muted">Failed to load puzzle analytics: {puzzleError}</p>}
        {puzzleAnalytics ? <PuzzleDetail analytics={puzzleAnalytics} /> : <p className="text-muted">Loading puzzle analytics…</p>}
      </div>
      {puzzleAnalytics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) minmax(240px, 1fr)', gap: 24 }}>
          <div style={{ gridColumn: '1 / span 2' }}>
            <ReplaysList attempts={puzzleAnalytics.recentAttempts} selected={selectedAttempt} onSelect={setSelectedAttempt} />
          </div>
          {replayError && (
            <div className="tablet-panel" style={{ gridColumn: '1 / span 2' }}>
              Failed to load replay: {replayError}
            </div>
          )}
          {!replay && !replayError && (
            <div className="tablet-panel" style={{ gridColumn: '1 / span 2' }}>
              Select an attempt to view the movement replay and event stream.
            </div>
          )}
          {replay && (
            <>
              <MovementReplay
                movements={replay.movements}
                grid={{ width: selectedPuzzleMeta?.grid.width ?? 6, height: selectedPuzzleMeta?.grid.height ?? 3 }}
                goal={selectedPuzzleMeta?.grid.goal ?? { x: 0, y: 0 }}
                hazard={selectedPuzzleMeta?.grid.hazard}
              />
              <EventStream events={replay.events} />
            </>
          )}
        </div>
      )}
    </section>
  );
}

function SummaryCards({ summary, error }: { summary: Summary | null; error: string | null }) {
  if (error) {
    return <div className="tablet-panel">Failed to load summary: {error}</div>;
  }
  if (!summary) {
    return <div className="tablet-panel">Loading summary…</div>;
  }
  const cards = [
    { label: 'Players', value: summary.totalUsers },
    { label: 'Sessions', value: summary.totalSessions },
    { label: 'Attempts', value: summary.totalAttempts },
    { label: 'Success rate', value: `${Math.round(summary.successRate * 100)}%` },
    { label: 'Avg commands', value: summary.averageCommands.toFixed(1) },
  ];
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <article key={card.label} className="card">
          <h3 style={{ marginTop: 0 }}>{card.label}</h3>
          <p style={{ fontSize: 24, fontWeight: 700 }}>{card.value}</p>
        </article>
      ))}
      <article className="card">
        <h3 style={{ marginTop: 0 }}>Events by Type</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {summary.eventsByType.map((event) => (
            <li key={event.type} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{event.type}</span>
              <span>{event.count}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function Leaderboard({ summary }: { summary: Summary | null }) {
  if (!summary) return null;
  return (
    <div className="tablet-panel">
      <h3 style={{ marginTop: 0 }}>Puzzle Leaderboard</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>Title</th>
            <th>Attempts</th>
            <th>Clears</th>
          </tr>
        </thead>
        <tbody>
          {summary.puzzleLeaderboard.map((row) => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>{row.attempts}</td>
              <td>{row.clears}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PuzzleDetail({ analytics }: { analytics: PuzzleAnalytics }) {
  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', marginTop: 16 }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16 }}>
        <h4 style={{ marginTop: 0 }}>Attempts</h4>
        <p style={{ fontSize: 32, margin: 0 }}>{analytics.attempts}</p>
        <p className="text-muted">Clears: {analytics.clears}</p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16 }}>
        <h4 style={{ marginTop: 0 }}>Average Duration</h4>
        <p style={{ fontSize: 32, margin: 0 }}>{Math.round(analytics.averageDurationMs)} ms</p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16 }}>
        <h4 style={{ marginTop: 0 }}>Failures</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {analytics.failureReasons.map((reason) => (
            <li key={reason.reason}>
              {reason.reason}: {reason.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${response.status}`);
  }
  return response.json();
}
