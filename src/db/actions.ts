import { eq } from "drizzle-orm";
import { db } from ".";
import { cities, riders, rides, subscriptions } from "./schemas";
import { eHandler, isDuplicateConstraint } from "../utils/error.util";
import { City } from "../models";

export const getStoredRideByTransportId = async (id: string) => {
  try {
    return await db.select().from(rides).where(eq(rides.hertzRideId, id));
  } catch (e) {
    eHandler(e);
    return Promise.reject(e);
  }
};

export const getSubscriptionsByRiderId = async (id: string) => {
  try {
    return await db.select().from(rides).where(eq(rides.hertzRideId, id));
  } catch (e) {
    eHandler(e);
    return Promise.reject(e);
  }
};

export const getAllSubscriptions = async () => {
  try {
    return await db.select().from(subscriptions);
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

export const insertCity = async (city: City) => {
  try {
    await db.insert(cities).values(city);
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
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

export const insertRider = async (email: string, first_name: string) => {
  try {
    await db.insert(riders).values({ email, first_name });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};

export type FilterType = "from" | "to" | "from_to";

type InsertSubscriptionProps = {
  riderEmail: string;
  fromCity?: string;
  toCity?: string;
  filterType: string;
  hashCode: string;
};
export const insertSubscription = async ({
  riderEmail,
  fromCity,
  toCity,
  filterType,
  hashCode,
}: InsertSubscriptionProps) => {
  try {
    await db
      .insert(subscriptions)
      .values({ hashCode, riderEmail, fromCity, toCity, filterType });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};
