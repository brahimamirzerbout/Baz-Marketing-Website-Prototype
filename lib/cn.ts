/**
 * Tiny class-name combiner. No clsx/twMerge dependency.
 * Filters falsy values and joins with spaces.
 */
export function cn(...classes: (string | false | null | undefined | 0)[]): string {
  return classes.filter(Boolean).join(' ');
}
