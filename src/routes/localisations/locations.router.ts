import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { LocationsCreateSchema } from "../../schemas/localisationsSchema";
import { Locations_getLazy, registerLocations } from "../../controllers/localisations/LocationsController";




const prisma = new PrismaClient();
// Require controller modules.
const controller = require("../controllers/localisations/LocationsController");

export const locationsRouter = express.Router();

// Get : count
locationsRouter.get("/count", async (request: Request, response: Response) => {
  try {
    const count = await prisma.entities.count();
    return response.status(200).json(count);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : findAll
locationsRouter.get("/", async (request: Request, response: Response) => {
  try {
    const all = await prisma.entities.findMany({
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
locationsRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const byId = await prisma.entities.findUnique({
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
locationsRouter.get(
  "/lazy/:filter",
  Locations_getLazy
);

// GET : getLazy count
locationsRouter.get(
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
      const all = await prisma.entities.count({
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
// locationsRouter.post(
//   "/",
//   body("deleted").isBoolean(),
//   body("entity").isString(),
//   body("designation").isString(),
//   body("main").isBoolean(),
//   body("activated").isBoolean(),
//   async (request: Request, response: Response) => {
//     const errors = validationResult(request);
//     if (!errors.isEmpty()) {
//       return response.status(400).json({ errors: errors.array() });
//     }
//     // try {
//     //   const entity = request.body;
//     //   const newEntity = await prisma.entities.create(entity);
//     //   return response.status(201).json(newEntity);
//     // } catch (error: any) {
//     //   return response.status(500).json(error.message);
//     // }
//     return response.status(400).json({ errors: "No implemented !" });
//   }
// );

locationsRouter.post(
  "/",
  validateSchema(LocationsCreateSchema),
  controller.getLazy
);

// POST : Update
//
locationsRouter.put(
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
    //   const updateEntity = await prisma.entities.update(entity, id);
    //   return response.status(200).json(updateEntity);
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);

// DELETE
locationsRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  // try {
  //   await prisma.entities.delete(id);
  //   return response.status(204).json("Entity has been successfully deleted");
  // } catch (error: any) {
  //   return response.status(500).json(error.message);
  // }
  return response.status(400).json({ errors: "No implemented !" });
});
