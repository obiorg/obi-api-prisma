import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { EntitiesCreateSchema, EntitiesDeleteSchema, EntitiesUpdateSchema } from "../../schemas/entitiesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/businesses/EntitiesController");

export const entitiesRouter = express.Router();

// list of all catalog
entitiesRouter.get("/", controller.list);

// count of all catalog
entitiesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
entitiesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
entitiesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
entitiesRouter.get("/:id", controller.detail);

// create catalog rendering template
entitiesRouter.get("/create", controller.create_get);

// create catalog 
entitiesRouter.post("/", validateSchema(EntitiesCreateSchema), controller.create_post);

// update catalog rendering template
entitiesRouter.get("/update", controller.update_get);

// update catalog 
entitiesRouter.put("/:id", validateSchema(EntitiesUpdateSchema), controller.update_post);

// delete catalog rendering template 
entitiesRouter.get("/delete", controller.delete_get);

// delete catalog 
entitiesRouter.delete("/:id", validateSchema(EntitiesDeleteSchema), controller.delete_post);















// import express from "express";
// import type { Request, Response } from "express";
// import { body, validationResult } from "express-validator";

// import { PrismaClient } from "@prisma/client";
// import { Model } from "../../utils/model";

// import { validateData, entityValidate } from "../../middleware/validationMDW";
// import { entitiesCreateSchema } from "../../schemas/businesses/entitiesSchema";


// const prisma = new PrismaClient();

// export const entitiesRouter = express.Router();

// // Get : count
// entitiesRouter.get("/count", async (request: Request, response: Response) => {
//   try {
//     const count = await prisma.entities.count();
//     return response.status(200).json(count);
//   } catch (error: any) {
//     return response.status(500).json(error.message);
//   }
// });

// // GET : findAll
// entitiesRouter.get("/", async (request: Request, response: Response) => {
//   try {
//     const all = await prisma.entities.findMany({
//       // include: {
//       //   tags: {
//       //     select: {
//       //       id: true,
//       //       name: true,
//       //     },
//       //   },
//       // },
//     });
//     return response.status(200).json(all);
//   } catch (error: any) {
//     return response.status(500).json(error.message);
//   }
// });

// // GET : findById
// entitiesRouter.get("/:id", async (request: Request, response: Response) => {
//   const id: number = parseInt(request.params.id, 10);
//   try {
//     const byId = await prisma.entities.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     if (byId) {
//       return response.status(200).json(byId);
//     } else {
//       return response.status(400).json("entity with id(" + id + ") not found");
//     }
//   } catch (error: any) {
//     return response.status(500).json(error.message);
//   }
// });

// // GET : getLazy
// entitiesRouter.get(
//   "/lazy/:filter",
//   async (request: Request, response: Response) => {
//     // Get Request react filter
//     const reqFilter: any = JSON.parse(request.params.filter);
//     // console.log(reqFilter);

//     // Manage Filters and sorting
//     const model = new Model();
//     // console.log("Request Filters", reqFilter.filters);
//     // console.log("Request Sorting", reqFilter.multiSortMetaData);
//     const whereClause = model.convFilterReactToPrisma(reqFilter.filters);
//     const sortingClause = model.convSortingReactToPrisma(
//       reqFilter.multiSortMeta
//     );

//     // console.log("whereClause", whereClause);
//     // console.log("sortingClause", sortingClause);

//     /**
//      * Process request
//      */
//     try {
//       const result = await prisma.entities.findMany({
//         skip: parseInt(reqFilter.page, 10) * parseInt(reqFilter.rows, 10),
//         take: parseInt(reqFilter.rows),
//         where: whereClause,
//         orderBy: sortingClause,
//       });

//       if (result) {
//         return response.status(200).json(result);
//       } else {
//         const status400 = '{ "status": 400, "message": "Bad request" }';
//         return response.status(400).json(status400);
//       }
//     } catch (error: any) {
//       return response.status(500).json(error.message);
//     }
//   }
// );

// // GET : getLazy count
// entitiesRouter.get(
//   "/lazy/count/:filter",
//   async (request: Request, response: Response) => {
//     // Get Request react filter
//     const reqFilter: any = JSON.parse(request.params.filter);
//     // console.log(reqFilter);

//     // Manage Filters and sorting
//     const model = new Model();
//     // console.log("Request Filters", reqFilter.filters);
//     // console.log("Request Sorting", reqFilter.multiSortMetaData);
//     const whereClause = model.convFilterReactToPrisma(reqFilter.filters);
//     const sortingClause = model.convSortingReactToPrisma(
//       reqFilter.multiSortMeta
//     );

//     // console.log("whereClause", whereClause);
//     // console.log("sortingClause", sortingClause);

//     try {
//       const all = await prisma.entities.count({
//         where: whereClause,
//         orderBy: sortingClause,
//       });

//       if (all) {
//         // console.log(all);
//         return response.status(200).json(all);
//       } else {
//         return response.status(400).json("entity is empty");
//       }
//     } catch (error: any) {
//       return response.status(500).json(error.message);
//     }
//   }
// );

// // POST : Create
// // Params : deleted, entity, designation, main, activated
// // entitiesRouter.post(
// //   "/",
// //   body("deleted").isBoolean(),
// //   body("entity").isString(),
// //   body("designation").isString(),
// //   body("main").isBoolean(),
// //   body("activated").isBoolean(),
// //   async (request: Request, response: Response) => {
// //     const errors = validationResult(request);
// //     if (!errors.isEmpty()) {
// //       return response.status(400).json({ errors: errors.array() });
// //     }
// //     // try {
// //     //   const entity = request.body;
// //     //   const newEntity = await prisma.entities.create(entity);
// //     //   return response.status(201).json(newEntity);
// //     // } catch (error: any) {
// //     //   return response.status(500).json(error.message);
// //     // }
// //     return response.status(400).json({ errors: "No implemented !" });
// //   }
// // );

// entitiesRouter.post(
//   "/",
//   entityValidate(entitiesCreateSchema),
//   entityRegister
// );

// // POST : Update
// //
// entitiesRouter.put(
//   "/:id",
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
//     //   const updateEntity = await prisma.entities.update(entity, id);
//     //   return response.status(200).json(updateEntity);
//     // } catch (error: any) {
//     //   return response.status(500).json(error.message);
//     // }
//     return response.status(400).json({ errors: "No implemented !" });
//   }
// );

// // DELETE
// entitiesRouter.delete("/:id", async (request: Request, response: Response) => {
//   const id: number = parseInt(request.params.id, 10);

//   // try {
//   //   await prisma.entities.delete(id);
//   //   return response.status(204).json("Entity has been successfully deleted");
//   // } catch (error: any) {
//   //   return response.status(500).json(error.message);
//   // }
//   return response.status(400).json({ errors: "No implemented !" });
// });
