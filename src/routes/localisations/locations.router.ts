import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema, validateSchemas } from "../../middleware/validationMDW";
import { LocationsCreateSchema, LocationsDeleteSchema, LocationsUpdateSchema } from "../../schemas/localisationsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/localisations/LocationsController");

export const locationsRouter = express.Router();

// list of all catalog
locationsRouter.get("/", controller.list);

// count of all catalog
locationsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
locationsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
locationsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
locationsRouter.get("/:id", controller.detail);

// create catalog rendering template
locationsRouter.get("/create", controller.create_get);

// create catalog 
locationsRouter.post("/", validateSchema(LocationsCreateSchema), controller.create_post);

// create catalogs
locationsRouter.post("/create", validateSchemas(LocationsCreateSchema), controller.createMany_post);

// update catalog rendering template
locationsRouter.get("/update", controller.update_get);

// update catalog 
locationsRouter.put("/:id", validateSchema(LocationsUpdateSchema), controller.update_post);

// update catalogs
locationsRouter.post("/update", validateSchemas(LocationsUpdateSchema), controller.updateMany_post);

// delete catalog rendering template 
locationsRouter.get("/delete", controller.delete_get);

// delete catalog 
locationsRouter.delete("/:id", validateSchema(LocationsDeleteSchema), controller.delete_post);

// update catalogs
locationsRouter.post("/delete", validateSchemas(LocationsDeleteSchema), controller.deleteMany_post);

// download catalog rendering template
locationsRouter.get("/download/:filter", controller.download_lazy);

 