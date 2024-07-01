import { eq } from "drizzle-orm";
import { db } from ".";
import { rides } from "./schemas";
import { eHandler, isDuplicateConstraint } from "../utils/error.util";

export const getStoredRideByTransportId = async (id: string) => {
  try {
    return await db.select().from(rides).where(eq(rides.hertzRideId, id));
  } catch (e) {
    eHandler(e);
    return Promise.reject(e);
  }
};

export const isRideKnown = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(rides)
      .where(eq(rides.hertzRideId, id));

    return !!result?.length;
  } catch (e) {
    eHandler(e);
    return Promise.reject(e);
  }
};

export const insertRide = async (hertzRideId: string) => {
  try {
    await db.insert(rides).values({ hertzRideId });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};
