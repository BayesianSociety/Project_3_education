export type PuzzleProgressEntry = {
  id: string;
  title: string;
  order: number;
  status: 'locked' | 'available' | 'complete';
};

type Props = {
  entries: PuzzleProgressEntry[];
};

const STATUS_LABEL: Record<PuzzleProgressEntry['status'], string> = {
  locked: 'Locked',
  available: 'Ready',
  complete: 'Cleared',
};

function stepClass(status: PuzzleProgressEntry['status']) {
  switch (status) {
    case 'complete':
      return 'progress-step progress-step--complete';
    case 'available':
      return 'progress-step progress-step--active';
    default:
      return 'progress-step';
  }
}

export default function PuzzleProgress({ entries }: Props) {
  return (
    <div className="progress-track" role="list" aria-label="Puzzle progression">
      {entries
        .sort((a, b) => a.order - b.order)
        .map((entry, index) => (
          <div
            key={entry.id}
            role="listitem"
            className={stepClass(entry.status)}
            aria-label={`${entry.title}: ${STATUS_LABEL[entry.status]}`}
          >
            {index + 1}
          </div>
        ))}
    </div>
  );
}
