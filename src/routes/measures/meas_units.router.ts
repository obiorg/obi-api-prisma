import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { MeasuresUnitsCreateSchema, MeasuresUnitsDeleteSchema, MeasuresUnitsUpdateSchema } from "../../schemas/measuresSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/measures/MeasuresUnitsController");

export const measuresUnitsRouter = express.Router();

// list of all catalog
measuresUnitsRouter.get("/", controller.list);

// count of all catalog
measuresUnitsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
measuresUnitsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
measuresUnitsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
measuresUnitsRouter.get("/:id", controller.detail);

// create catalog rendering template
measuresUnitsRouter.get("/create", controller.create_get);

// create catalog 
measuresUnitsRouter.post("/", validateSchema(MeasuresUnitsCreateSchema), controller.create_post);

// update catalog rendering template
measuresUnitsRouter.get("/update", controller.update_get);

// update catalog 
measuresUnitsRouter.put("/:id", validateSchema(MeasuresUnitsUpdateSchema), controller.update_post);

// delete catalog rendering template 
measuresUnitsRouter.get("/delete", controller.delete_get);

// delete catalog 
measuresUnitsRouter.delete("/:id", validateSchema(MeasuresUnitsDeleteSchema), controller.delete_post);

// download catalog rendering template
measuresUnitsRouter.get("/download/:filter", controller.download_lazy);

 