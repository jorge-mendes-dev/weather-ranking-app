// Utility to format a date string as DD/MM/YYYY using Intl API
export function formatDate(date: string): string {
  try {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat("en-GB").format(d);
    }
  } catch {
    // ignore
  }
  return date;
}
