export type SudokuGrid = number[][];
export type SudokuState = { puzzle: SudokuGrid; solution: SudokuGrid; board: SudokuGrid };

const clone = (g: SudokuGrid) => g.map(r => [...r]);

export function isValidMove(board: SudokuGrid, row: number, col: number, value: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === value) return false;
    if (i !== row && board[i][col] === value) return false;
  }
  const br = Math.floor(row / 3) * 3, bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++) for (let c = bc; c < bc + 3; c++) {
    if ((r !== row || c !== col) && board[r][c] === value) return false;
  }
  return value >= 1 && value <= 9;
}

export function isSolved(board: SudokuGrid): boolean {
  return board.every((row, r) => row.every((v, c) => v >= 1 && v <= 9 && isValidMove(board, r, c, v)));
}

export function createSudoku(solution: SudokuGrid, blanks = 45): SudokuState {
  const puzzle = clone(solution);
  const positions = [...Array(81).keys()].sort(() => Math.random() - 0.5).slice(0, blanks);
  positions.forEach(i => { puzzle[Math.floor(i / 9)][i % 9] = 0; });
  return { puzzle, solution: clone(solution), board: clone(puzzle) };
}

export function setValue(state: SudokuState, row: number, col: number, value: number): SudokuState {
  if (state.puzzle[row][col] !== 0) return state;
  if (value !== 0 && !isValidMove(state.board, row, col, value)) return state;
  const board = clone(state.board);
  board[row][col] = value;
  return { ...state, board };
}
