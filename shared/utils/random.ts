export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomItem = <T>(items: readonly T[]): T => {
  if (!items.length) throw new Error("Cannot choose from an empty array");
  return items[randomInt(0, items.length - 1)];
};
export const shuffle = <T>(items: readonly T[]): T[] => [...items].sort(() => Math.random() - 0.5);
