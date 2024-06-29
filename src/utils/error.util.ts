export const errorHandler = (initiator: string, error: Error) => {
  console.error(`The '${initiator}' function caught an error: `, error.message);
};
