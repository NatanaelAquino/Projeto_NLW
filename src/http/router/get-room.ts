import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { schema } from "../../db/shema/index.ts";
import { db } from "../../db/connection.ts";
import {eq,count} from 'drizzle-orm'
export const getRoomsRoute: FastifyPluginCallbackZod = async (app) => {
  app.get("/rooms", async () => {
    const results = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        createdAt: schema.questions.createdAt,
        questionsCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id, schema.rooms.name)
      .orderBy(schema.rooms.createdAt);
    return results;
  });
};
