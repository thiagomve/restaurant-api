import { NextFunction, Request, Response } from "express";
import { knexConfig } from "@/database/knex"
import { z } from "zod"

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query
      const products = await knexConfig<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name")

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction){
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "value must be greater than 0" })
      })

      const { name, price } = bodySchema.parse(request.body)

      await knexConfig<ProductRepository>("products").insert({ name, price })
      
      return response.status(201).json()

    } catch (error) {
       next(error)
    }
  }
}

export { ProductsController };