export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "–";
}

export function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? "";
}
