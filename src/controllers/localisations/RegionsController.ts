import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";

// Import the module
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

// Display list of all catalog.
exports.list = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      const all = await prisma.loc_regions.findMany({});
      return response.status(200).json(all);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
 
// Display count of all catalog.
exports.list_count = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      const count = await prisma.loc_regions.count();
      return response.status(200).json(count);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display list of all catalog (lazy loading).
exports.list_lazy = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // Get request react filter
    const requestFilter: any = JSON.parse(request.params.filter);

    // Manage Filters and sorting
    const model = new Model();

    const whereClause = model.convFilterReactToPrisma(requestFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      requestFilter.multiSortMeta
    );

    console.log(requestFilter)
    /**
     * Process request
     */
    try {
      const result = await prisma.loc_regions.findMany({
        skip:
          parseInt(requestFilter.page, 10) * parseInt(requestFilter.rows, 10),
        take: parseInt(requestFilter.rows),
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

// Display count of all catalog (lazy loading).
exports.list_lazy_count = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // Get Request react filter
    const reqFilter: any = JSON.parse(request.params.filter);

    // Manage Filters and sorting
    const model = new Model();
    const whereClause = model.convFilterReactToPrisma(reqFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      reqFilter.multiSortMeta
    );

    try {
      const all = await prisma.loc_regions.count({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).json(all);
      } else {
        return response.status(400).json("loc_regions is empty");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display detail page for a specific catalog.
exports.detail = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send(`NOT IMPLEMENTED: Catalog detail: ${request.params.id}`);

    const id: number = parseInt(request.params.id, 10);
    try {
      const byId = await prisma.loc_regions.findUnique({
        where: {
          id: id,
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json("catalog loc_regions with id(" + id + ") not found");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display catalog create form on GET.
exports.create_get = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send("NOT IMPLEMENTED: Catalog create GET");
  }
);

// Handle catalog create on POST.

// POST : Create
// Params : deleted, entity, designation, main, activated
exports.create_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // body("deleted").isBoolean(),
    // body("entity").isString(),
    // body("designation").isString(),
    // body("main").isBoolean(),
    // body("activated").isBoolean();

    // const errors = validationResult(request);
    // if (!errors.isEmpty()) {
    //   return response.status(400).json({ errors: errors.array() });
    // }
    // try {
    //   const entity = request.body;
    //   const newEntity = await prisma.loc_regions.create(entity);
    //   return response.status(201).json(newEntity);
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response
      .status(400)
      .json({ errors: "loc_regions create not implemented !" });
  }
);

// Display catalog update form on GET.
exports.update_get = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send("NOT IMPLEMENTED: Catalog update GET");
  }
);

// Handle catalog update on POST.
exports.update_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
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
    //     const id: number = parseInt(request.params.id, 10);
    //     // try {
    //     //   const entity = request.body;
    //     //   const updateEntity = await prisma.loc_regions.update(entity, id);
    //     //   return response.status(200).json(updateEntity);
    //     // } catch (error: any) {
    //     //   return response.status(500).json(error.message);
    //     // }
    //     return response.status(400).json({ errors: "No implemented !" });
    //   }
  }
);

// Display catalog delete form on GET.
exports.delete_get = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send("NOT IMPLEMENTED: Catalog delete GET");
  }
);

// Handle catalog delete on POST.
exports.delete_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    const id: number = parseInt(request.params.id, 10);

    // try {
    //   await prisma.loc_regions.delete(id);
    //   return response.status(204).json("Entity has been successfully deleted");
    // } catch (error: any) {
    //   return response.status(500).json(error.message);
    // }
    return response.status(400).json({ errors: "No implemented !" });
  }
);
