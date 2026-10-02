export type Grid = number[][];

export function createGrid(): Grid {
  const grid = Array.from({ length: 4 }, () => Array(4).fill(0));
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
}

export function moveLeft(grid: Grid): Grid {
  const next = grid.map(row => mergeLine(row));
  if (JSON.stringify(next) !== JSON.stringify(grid)) addRandomTile(next);
  return next;
}

export function moveRight(grid: Grid): Grid {
  const next = grid.map(row => mergeLine([...row].reverse()).reverse());
  if (JSON.stringify(next) !== JSON.stringify(grid)) addRandomTile(next);
  return next;
}

export function moveUp(grid: Grid): Grid {
  const next = transpose(grid).map(row => mergeLine(row));
  const result = transpose(next);
  if (JSON.stringify(result) !== JSON.stringify(grid)) addRandomTile(result);
  return result;
}

export function moveDown(grid: Grid): Grid {
  const next = transpose(grid).map(row => mergeLine([...row].reverse()).reverse());
  const result = transpose(next);
  if (JSON.stringify(result) !== JSON.stringify(grid)) addRandomTile(result);
  return result;
}

function mergeLine(line: number[]): number[] {
  const values = line.filter(Boolean);
  const result: number[] = [];

  for (let i = 0; i < values.length; i++) {
    if (values[i] === values[i + 1]) {
      result.push(values[i] * 2);
      i++;
    } else {
      result.push(values[i]);
    }
  }

  while (result.length < 4) result.push(0);
  return result;
}

function transpose(grid: Grid): Grid {
  return grid[0].map((_, col) => grid.map(row => row[col]));
}

function addRandomTile(grid: Grid): void {
  const empty: Array<[number, number]> = [];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (grid[y][x] === 0) empty.push([y, x]);
    }
  }
  if (!empty.length) return;
  const [y, x] = empty[Math.floor(Math.random() * empty.length)];
  grid[y][x] = Math.random() < 0.9 ? 2 : 4;
}
