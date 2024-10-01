import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { MeasuresLimitsGroupsCreateSchema, MeasuresLimitsGroupsDeleteSchema, MeasuresLimitsGroupsUpdateSchema } from "../../schemas/measuresSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/measures/MeasuresLimitsGroupsController");

export const measuresLimitsGroupsRouter = express.Router();

// list of all catalog
measuresLimitsGroupsRouter.get("/", controller.list);

// count of all catalog
measuresLimitsGroupsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
measuresLimitsGroupsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
measuresLimitsGroupsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
measuresLimitsGroupsRouter.get("/:id", controller.detail);

// create catalog rendering template
measuresLimitsGroupsRouter.get("/create", controller.create_get);

// create catalog 
measuresLimitsGroupsRouter.post("/", validateSchema(MeasuresLimitsGroupsCreateSchema), controller.create_post);

// update catalog rendering template
measuresLimitsGroupsRouter.get("/update", controller.update_get);

// update catalog 
measuresLimitsGroupsRouter.put("/:id", validateSchema(MeasuresLimitsGroupsUpdateSchema), controller.update_post);

// delete catalog rendering template 
measuresLimitsGroupsRouter.get("/delete", controller.delete_get);

// delete catalog 
measuresLimitsGroupsRouter.delete("/:id", validateSchema(MeasuresLimitsGroupsDeleteSchema), controller.delete_post);

// download catalog rendering template
measuresLimitsGroupsRouter.get("/download/:filter", controller.download_lazy);

 