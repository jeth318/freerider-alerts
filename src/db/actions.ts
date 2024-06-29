import { eq } from "drizzle-orm";
import { db } from ".";
import { rides } from "./schemas";
import { errorHandler, isDuplicateConstraint } from "../utils/error.util";

export const getStoredRideByTransportId = async (id: string) => {
  try {
    return await db.select().from(rides).where(eq(rides.hertzRideId, id));
  } catch (error) {
    errorHandler("getStoredRideByTransportId", error.message);
    return Promise.reject(error);
  }
};

export const isRideKnown = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(rides)
      .where(eq(rides.hertzRideId, id));

    return !!result?.length;
  } catch (error) {
    errorHandler("isRideKnown", error);
    return Promise.reject(error);
  }
};

export const insertRide = async (hertzRideId: string) => {
  try {
    await db.insert(rides).values({ hertzRideId });
    return { success: true };
  } catch (error) {
    !isDuplicateConstraint(error) && errorHandler("insertRide", error);
    return { success: false };
  }
};
