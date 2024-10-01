import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { MeasuresLimitsCreateSchema, MeasuresLimitsDeleteSchema, MeasuresLimitsUpdateSchema } from "../../schemas/measuresSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/measures/MeasuresLimitsController");

export const measuresLimitsRouter = express.Router();

// list of all catalog
measuresLimitsRouter.get("/", controller.list);

// count of all catalog
measuresLimitsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
measuresLimitsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
measuresLimitsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
measuresLimitsRouter.get("/:id", controller.detail);

// create catalog rendering template
measuresLimitsRouter.get("/create", controller.create_get);

// create catalog 
measuresLimitsRouter.post("/", validateSchema(MeasuresLimitsCreateSchema), controller.create_post);

// update catalog rendering template
measuresLimitsRouter.get("/update", controller.update_get);

// update catalog 
measuresLimitsRouter.put("/:id", validateSchema(MeasuresLimitsUpdateSchema), controller.update_post);

// delete catalog rendering template 
measuresLimitsRouter.get("/delete", controller.delete_get);

// delete catalog 
measuresLimitsRouter.delete("/:id", validateSchema(MeasuresLimitsDeleteSchema), controller.delete_post);

// download catalog rendering template
measuresLimitsRouter.get("/download/:filter", controller.download_lazy);

 