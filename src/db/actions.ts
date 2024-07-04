import { genHash } from "./../utils/db.util";
import { eq } from "drizzle-orm";
import { db } from ".";
import { cities, filters, offers, riders, subscriptions } from "./schemas";
import { eHandler, isDuplicateConstraint } from "../utils/error.util";
import { City, Filter, Offer, Rider, Subscription } from "../models";

export const insertOffer = async ({ hertzOfferId }: Omit<Offer, "added">) => {
  try {
    await db
      .insert(offers)
      .values({ hertzOfferId, added: new Date().toISOString() });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};

export const insertCity = async ({ name, tracCode, country }: City) => {
  try {
    await db.insert(cities).values({ name, tracCode, country });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};

export const insertFilter = async ({ cityFrom, cityTo }: Filter) => {
  try {
    const hash = genHash({ cityFrom, cityTo });
    await db.insert(filters).values({ hash, cityFrom, cityTo });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};

export const insertRider = async ({ email, firstName }: Rider) => {
  try {
    await db.insert(riders).values({ email, firstName });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};

export const insertSubscription = async ({
  riderEmail,
  filterHash,
}: Subscription) => {
  try {
    const hash = genHash({ riderEmail, filterHash });
    await db.insert(subscriptions).values({ hash, riderEmail, filterHash });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
};

// Get all cities
export const getCities = async () => {
  try {
    const result = await db.select().from(cities);
    return result;
  } catch (e) {
    eHandler(e);
    return [];
  }
};

// Get all filters
export const getFilters = async () => {
  try {
    const result = await db.select().from(filters);
    return result;
  } catch (e) {
    eHandler(e);
    return [];
  }
};

// Get all riders
export const getRiders = async () => {
  try {
    const result = await db.select().from(riders);
    return result;
  } catch (e) {
    eHandler(e);
    return [];
  }
};

// Get all subscriptions
export const getSubscriptions = async () => {
  try {
    const result = await db.select().from(subscriptions);
    return result;
  } catch (e) {
    eHandler(e);
    return [];
  }
};
