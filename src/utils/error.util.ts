export const eHandler = (e: Error) => {
  console.error(e);
};

export const isDuplicateConstraint = (e) => {
  return typeof e?.detail === "string" && e.detail.includes("already exists");
};
