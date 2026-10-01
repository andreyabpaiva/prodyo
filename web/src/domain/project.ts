const PROJECT_ACCENTS: string[] = [
  "bg-status-done",
  "bg-status-todo",
  "bg-brand-light",
  "bg-impro-bg",
  "bg-bug-bg",
  "bg-ash",
];

export function getProjectAccent(projectId: string): string {
  const hash = Array.from(projectId).reduce(
    (total, char) => (total * 31 + char.charCodeAt(0)) >>> 0,
    0,
  );
  return PROJECT_ACCENTS[hash % PROJECT_ACCENTS.length];
}
