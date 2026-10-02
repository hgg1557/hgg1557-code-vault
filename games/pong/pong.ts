export type Paddle = { y: number; height: number };
export type Ball = { x: number; y: number; vx: number; vy: number; size: number };
export type PongState = { width: number; height: number; left: Paddle; right: Paddle; ball: Ball; score: [number, number] };

export function createPong(width = 800, height = 450): PongState {
  return {
    width, height,
    left: { y: height / 2 - 45, height: 90 },
    right: { y: height / 2 - 45, height: 90 },
    ball: { x: width / 2, y: height / 2, vx: 5, vy: 3, size: 10 },
    score: [0, 0]
  };
}

export function movePaddle(p: Paddle, delta: number, height: number, speed = 7): Paddle {
  return { ...p, y: Math.max(0, Math.min(height - p.height, p.y + delta * speed)) };
}

export function step(state: PongState): PongState {
  let { x, y, vx, vy, size } = state.ball;
  x += vx; y += vy;
  if (y <= 0 || y + size >= state.height) vy *= -1;
  const hitLeft = x <= 30 + size && y + size >= state.left.y && y <= state.left.y + state.left.height && vx < 0;
  const hitRight = x + size >= state.width - 30 && y + size >= state.right.y && y <= state.right.y + state.right.height && vx > 0;
  if (hitLeft || hitRight) vx *= -1.05;
  if (x < -size) return { ...state, score: [state.score[0], state.score[1] + 1], ball: { ...state.ball, x: state.width / 2, y: state.height / 2, vx: 5, vy: 3 } };
  if (x > state.width + size) return { ...state, score: [state.score[0] + 1, state.score[1]], ball: { ...state.ball, x: state.width / 2, y: state.height / 2, vx: -5, vy: 3 } };
  return { ...state, ball: { x, y, vx, vy, size } };
}
