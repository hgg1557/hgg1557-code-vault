export type MemoryCard<T> = { id: number; value: T; matched: boolean; flipped: boolean };
export type MemoryState<T> = { cards: MemoryCard<T>[]; first: number | null; second: number | null; moves: number; matchedPairs: number };

export function createMemory<T>(values: T[]): MemoryState<T> {
  const cards = values.flatMap((value, pair) => [{ value, pair }, { value, pair }])
    .map((c, i) => ({ id: i, value: c.value, matched: false, flipped: false }))
    .sort(() => Math.random() - 0.5);
  return { cards, first: null, second: null, moves: 0, matchedPairs: 0 };
}

export function flipCard<T>(state: MemoryState<T>, id: number): MemoryState<T> {
  if (state.second !== null || state.cards.find(c => c.id === id)?.matched || state.first === id) return state;
  const cards = state.cards.map(c => c.id === id ? { ...c, flipped: true } : c);
  return { ...state, cards, first: state.first === null ? id : state.first, second: state.first === null ? null : id, moves: state.first === null ? state.moves : state.moves + 1 };
}

export function resolvePair<T>(state: MemoryState<T>): MemoryState<T> {
  if (state.first === null || state.second === null) return state;
  const a = state.cards.find(c => c.id === state.first)!;
  const b = state.cards.find(c => c.id === state.second)!;
  const match = Object.is(a.value, b.value);
  const cards = state.cards.map(c => {
    if (c.id === a.id || c.id === b.id) return { ...c, flipped: match, matched: match };
    return c;
  });
  return { ...state, cards, first: null, second: null, matchedPairs: state.matchedPairs + (match ? 1 : 0) };
}
