import { genHash } from "./../utils/db.util";
import { eq } from "drizzle-orm";
import { db } from ".";
import { cities, offers, subscriptions, users } from "./schemas";
import { eHandler, isDuplicateConstraint } from "../utils/error.util";
import { City, Offer, Subscription } from "../models";
import { sql } from "@vercel/postgres";

/* export const insertOffer = async ({
  transportOfferId,
  fromCity,
  toCity,
}: Omit<Offer, "added">) => {
  try {
    await db.insert(offers).values({
      transportOfferId,
      fromCity,
      toCity,
      added: new Date().toISOString(),
    });
    return true;
  } catch (e) {
    !isDuplicateConstraint(e) && eHandler(e);
    return false;
  }
}; */

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

// Get all subscriptions
export const getSubscriptionsWithEmail = async () => {
  try {
    /*     const result = await db
      .select()
      .from(subscriptions)
      .rightJoin(users, eq(users.id, db.cast(subscriptions.userId, "UUID"))); */

    const result = await sql`
      SELECT *
      FROM subscriptions
      RIGHT JOIN users
      ON users.id = subscriptions.user_id::UUID
    `;

    return result;
  } catch (e) {
    eHandler(e);
    throw new Error("Damn");
  }
};
