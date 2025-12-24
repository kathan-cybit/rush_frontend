function formatUtcToIST(utcString) {
  if (!utcString) return "";

  const date = new Date(utcString);

  const istString = date.toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // "23/12/2025, 18:15:00" → "23 12 2025 18:15:00"
  return istString.replace(/\//g, " ").replace(",", "");
}
export { formatUtcToIST };
