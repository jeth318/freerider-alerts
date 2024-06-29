import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const rides = sqliteTable("rides", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  hertzRideId: text("hertz_ride_id").unique(),
});
