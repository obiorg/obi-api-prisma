import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { RegionsCreateSchema, RegionsDeleteSchema, RegionsUpdateSchema } from "../../schemas/localisationsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/localisations/RegionsController");

export const regionsRouter = express.Router();

// list of all catalog
regionsRouter.get("/", controller.list);

// count of all catalog
regionsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
regionsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
regionsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
regionsRouter.get("/:id", controller.detail);

// create catalog rendering template
regionsRouter.get("/create", controller.create_get);

// create catalog 
regionsRouter.post("/", validateSchema(RegionsCreateSchema), controller.create_post);

// update catalog rendering template
regionsRouter.get("/update", controller.update_get);

// update catalog 
regionsRouter.put("/:id", validateSchema(RegionsUpdateSchema), controller.update_post);

// delete catalog rendering template 
regionsRouter.get("/delete", controller.delete_get);

// delete catalog 
regionsRouter.delete("/:id", validateSchema(RegionsDeleteSchema), controller.delete_post);


