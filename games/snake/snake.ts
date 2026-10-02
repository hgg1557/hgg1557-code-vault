export type Point = { x: number; y: number };
export type Direction = "up" | "down" | "left" | "right";

export type SnakeState = {
  snake: Point[];
  food: Point;
  direction: Direction;
  score: number;
  gameOver: boolean;
};

const DELTAS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function createSnake(size = 20): SnakeState {
  const center = Math.floor(size / 2);
  return {
    snake: [{ x: center, y: center }],
    food: randomFood(size, [{ x: center, y: center }]),
    direction: "right",
    score: 0,
    gameOver: false,
  };
}

export function setDirection(
  state: SnakeState,
  next: Direction
): SnakeState {
  const opposite: Record<Direction, Direction> = {
    up: "down", down: "up", left: "right", right: "left",
  };
  return opposite[state.direction] === next
    ? state
    : { ...state, direction: next };
}

export function tick(state: SnakeState, size = 20): SnakeState {
  if (state.gameOver) return state;

  const head = state.snake[0];
  const delta = DELTAS[state.direction];
  const next = { x: head.x + delta.x, y: head.y + delta.y };

  const hitWall =
    next.x < 0 || next.y < 0 || next.x >= size || next.y >= size;
  const hitSelf = state.snake.some(p => p.x === next.x && p.y === next.y);

  if (hitWall || hitSelf) return { ...state, gameOver: true };

  const ate = next.x === state.food.x && next.y === state.food.y;
  const snake = ate ? [next, ...state.snake] : [next, ...state.snake.slice(0, -1)];

  return {
    ...state,
    snake,
    food: ate ? randomFood(size, snake) : state.food,
    score: ate ? state.score + 10 : state.score,
  };
}

function randomFood(size: number, occupied: Point[]): Point {
  const free: Point[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!occupied.some(p => p.x === x && p.y === y)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
}
