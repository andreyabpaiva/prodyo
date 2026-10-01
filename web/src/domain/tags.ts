export function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean);
}

export function formatTags(tags: string[]): string {
  return tags.join(", ");
}

export function formatTagLine(tags: string[]): string {
  return tags.map((tag) => `#${tag}`).join(" · ");
}
