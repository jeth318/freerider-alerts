export const eHandler = (e: Error) => {
  console.error(e);
};

export const isDuplicateConstraint = (e) =>
  typeof e?.constraint === "string" &&
  e.constraint.includes("rides_hertz_ride_id_key");
