import { NextFunction, Request, Response } from "express";
import { knexConfig } from "@/database/knex";
import { z } from "zod"
import knex from "knex";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      })

      const { table_id } = bodySchema.parse(request.body)

      await knexConfig<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knexConfig.fn.now(),
      })

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
