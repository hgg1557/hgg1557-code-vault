export type ReactionResult = {
  startedAt: number;
  endedAt: number;
  milliseconds: number;
};

export function startReactionTest(): number {
  return performance.now();
}

export function finishReactionTest(startedAt: number): ReactionResult {
  const endedAt = performance.now();
  return {
    startedAt,
    endedAt,
    milliseconds: Math.max(0, Math.round(endedAt - startedAt)),
  };
}
