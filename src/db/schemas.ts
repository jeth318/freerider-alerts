import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  hertzOfferId: text("hertz_offer_id").notNull().unique(),
  added: text("added").notNull(),
});

export const filters = pgTable("filters", {
  id: serial("id").primaryKey(),
  hash: text("hash").notNull().unique(),
  cityFrom: text("city_from").notNull(),
  cityTo: text("city_to").notNull(),
  type: text("type").notNull(),
});

export const riders = pgTable("riders", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  hash: text("hash").notNull().unique(),
  riderEmail: text("rider_email").notNull(),
  filterHash: text("filter_hash").notNull(),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  tracCode: text("trac_code").notNull(),
  country: text("country").notNull(),
});
