export const errorHandler = (initiator: string, error: Error) => {
  console.error(`The '${initiator}' function caught an error: `, error.message);
};

export const isDuplicateConstraint = (error) =>
  typeof error?.constraint === "string" &&
  error.constraint.includes("rides_hertz_ride_id_key");
