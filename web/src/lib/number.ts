export function toNumber(value: unknown): number {
  if (value === "" || value === null || value === undefined) return 0;
  return Number(value);
}
