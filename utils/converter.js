export function timeConverter(UNIX_timestamp) {
  const date = new Date(UNIX_timestamp * 1000);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  const time = day + " " + month + " " + year;

  return time;
}

export function weekDayConverter(UNIX) {
  const date = new Date(UNIX * 1000);
  const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekDay[date.getDay()];
}
