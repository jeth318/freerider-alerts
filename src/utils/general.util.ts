export const ONE_HOUR = 1000 * 3600;

export const getDate = (date: string) =>
  new Date(date).toLocaleDateString("sv");
export const getTime = (date: string) =>
  new Date(date).toLocaleTimeString("sv");
