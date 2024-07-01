export const capitalizeFirst = (value: string) => {
  const firstChar = value[0];
  const rest = value.slice(1, value.length);
  return firstChar.toUpperCase() + rest.toLocaleLowerCase();
};
