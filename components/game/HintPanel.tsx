'use client';

type Props = {
  status: 'idle' | 'success' | 'failure';
  hint?: string;
};

export default function HintPanel({ status, hint }: Props) {
  if (status === 'idle') {
    return (
      <div
        style={{
          borderRadius: 20,
          border: '1px dashed rgba(255,255,255,0.2)',
          padding: 16,
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        Assemble blocks and press Play to see Pixel Pup move. If something goes wrong, you will see an Oops! hint here.
      </div>
    );
  }

  const isSuccess = status === 'success';
  return (
    <div
      role="status"
      style={{
        borderRadius: 20,
        padding: 16,
        background: isSuccess ? 'rgba(92, 242, 210, 0.15)' : 'rgba(255, 132, 209, 0.15)',
        border: isSuccess ? '1px solid rgba(92, 242, 210, 0.5)' : '1px solid rgba(255, 132, 209, 0.5)',
        color: 'white',
      }}
    >
      {isSuccess ? (
        <>
          <strong>Great run!</strong>
          <p style={{ margin: '4px 0 0' }}>Pixel Pup reached the treat. Queue up the next puzzle.</p>
        </>
      ) : (
        <>
          <strong>Oops!</strong>
          <p style={{ margin: '4px 0 0' }}>{hint ?? 'Something blocked the run. Adjust your blocks and try again.'}</p>
        </>
      )}
    </div>
  );
}
