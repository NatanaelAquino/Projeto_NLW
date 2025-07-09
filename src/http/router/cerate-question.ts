import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { schema } from "../../db/shema/index.ts";
import { db } from "../../db/connection.ts";
export const createQuestionRoute: FastifyPluginCallbackZod = async (app) => {
  app.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
            roomId: z.string()
        }),

        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request,reply) => {
      const { roomId } = request.params;
      const { question } = request.body;

      const result = await db
        .insert(schema.questions)
        .values({ roomId, question })
        .returning();
      const insertedRoom = result[0];
      if (!result[0]) {
        throw new Error("Failed to create new room.");
      }

      return reply.status(201).send({ questionId: insertedRoom.id });
    }
  );
};
