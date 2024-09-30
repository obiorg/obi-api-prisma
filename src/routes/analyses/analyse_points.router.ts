import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { PointsCreateSchema, PointsDeleteSchema, PointsUpdateSchema } from "../../schemas/analysesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/analyses/AnalysePointsController");

export const analysePointsRouter = express.Router();

// list of all catalog
analysePointsRouter.get("/", controller.list);

// count of all catalog
analysePointsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
analysePointsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
analysePointsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
analysePointsRouter.get("/:id", controller.detail);

// create catalog rendering template
analysePointsRouter.get("/create", controller.create_get);

// create catalog 
analysePointsRouter.post("/", validateSchema(PointsCreateSchema), controller.create_post);

// update catalog rendering template
analysePointsRouter.get("/update", controller.update_get);

// update catalog 
analysePointsRouter.put("/:id", validateSchema(PointsUpdateSchema), controller.update_post);

// delete catalog rendering template 
analysePointsRouter.get("/delete", controller.delete_get);

// delete catalog 
analysePointsRouter.delete("/:id", validateSchema(PointsDeleteSchema), controller.delete_post);

// download catalog rendering template
analysePointsRouter.get("/download/:filter", controller.download_lazy);

 