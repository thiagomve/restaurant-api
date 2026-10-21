import { NextFunction, Request, Response } from "express";
import { knexConfig } from "@/database/knex";

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knexConfig<TableRepository>("tables")
        .select()
        .orderBy("table_number");

      return response.json(tables);
    } catch (error) {
      next(error);
    }
  }
}

export { TablesController };
