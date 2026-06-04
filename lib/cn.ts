type ClassValue = string | number | null | false | undefined;

/** Minimal classnames helper: join truthy class values with a space. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
