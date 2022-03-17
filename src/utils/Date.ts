export function formatDate(dateStr: string | undefined | null) {
  if (dateStr && isDate(dateStr)) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    return "";
  }
}

export function isDate(dateStr: string) {
  return !isNaN(new Date(dateStr).getDate());
}
