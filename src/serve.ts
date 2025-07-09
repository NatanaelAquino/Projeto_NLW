import { fastify } from "fastify";

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";
import { sql } from "./db/connection.ts";
import { getRoomsRoute } from "./http/router/get-room.ts";
import { createRoomRoute } from "./http/router/create-room.ts";
import { getRoomQuestions } from "./http/router/get-room-questions.ts";
import { createQuestionRoute } from "./http/router/cerate-question.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestions)
app.register(createQuestionRoute)
app.listen({ port: env.PORT })