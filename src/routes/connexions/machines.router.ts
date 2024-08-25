import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";

const prisma = new PrismaClient();

export const machinesRouter = express.Router();

// Get : count
machinesRouter.get("/count", async (request: Request, response: Response) => {
  try {
    const count = await prisma.machines.count();
    return response.status(200).json(count);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : findAll
machinesRouter.get("/", async (request: Request, response: Response) => {
  try {
    const all = await prisma.machines.findMany({
      // include: {
      //   tags: {
      //     select: {
      //       id: true,
      //       name: true,
      //     },
      //   },
      // },
    });
    return response.status(200).json(all);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : findById
machinesRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const byId = await prisma.machines.findUnique({
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

// GET : getLazy
machinesRouter.get(
  "/lazy/:filter",
  async (request: Request, response: Response) => {
    // Get Request react filter
    const reqFilter: any = JSON.parse(request.params.filter);
    // console.log(reqFilter);

    // Manage Filters and sorting
    const model = new Model();
    // console.log("Request Filters", reqFilter.filters);
    // console.log("Request Sorting", reqFilter.multiSortMetaData);
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
      const result = await prisma.machines.findMany({
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
machinesRouter.get(
  "/lazy/count/:filter",
  async (request: Request, response: Response) => {
    // Get Request react filter
    const reqFilter: any = JSON.parse(request.params.filter);
    // console.log(reqFilter);

    // Manage Filters and sorting
    const model = new Model();
    // console.log("Request Filters", reqFilter.filters);
    // console.log("Request Sorting", reqFilter.multiSortMetaData);
    const whereClause = model.convFilterReactToPrisma(reqFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      reqFilter.multiSortMeta
    );

    // console.log("whereClause", whereClause);
    // console.log("sortingClause", sortingClause);

    try {
      const all = await prisma.machines.count({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).json(all);
      } else {
        return response.status(400).json("entity is empty");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// POST : Create
// Params : deleted, entity, designation, main, activated
machinesRouter.post(
  "/",
  // body("entity").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    // const entity = request.body;
    // console.log(entity);
    try {
      const entity = request.body;
      // console.log(entity);
      const newEntity = await prisma.machines.create({ data: entity });
      // console.log("new entity ", newEntity);
      return response.status(201).json(newEntity);
    } catch (error: any) {
      // console.log("error creating", error.message);
      return response.status(500).json(error.message);
    }
    // return response
    //   .status(200)
    //   .json({ errors: "No implemented for : ", val: entity });
  }
);

// POST : Update
//
machinesRouter.put(
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
    //   const updateEntity = await prisma.machines.update(entity, id);
    //   return response.status(200).json(updateEntity);
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);

// DELETE
machinesRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  // try {
  //   await prisma.machines.delete(id);
  //   return response.status(204).json("Entity has been successfully deleted");
  // } catch (error: any) {
  //   return response.status(500).json(error.message);
  // }
  return response.status(400).json({ errors: "No implemented !" });
});