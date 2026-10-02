export type Cell = { mine: boolean; revealed: boolean; flagged: boolean; adjacent: number };

export type MinesweeperState = {
  width: number;
  height: number;
  mines: number;
  cells: Cell[];
  status: "ready" | "playing" | "won" | "lost";
  elapsed: number;
};

const indexOf = (x: number, y: number, width: number) => y * width + x;

const neighbors = (x: number, y: number, width: number, height: number) => {
  const out: number[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) out.push(indexOf(nx, ny, width));
    }
  }
  return out;
};

export function createMinesweeper(width = 9, height = 9, mines = 10): MinesweeperState {
  if (mines >= width * height) throw new Error("Too many mines");
  const cells = Array.from({ length: width * height }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }));
  const positions = [...Array(width * height).keys()];
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  positions.slice(0, mines).forEach(i => { cells[i].mine = true; });
  cells.forEach((cell, i) => {
    const x = i % width, y = Math.floor(i / width);
    cell.adjacent = neighbors(x, y, width, height).filter(n => cells[n].mine).length;
  });
  return { width, height, mines, cells, status: "ready", elapsed: 0 };
}

export function reveal(state: MinesweeperState, index: number): MinesweeperState {
  if (state.status === "won" || state.status === "lost") return state;
  const cells = state.cells.map(c => ({ ...c }));
  if (!cells[index] || cells[index].flagged || cells[index].revealed) return state;
  const status = state.status === "ready" ? "playing" : state.status;
  if (cells[index].mine) {
    cells.forEach(c => { if (c.mine) c.revealed = true; });
    return { ...state, cells, status: "lost" };
  }
  const queue = [index], seen = new Set<number>();
  while (queue.length) {
    const current = queue.shift()!;
    if (seen.has(current) || cells[current].flagged) continue;
    seen.add(current);
    cells[current].revealed = true;
    if (cells[current].adjacent === 0) {
      const x = current % state.width, y = Math.floor(current / state.width);
      neighbors(x, y, state.width, state.height).forEach(n => {
        if (!cells[n].revealed && !cells[n].mine) queue.push(n);
      });
    }
  }
  const safe = cells.filter(c => !c.mine && c.revealed).length;
  const won = safe === state.width * state.height - state.mines;
  return { ...state, cells, status: won ? "won" : status };
}

export function toggleFlag(state: MinesweeperState, index: number): MinesweeperState {
  if (state.status === "won" || state.status === "lost" || !state.cells[index] || state.cells[index].revealed) return state;
  const cells = state.cells.map(c => ({ ...c }));
  cells[index].flagged = !cells[index].flagged;
  return { ...state, cells };
}

export function tick(state: MinesweeperState): MinesweeperState {
  return state.status === "playing" ? { ...state, elapsed: state.elapsed + 1 } : state;
}
