import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { PersistencesStandardsLimitsCreateSchema, PersistencesStandardsLimitsDeleteSchema, PersistencesStandardsLimitsUpdateSchema } from "../../schemas/persistencesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/persistences/PersistencesStandardsLimitsController");

export const persistencesStandardsLimitsRouter = express.Router();

// list of all catalog
persistencesStandardsLimitsRouter.get("/", controller.list);

// count of all catalog
persistencesStandardsLimitsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
persistencesStandardsLimitsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
persistencesStandardsLimitsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
persistencesStandardsLimitsRouter.get("/:id", controller.detail);

// create catalog rendering template
persistencesStandardsLimitsRouter.get("/create", controller.create_get);

// create catalog 
persistencesStandardsLimitsRouter.post("/", validateSchema(PersistencesStandardsLimitsCreateSchema), controller.create_post);

// update catalog rendering template
persistencesStandardsLimitsRouter.get("/update", controller.update_get);

// update catalog 
persistencesStandardsLimitsRouter.put("/:id", validateSchema(PersistencesStandardsLimitsUpdateSchema), controller.update_post);

// delete catalog rendering template 
persistencesStandardsLimitsRouter.get("/delete", controller.delete_get);

// delete catalog 
persistencesStandardsLimitsRouter.delete("/:id", validateSchema(PersistencesStandardsLimitsDeleteSchema), controller.delete_post);

// download catalog rendering template
persistencesStandardsLimitsRouter.get("/download/:filter", controller.download_lazy);

 