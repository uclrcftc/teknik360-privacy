export type Grid = number[][];

export const GRID_SIZE = 4;

export function emptyGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

function cloneGrid(grid: Grid): Grid {
  return grid.map((row) => [...row]);
}

function emptyCells(grid: Grid): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
}

export function addRandomTile(grid: Grid): Grid {
  const cells = emptyCells(grid);
  if (cells.length === 0) return grid;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  const next = cloneGrid(grid);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

export function newGame(): Grid {
  let grid = emptyGrid();
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return grid;
}

function transpose(grid: Grid): Grid {
  const next = emptyGrid();
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      next[c][r] = grid[r][c];
    }
  }
  return next;
}

function reverseRows(grid: Grid): Grid {
  return grid.map((row) => [...row].reverse());
}

function compressAndMergeRow(row: number[]): { row: number[]; gained: number; moved: boolean } {
  const values = row.filter((v) => v !== 0);
  const merged: number[] = [];
  let gained = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] === values[i + 1]) {
      const mergedValue = values[i] * 2;
      merged.push(mergedValue);
      gained += mergedValue;
      i++;
    } else {
      merged.push(values[i]);
    }
  }
  while (merged.length < GRID_SIZE) merged.push(0);
  const moved = merged.some((v, i) => v !== row[i]);
  return { row: merged, gained, moved };
}

function moveLeftGrid(grid: Grid): { grid: Grid; gained: number; moved: boolean } {
  let gained = 0;
  let moved = false;
  const next = grid.map((row) => {
    const result = compressAndMergeRow(row);
    gained += result.gained;
    moved = moved || result.moved;
    return result.row;
  });
  return { grid: next, gained, moved };
}

export type Direction = 'left' | 'right' | 'up' | 'down';

export function move(grid: Grid, direction: Direction): { grid: Grid; gained: number; moved: boolean } {
  switch (direction) {
    case 'left':
      return moveLeftGrid(grid);
    case 'right': {
      const { grid: moved, gained, moved: didMove } = moveLeftGrid(reverseRows(grid));
      return { grid: reverseRows(moved), gained, moved: didMove };
    }
    case 'up': {
      const { grid: moved, gained, moved: didMove } = moveLeftGrid(transpose(grid));
      return { grid: transpose(moved), gained, moved: didMove };
    }
    case 'down': {
      const { grid: moved, gained, moved: didMove } = moveLeftGrid(reverseRows(transpose(grid)));
      return { grid: transpose(reverseRows(moved)), gained, moved: didMove };
    }
  }
}

export function canMove(grid: Grid): boolean {
  if (emptyCells(grid).length > 0) return true;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const v = grid[r][c];
      if (c + 1 < GRID_SIZE && grid[r][c + 1] === v) return true;
      if (r + 1 < GRID_SIZE && grid[r + 1][c] === v) return true;
    }
  }
  return false;
}

export function hasWon(grid: Grid): boolean {
  return grid.some((row) => row.some((v) => v >= 2048));
}
