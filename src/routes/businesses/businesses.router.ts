import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { BusinessesCreateSchema, BusinessesDeleteSchema, BusinessesUpdateSchema } from "../../schemas/businessesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/businesses/BusinessesController");

export const businessesRouter = express.Router();

// list of all catalog
businessesRouter.get("/", controller.list);

// count of all catalog
businessesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
businessesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
businessesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
businessesRouter.get("/:id", controller.detail);

// create catalog rendering template
businessesRouter.get("/create", controller.create_get);

// create catalog 
businessesRouter.post("/", validateSchema(BusinessesCreateSchema), controller.create_post);

// update catalog rendering template
businessesRouter.get("/update", controller.update_get);

// update catalog 
businessesRouter.put("/:id", validateSchema(BusinessesUpdateSchema), controller.update_post);

// delete catalog rendering template 
businessesRouter.get("/delete", controller.delete_get);

// delete catalog 
businessesRouter.delete("/:id", validateSchema(BusinessesDeleteSchema), controller.delete_post);

// download catalog rendering template
businessesRouter.get("/download/:filter", controller.download_lazy);

 