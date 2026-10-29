import { NextFunction, Request, Response } from "express";
import { knexConfig } from "@/database/knex";
import { z } from "zod";
import knex from "knex";
import { AppError } from "@/utils/AppError";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await knexConfig<TablesSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

        if (session && !session.closet_at) {
          throw new AppError("this table is already open")
        }

      await knexConfig<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knexConfig.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knexConfig<TablesSessionsRepository>("tables_sessions")
        .orderBy("closet_at")

        return response.json(sessions)
    } catch (error) {
      next(error)
    }
  }
}

export { TablesSessionsController };
