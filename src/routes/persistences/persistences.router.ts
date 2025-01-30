import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema, validateSchemas } from "../../middleware/validationMDW";
import { PersistencesCreateSchema, PersistencesDeleteSchema, PersistencesUpdateSchema } from "../../schemas/persistencesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/persistences/PersistencesController");

export const persistencesRouter = express.Router();


// list of all catalog
persistencesRouter.get("/", controller.list);

// count of all catalog
persistencesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
persistencesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
persistencesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
persistencesRouter.get("/:id", controller.detail);

// create catalog rendering template
persistencesRouter.get("/create", validateSchemas(PersistencesCreateSchema),  controller.create_get);

// create catalog 
persistencesRouter.post("/", validateSchema(PersistencesCreateSchema), controller.create_post);

// create catalog rendering template
persistencesRouter.post("/create",  validateSchemas(PersistencesCreateSchema), controller.createMany_post);

// update catalog rendering template
persistencesRouter.get("/update", controller.update_get);

// update catalog 
persistencesRouter.put("/:id", validateSchema(PersistencesUpdateSchema), controller.update_post);

// update catalogs
persistencesRouter.post("/update", validateSchemas(PersistencesUpdateSchema), controller.updateMany_post);

// delete catalog rendering template 
persistencesRouter.get("/delete", controller.delete_get);

// delete catalog 
persistencesRouter.delete("/:id", validateSchema(PersistencesDeleteSchema), controller.delete_post);

// update catalogs
persistencesRouter.post("/delete", validateSchemas(PersistencesDeleteSchema), controller.deleteMany_post);

// download catalog rendering template
persistencesRouter.get("/download/:filter", controller.download_lazy);

 