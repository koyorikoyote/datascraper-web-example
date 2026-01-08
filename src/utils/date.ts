export function formatDate(
  date?: string | Date | null,
  lang: "en" | "ja" = "ja",
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  const defaultOptions: Intl.DateTimeFormatOptions =
    lang === "ja"
      ? {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Tokyo",
        }
      : {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Tokyo",
        };

  // Use toLocaleString and strip out comma if present
  return d
    .toLocaleString(lang, { ...defaultOptions, ...options })
    .replace(",", "");
}
