import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const rides = sqliteTable("rides", {
  id: text("id"),
  hertzRideId: text("text_modifiers"),
});
