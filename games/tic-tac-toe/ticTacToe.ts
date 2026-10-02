export type Mark = "X" | "O";
export type Cell = Mark | null;

export type GameState = {
  board: Cell[];
  current: Mark;
  winner: Mark | "draw" | null;
};

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const;

export function createGame(): GameState {
  return { board: Array(9).fill(null), current: "X", winner: null };
}

export function makeMove(state: GameState, index: number): GameState {
  if (state.winner || index < 0 || index > 8 || state.board[index]) return state;

  const board = [...state.board];
  board[index] = state.current;
  const winner = getWinner(board);

  return {
    board,
    current: state.current === "X" ? "O" : "X",
    winner,
  };
}

export function getWinner(board: Cell[]): Mark | "draw" | null {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every(Boolean) ? "draw" : null;
}
