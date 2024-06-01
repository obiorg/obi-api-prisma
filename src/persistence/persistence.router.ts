import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const persistenceRouter = express.Router();

// Get : count
persistenceRouter.get(
  "/count",
  async (request: Request, response: Response) => {
    try {
      const count = await prisma.persistence.count();
      return response.status(200).json(count);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// GET : findAll
persistenceRouter.get("/", async (request: Request, response: Response) => {
  try {
    const all = await prisma.persistence.findMany({
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return response.status(200).json(all);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
}); 

// GET : findById
persistenceRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const byId = await prisma.persistence.findUnique({
      where: {
        id: id,
      },
    });

    if (byId) {
      return response.status(200).json(byId);
    } else {
      return response.status(400).json("entity with id(" + id + ") not found");
    }
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : findByPage
persistenceRouter.get(
  "/offset/:offset/limit/:limit/sort/:order",
  async (request: Request, response: Response) => {
    const limit: number = parseInt(request.params.limit, 10);
    const offset: number = parseInt(request.params.offset, 10);
    const order: string = request.params.order;

    try {
      const byId = await prisma.persistence.findMany({
        skip: offset,
        take: limit,
        // where: {
        //   tag: tagId,
        // },
        orderBy: {
          id: order == "desc" ? "desc" : "asc",
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json(
            "entity with parms offset, limit, sort (" +
              offset +
              ", " +
              limit +
              ", " +
              order +
              ") not found"
          );
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// GET : findByTagsId
persistenceRouter.get(
  "/tags/:tagId",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.tagId, 10);
    try {
      const byId = await prisma.persistence.findMany({
        where: {
          tag: id,
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json("entity with id(" + id + ") not found");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// POST : Create
// Params : deleted, entity, designation, main, activated
persistenceRouter.post(
  "/",
  body("deleted").isBoolean(),
  body("entity").isString(),
  body("designation").isString(),
  body("main").isBoolean(),
  body("activated").isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    // try {
    //   const entity = request.body;
    //   const newEntity = await prisma.persistence.create(entity);
    //   return response.status(201).json(newEntity);
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);

// POST : Update
//
persistenceRouter.put(
  "/:id",
  body("deleted").isBoolean(),
  body("entity").isString(),
  body("designation").isString(),
  body("main").isBoolean(),
  body("activated").isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(request.params.id, 10);
    // try {
    //   const entity = request.body;
    //   const updateEntity = await prisma.persistence.update(entity, id);
    //   return response.status(200).json(updateEntity);
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);

// DELETE
persistenceRouter.delete(
  "/:id",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    // try {
    //   await prisma.persistence.delete(id);
    //   return response.status(204).json("Entity has been successfully deleted");
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);
