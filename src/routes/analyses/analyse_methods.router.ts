import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { MethodsCreateSchema, MethodsDeleteSchema, MethodsUpdateSchema } from "../../schemas/analysesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/analyses/AnalyseMethodsController");

export const analyseMethodsRouter = express.Router();

// list of all catalog
analyseMethodsRouter.get("/", controller.list);

// count of all catalog
analyseMethodsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
analyseMethodsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
analyseMethodsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
analyseMethodsRouter.get("/:id", controller.detail);

// create catalog rendering template
analyseMethodsRouter.get("/create", controller.create_get);

// create catalog 
analyseMethodsRouter.post("/", validateSchema(MethodsCreateSchema), controller.create_post);

// update catalog rendering template
analyseMethodsRouter.get("/update", controller.update_get);

// update catalog 
analyseMethodsRouter.put("/:id", validateSchema(MethodsUpdateSchema), controller.update_post);

// delete catalog rendering template 
analyseMethodsRouter.get("/delete", controller.delete_get);

// delete catalog 
analyseMethodsRouter.delete("/:id", validateSchema(MethodsDeleteSchema), controller.delete_post);

// download catalog rendering template
analyseMethodsRouter.get("/download/:filter", controller.download_lazy);

 