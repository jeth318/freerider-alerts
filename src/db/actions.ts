import { eq } from "drizzle-orm";
import { db } from ".";
<<<<<<< Updated upstream
import { cities, riders, rides, subscriptions } from "./schemas";
=======
import { riders, rides, subscriptions } from "./schemas";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
type InsertSubscriptionProps = {
  riderEmail: string;
  fromCityId?: number;
  toCityId?: number;
  filterType: "from" | "to" | "from_to";
};
export const insertSubscription = async ({
  riderEmail,
  fromCityId,
  toCityId,
  filterType,
>>>>>>> Stashed changes
}: InsertSubscriptionProps) => {
  try {
    await db
      .insert(subscriptions)
<<<<<<< Updated upstream
      .values({ hashCode, riderEmail, fromCity, toCity, filterType });
=======
      .values({ riderEmail, fromCityId, toCityId, filterType });
>>>>>>> Stashed changes
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};
