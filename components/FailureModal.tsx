'use client';

type FailureModalProps = {
  open: boolean;
  onClose: () => void;
  reason?: string;
  hint?: string;
};

export default function FailureModal({ open, onClose, reason, hint }: FailureModalProps) {
  if (!open) return null;
  return (
    <div className="failure-modal" role="alertdialog" aria-modal="true" aria-labelledby="failure-title">
      <div className="failure-sheet">
        <h3 id="failure-title">Oops!</h3>
        <p className="failure-reason">{reason ? reason.replaceAll('_', ' ') : 'Run failed'}</p>
        <p className="failure-hint">{hint ?? 'Check your block order and sensor conditions, then try again.'}</p>
        <button type="button" className="button-primary" onClick={onClose}>
          Try Again
        </button>
      </div>
    </div>
  );
}
