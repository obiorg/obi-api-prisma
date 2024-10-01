import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { MeasuresComparatorsCreateSchema, MeasuresComparatorsDeleteSchema, MeasuresComparatorsUpdateSchema } from "../../schemas/measuresSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/measures/MeasuresComparatorsController");

export const measuresComparatorsRouter = express.Router();

// list of all catalog
measuresComparatorsRouter.get("/", controller.list);

// count of all catalog
measuresComparatorsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
measuresComparatorsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
measuresComparatorsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
measuresComparatorsRouter.get("/:id", controller.detail);

// create catalog rendering template
measuresComparatorsRouter.get("/create", controller.create_get);

// create catalog 
measuresComparatorsRouter.post("/", validateSchema(MeasuresComparatorsCreateSchema), controller.create_post);

// update catalog rendering template
measuresComparatorsRouter.get("/update", controller.update_get);

// update catalog 
measuresComparatorsRouter.put("/:id", validateSchema(MeasuresComparatorsUpdateSchema), controller.update_post);

// delete catalog rendering template 
measuresComparatorsRouter.get("/delete", controller.delete_get);

// delete catalog 
measuresComparatorsRouter.delete("/:id", validateSchema(MeasuresComparatorsDeleteSchema), controller.delete_post);

// download catalog rendering template
measuresComparatorsRouter.get("/download/:filter", controller.download_lazy);

 