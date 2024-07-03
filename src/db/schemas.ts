import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
export const rides = pgTable("rides", {
  id: serial("id").primaryKey(),
  hertzRideId: text("hertz_ride_id").notNull().unique(),
});

export const riders = pgTable("riders", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  first_name: text("first_name").notNull().unique(),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
<<<<<<< Updated upstream
  tracCode: text("trac_code").notNull().unique(),
  name: text("name").notNull().unique(),
  country: text("country").notNull(),
=======
  city_name: text("name").notNull().unique(),
>>>>>>> Stashed changes
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
<<<<<<< Updated upstream
  hashCode: text("hash_code").notNull().unique(),
  riderEmail: text("rider_email")
    .notNull()
    .references(() => riders.email),
  fromCity: text("from_city").references(() => cities.id),
  toCity: text("to_city").references(() => cities.id),
=======
  riderEmail: text("rider_email")
    .notNull()
    .references(() => riders.email),
  fromCityId: integer("from_city_id").references(() => cities.id),
  toCityId: integer("to_city_id").references(() => cities.id),
>>>>>>> Stashed changes
  filterType: text("filter_type").notNull(),
});
