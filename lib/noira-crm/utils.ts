/**
 * Format a date string into a "time ago" format.
 */
export function formatDate(dateString: string): string {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }
  return "just now";
}

export function formatDateString(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function checkIsLiked(likeList: string[], userId: string): boolean {
  return likeList?.includes(userId);
}

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function pluralize(count: number, singular: string, plural?: string) {
  return `${count} ${count === 1 ? singular : plural || singular + "s"}`;
}
