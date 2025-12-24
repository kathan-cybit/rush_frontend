function formatUtcToIST(utcString) {
  if (!utcString) return "";

  const date = new Date(utcString);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export { formatUtcToIST };
