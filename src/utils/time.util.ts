export const ONE_HOUR = 1000 * 3600;

export const getDay = (date: string) => {
  return new Date(date).getDay();
};

export const getMonth = (date: string) => {
  return months[new Date(date).getMonth()];
};

export const getTime = (date: string) => {
  console.log(new Date(compensateForUTC(date)));
  console.log(new Date(date));

  return new Date(compensateForUTC(date))
    .toLocaleTimeString()
    .replace(":00", "");
};

export const getWeekDay = (date: string) => {
  return weekdays[new Date(date).getDay()];
};

const compensateForUTC = (originalDate: string) => {
  const date = new Date(originalDate + "Z");
  date.setHours(date.getHours() + 2);

  return date.toISOString().slice(0, 19);
};

const weekdays = [
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lördag",
  "söndag",
];

const months = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];
