import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { TypesCreateSchema, TypesDeleteSchema, TypesUpdateSchema } from "../../schemas/analysesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/analyses/AnalyseTypesController");

export const analyseTypesRouter = express.Router();

// list of all catalog
analyseTypesRouter.get("/", controller.list);

// count of all catalog
analyseTypesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
analyseTypesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
analyseTypesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
analyseTypesRouter.get("/:id", controller.detail);

// create catalog rendering template
analyseTypesRouter.get("/create", controller.create_get);

// create catalog 
analyseTypesRouter.post("/", validateSchema(TypesCreateSchema), controller.create_post);

// update catalog rendering template
analyseTypesRouter.get("/update", controller.update_get);

// update catalog 
analyseTypesRouter.put("/:id", validateSchema(TypesUpdateSchema), controller.update_post);

// delete catalog rendering template 
analyseTypesRouter.get("/delete", controller.delete_get);

// delete catalog 
analyseTypesRouter.delete("/:id", validateSchema(TypesDeleteSchema), controller.delete_post);

// download catalog rendering template
analyseTypesRouter.get("/download/:filter", controller.download_lazy);

 