import postgres from "postgres";
import { env } from "../config/env";
import { drizzle } from "drizzle-orm/postgres-js";

import { subscribersTable } from "./schema/subscriber.schema";

const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema: { subscribersTable } });