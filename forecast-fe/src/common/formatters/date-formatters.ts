
export function formatDateToISO(date: Date) {
  return date.toISOString();
}

export const formatDateTime = (date: Date, showTime = false) => {
  const day = date.getDate();

  const getSuffix = (d: number) => {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const suffix = getSuffix(day);
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = `${day}${suffix} ${month}, ${year}`
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return showTime
    ? `${hours}:${minutes} · ${formattedDate}`
    : formattedDate;
};
