type Props = {
  hasDisconnected: boolean;
  blockCount: number;
  maxBlocks: number;
};

export default function CodeWarning({ hasDisconnected, blockCount, maxBlocks }: Props) {
  if (!hasDisconnected && blockCount <= maxBlocks) return null;
  const overLimit = blockCount > maxBlocks;
  const message = overLimit
    ? `Too many blocks (${blockCount}/${maxBlocks}). Remove a few commands.`
    : 'Blocks that are not connected to On Start will not run.';

  return (
    <div
      role="alert"
      style={{
        marginTop: 12,
        padding: '12px 16px',
        borderRadius: 16,
        background: 'rgba(255, 161, 88, 0.18)',
        border: '1px solid rgba(255, 161, 88, 0.7)',
        color: 'white',
        fontSize: 14,
      }}
    >
      <strong style={{ display: 'block', marginBottom: 4 }}>Heads up</strong>
      <span>{message}</span>
    </div>
  );
}
