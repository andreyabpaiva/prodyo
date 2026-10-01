const SECONDS_PER_HOUR = 3600;

export function secondsToHours(seconds: number): number {
  return Number((seconds / SECONDS_PER_HOUR).toFixed(2));
}

export function hoursToSeconds(hours: number): number {
  return Math.round(hours * SECONDS_PER_HOUR);
}

export function formatHours(seconds: number): string {
  return `${Number((seconds / SECONDS_PER_HOUR).toFixed(1))}h`;
}
