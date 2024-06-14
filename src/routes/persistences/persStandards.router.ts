import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient, pers_standard } from "@prisma/client";
import { Model } from "../../utils/model";

const prisma = new PrismaClient();

export const persStandardsRouter = express.Router();

// Get : count
persStandardsRouter.get(
  "/count",
  async (request: Request, response: Response) => {
    try {
      const count = await prisma.pers_standard.count();
      return response.status(200).json(count);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// GET : findAll
persStandardsRouter.get("/", async (request: Request, response: Response) => {
  try {
    const all = await prisma.pers_standard.findMany();
    return response.status(200).json(all);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : findById
persStandardsRouter.get(
  "/:id",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      const byId = await prisma.pers_standard.findUnique({
        where: {
          id: id,
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

// GET : getLazy
persStandardsRouter.get(
  "/lazy/:filter",
  async (request: Request, response: Response) => {
    // Get Request react filter
    const reqFilter: any = JSON.parse(request.params.filter);
    // console.log(reqFilter);

    // Manage Filters and sorting
    const model = new Model();
    console.log("Request Filters", reqFilter.filters);
    console.log("Request Sorting", reqFilter.multiSortMetaData);
    const whereClause = model.convFilterReactToPrisma(reqFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      reqFilter.multiSortMeta
    );

    // console.log("whereClause", whereClause);
    // console.log("sortingClause", sortingClause);

    /**
     * Process request
     */
    try {
      const result = await prisma.pers_standard.findMany({
        skip: parseInt(reqFilter.page, 10) * parseInt(reqFilter.rows, 10),
        take: parseInt(reqFilter.rows),
        where: whereClause,
        orderBy: sortingClause,
      });

      if (result) {
        return response.status(200).json(result);
      } else {
        const status400 = '{ "status": 400, "message": "Bad request" }';
        return response.status(400).json(status400);
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// GET : getLazy count
persStandardsRouter.get(
  "/lazy/count/:filter",
  async (request: Request, response: Response) => {
    // Get Request react filter
    const reqFilter: any = JSON.parse(request.params.filter);
    // console.log(reqFilter);

    // Manage Filters and sorting
    const model = new Model();
    console.log("Request Filters", reqFilter.filters);
    console.log("Request Sorting", reqFilter.multiSortMetaData);
    const whereClause = model.convFilterReactToPrisma(reqFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      reqFilter.multiSortMeta
    );

    // console.log("whereClause", whereClause);
    // console.log("sortingClause", sortingClause);

    try {
      const all = await prisma.pers_standard.count({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (all) {
        console.log(all);
        return response.status(200).json(all);
      } else {
        return response.status(400).json("entity is empty");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// GET : findByTagsId
persStandardsRouter.get(
  "/tags/:tagId",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.tagId, 10);
    console.log("call !");
    try {
      const getEntities = await prisma.pers_standard.findMany({
        where: {
          tag: id,
        },
      });
      console.log("Call finish", getEntities);
      if (getEntities) {
        console.log(response.json(getEntities));
        return response.status(200).json(getEntities);
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

// GET : countBy tags id
persStandardsRouter.get(
  "/tags/:tagId/count",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.tagId, 10);
    try {
      const count = await prisma.pers_standard.count({
        where: {
          tag: id,
        },
      });

      if (count) {
        return response.status(200).json(count);
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

// GET : findByTagsIdLimited
persStandardsRouter.get(
  "/tags/:tagId/offset/:offset/limit/:limit/sort/:order",
  async (request: Request, response: Response) => {
    const tagId: number = parseInt(request.params.tagId, 10);
    const limit: number = parseInt(request.params.limit, 10);
    const offset: number = parseInt(request.params.offset, 10);
    const order: string = request.params.order;

    try {
      const byId = await prisma.pers_standard.findMany({
        skip: offset,
        take: limit,
        where: {
          tag: tagId,
        },
        orderBy: {
          id: order == "desc" ? "desc" : "asc",
        },
        include: {
          tags: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json("entity with id(" + tagId + ") not found");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// POST : Create
// Params : deleted, entity, designation, main, activated
persStandardsRouter.post(
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
    //   const newEntity = await prisma.pers_standard.create(entity);
    //   return response.status(201).json(newEntity);
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);

// POST : Update
//
persStandardsRouter.put(
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
    //   const updateEntity = await prisma.pers_standard.update(entity, id);
    //   return response.status(200).json(updateEntity);
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);

// DELETE
persStandardsRouter.delete(
  "/:id",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    // try {
    //   await prisma.pers_standard.delete(id);
    //   return response.status(204).json("Entity has been successfully deleted");
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);
