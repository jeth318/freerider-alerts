import { eq } from "drizzle-orm";
import { db } from ".";
import { rides } from "./schemas";
import { dynamicErrorHandler } from "../utils/error.util";

export const getStoredRideByTransportId = async (id: string) => {
  try {
    return await db.select().from(rides).where(eq(rides.hertzRideId, id));
  } catch (error) {
    dynamicErrorHandler("getStoredRideByTransportId", error.message);
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
    dynamicErrorHandler("isRideKnown", error.message);
    return Promise.reject(error);
  }
};

export const insertRide = async (hertzRideId: string) => {
  try {
    const result = await db.insert(rides).values({ hertzRideId });
    return result;
  } catch (error) {
    dynamicErrorHandler("insertRide", error.message);
    return Promise.reject(error);
  }
};
