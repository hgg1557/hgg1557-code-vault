export type Brick = { x: number; y: number; width: number; height: number; alive: boolean };
export type BreakoutState = { width: number; height: number; paddleX: number; paddleWidth: number; ball: { x: number; y: number; vx: number; vy: number; r: number }; bricks: Brick[]; score: number; lives: number };

export function createBreakout(cols = 8, rows = 5): BreakoutState {
  const width = 640, height = 480, gap = 6, margin = 30, brickWidth = (width - margin * 2 - gap * (cols - 1)) / cols;
  const bricks = Array.from({ length: rows * cols }, (_, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    return { x: margin + col * (brickWidth + gap), y: 40 + row * 24, width: brickWidth, height: 18, alive: true };
  });
  return { width, height, paddleX: width / 2, paddleWidth: 90, ball: { x: width / 2, y: height - 80, vx: 4, vy: -4, r: 7 }, bricks, score: 0, lives: 3 };
}

export function movePaddle(state: BreakoutState, x: number): BreakoutState {
  return { ...state, paddleX: Math.max(state.paddleWidth / 2, Math.min(state.width - state.paddleWidth / 2, x)) };
}

export function step(state: BreakoutState): BreakoutState {
  let { x, y, vx, vy, r } = state.ball;
  x += vx; y += vy;
  if (x - r <= 0 || x + r >= state.width) vx *= -1;
  if (y - r <= 0) vy *= -1;
  const paddleY = state.height - 30;
  if (vy > 0 && y + r >= paddleY && y <= paddleY + 12 && x >= state.paddleX - state.paddleWidth / 2 && x <= state.paddleX + state.paddleWidth / 2) vy *= -1;
  let score = state.score;
  const bricks = state.bricks.map(b => {
    if (!b.alive) return b;
    const hit = x + r >= b.x && x - r <= b.x + b.width && y + r >= b.y && y - r <= b.y + b.height;
    if (hit) { vy *= -1; score += 10; return { ...b, alive: false }; }
    return b;
  });
  if (y > state.height + r) return { ...state, ball: { x: state.width / 2, y: state.height - 80, vx: 4, vy: -4, r }, lives: state.lives - 1, bricks, score };
  return { ...state, ball: { x, y, vx, vy, r }, bricks, score };
}
