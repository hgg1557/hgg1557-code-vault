export type FlappyState = { width: number; height: number; bird: { x: number; y: number; vy: number; radius: number }; pipes: { x: number; gapY: number; gap: number; width: number; passed: boolean }[]; score: number; alive: boolean };

export function createFlappy(width = 360, height = 640): FlappyState {
  return { width, height, bird: { x: 80, y: height / 2, vy: 0, radius: 12 }, pipes: [], score: 0, alive: true };
}

export function flap(state: FlappyState): FlappyState {
  return state.alive ? { ...state, bird: { ...state.bird, vy: -7 } } : state;
}

export function spawnPipe(state: FlappyState, gap = 150): FlappyState {
  const min = 80, max = state.height - gap - 80;
  const gapY = min + Math.random() * (max - min);
  return { ...state, pipes: [...state.pipes, { x: state.width, gapY, gap, width: 48, passed: false }] };
}

export function step(state: FlappyState): FlappyState {
  if (!state.alive) return state;
  const gravity = 0.35, speed = 3;
  const bird = { ...state.bird, vy: state.bird.vy + gravity, y: state.bird.y + state.bird.vy };
  let score = state.score;
  const pipes = state.pipes.map(p => {
    const next = { ...p, x: p.x - speed };
    if (!next.passed && next.x + next.width < bird.x) { score++; next.passed = true; }
    return next;
  }).filter(p => p.x + p.width > 0);
  const hitPipe = pipes.some(p => bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + p.width && (bird.y - bird.radius < p.gapY || bird.y + bird.radius > p.gapY + p.gap));
  const alive = bird.y - bird.radius > 0 && bird.y + bird.radius < state.height && !hitPipe;
  return { ...state, bird, pipes, score, alive };
}
