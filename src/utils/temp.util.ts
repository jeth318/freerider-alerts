import { insertFilter, insertSubscription } from "./../db/actions";

export const temp = async () => {
  await insertFilter({
    cityFrom: "Vänersborg",
    cityTo: "Jönköping",
  });

  await insertSubscription({
    filterHash: "5c328436de93e67c8b8c55c39c6d2105",
    riderEmail: "orvar@jovars.se",
  });
};
