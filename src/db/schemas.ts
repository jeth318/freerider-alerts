import {
  pgTable,
  serial,
  varchar,
  text,
  unique,
  integer,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: uuid("id").defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  transportOfferId: integer("transport_offer_id").notNull().unique(),
  fromCity: varchar("from_city", { length: 255 }).notNull(),
  toCity: varchar("to_city", { length: 255 }).notNull(),
});

const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(),
  fromCity: varchar("from_city", { length: 255 }),
  toCity: varchar("to_city", { length: 255 }),
});

const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export { users, offers, subscriptions, cities };
