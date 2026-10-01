export function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function toDateInputValue(iso: string | undefined): string {
  return iso ? iso.slice(0, 10) : "";
}

export function fromDateInputValue(value: string): string {
  return `${value}T00:00:00Z`;
}
