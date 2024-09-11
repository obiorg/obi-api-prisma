import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { SubRegionsCreateSchema, SubRegionsDeleteSchema, SubRegionsUpdateSchema } from "../../schemas/localisationsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/localisations/SubRegionsController");

export const subRegionsRouter = express.Router();

// list of all catalog
subRegionsRouter.get("/", controller.list);

// count of all catalog
subRegionsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
subRegionsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
subRegionsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
subRegionsRouter.get("/:id", controller.detail);

// create catalog rendering template
subRegionsRouter.get("/create", controller.create_get);

// create catalog 
subRegionsRouter.post("/", validateSchema(SubRegionsCreateSchema), controller.create_post);

// update catalog rendering template
subRegionsRouter.get("/update", controller.update_get);

// update catalog 
subRegionsRouter.put("/:id", validateSchema(SubRegionsUpdateSchema), controller.update_post);

// delete catalog rendering template 
subRegionsRouter.get("/delete", controller.delete_get);

// delete catalog 
subRegionsRouter.delete("/:id", validateSchema(SubRegionsDeleteSchema), controller.delete_post);


