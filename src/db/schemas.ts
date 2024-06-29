import { pgTable, serial, text } from "drizzle-orm/pg-core";
export const rides = pgTable("rides", {
  id: serial("id").primaryKey(),
  hertzRideId: text("hertz_ride_id").notNull().unique(),
});
