'use client';

import { useEffect, useRef } from 'react';

type MovementPoint = {
  stepIndex: number;
  x: number;
  y: number;
  action: string;
};

type Props = {
  movements: MovementPoint[];
  grid: { width: number; height: number };
  goal: { x: number; y: number };
  hazard?: { x: number; y: number };
};

export default function MovementReplay({ movements, grid, goal, hazard }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    drawGrid(ctx, width, height, grid);
    highlightCell(ctx, goal, width, height, grid, 'rgba(92, 242, 210, 0.4)');
    if (hazard) {
      highlightCell(ctx, hazard, width, height, grid, 'rgba(255, 132, 209, 0.4)');
    }
    if (movements.length) {
      ctx.beginPath();
      movements.forEach((move, index) => {
        const { px, py } = project(move, width, height, grid);
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = '#f154c0';
      ctx.lineWidth = 3;
      ctx.stroke();
      movements.forEach((move) => {
        const { px, py } = project(move, width, height, grid);
        ctx.fillStyle = '#f154c0';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }, [movements, grid, goal, hazard]);

  return (
    <div className="tablet-panel">
      <h3 style={{ marginTop: 0 }}>Movement Replay</h3>
      <p className="text-muted" style={{ marginTop: 0 }}>
        The pink trail visualizes stored movement coordinates coming from telemetry data.
      </p>
      <canvas
        ref={canvasRef}
        width={360}
        height={220}
        style={{ width: '100%', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}
      />
    </div>
  );
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, grid: { width: number; height: number }) {
  const cellWidth = width / grid.width;
  const cellHeight = height / grid.height;
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  for (let x = 0; x <= grid.width; x += 1) {
    ctx.beginPath();
    ctx.moveTo(x * cellWidth, 0);
    ctx.lineTo(x * cellWidth, height);
    ctx.stroke();
  }
  for (let y = 0; y <= grid.height; y += 1) {
    ctx.beginPath();
    ctx.moveTo(0, y * cellHeight);
    ctx.lineTo(width, y * cellHeight);
    ctx.stroke();
  }
}

function highlightCell(
  ctx: CanvasRenderingContext2D,
  point: { x: number; y: number },
  width: number,
  height: number,
  grid: { width: number; height: number },
  color: string
) {
  const cellWidth = width / grid.width;
  const cellHeight = height / grid.height;
  ctx.fillStyle = color;
  ctx.fillRect(point.x * cellWidth, height - (point.y + 1) * cellHeight, cellWidth, cellHeight);
}

function project(point: { x: number; y: number }, width: number, height: number, grid: { width: number; height: number }) {
  const cellWidth = width / grid.width;
  const cellHeight = height / grid.height;
  return {
    px: point.x * cellWidth + cellWidth / 2,
    py: height - (point.y * cellHeight + cellHeight / 2),
  };
}
