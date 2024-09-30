import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { AllowedCreateSchema, AllowedDeleteSchema, AllowedUpdateSchema } from "../../schemas/analysesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/analyses/AnalyseAllowedController");

export const analyseAllowedRouter = express.Router();

// list of all catalog
analyseAllowedRouter.get("/", controller.list);

// count of all catalog
analyseAllowedRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
analyseAllowedRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
analyseAllowedRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
analyseAllowedRouter.get("/:id", controller.detail);

// create catalog rendering template
analyseAllowedRouter.get("/create", controller.create_get);

// create catalog 
analyseAllowedRouter.post("/", validateSchema(AllowedCreateSchema), controller.create_post);

// update catalog rendering template
analyseAllowedRouter.get("/update", controller.update_get);

// update catalog 
analyseAllowedRouter.put("/:id", validateSchema(AllowedUpdateSchema), controller.update_post);

// delete catalog rendering template 
analyseAllowedRouter.get("/delete", controller.delete_get);

// delete catalog 
analyseAllowedRouter.delete("/:id", validateSchema(AllowedDeleteSchema), controller.delete_post);

// download catalog rendering template
analyseAllowedRouter.get("/download/:filter", controller.download_lazy);

 