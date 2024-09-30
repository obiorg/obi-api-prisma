import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { StatesCreateSchema, StatesDeleteSchema, StatesUpdateSchema } from "../../schemas/localisationsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/localisations/StatesController");

export const statesRouter = express.Router();

// list of all catalog
statesRouter.get("/", controller.list);

// count of all catalog
statesRouter.get("/count",  controller.list_count);

// list of filter catalog lazy loading
statesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
statesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
statesRouter.get("/:id", controller.detail);

// create catalog rendering template
statesRouter.get("/create", controller.create_get);

// create catalog 
statesRouter.post("/", validateSchema(StatesCreateSchema), controller.create_post);

// update catalog rendering template
statesRouter.get("/update", controller.update_get);

// update catalog 
statesRouter.put("/:id", validateSchema(StatesUpdateSchema), controller.update_post);

// delete catalog rendering template 
statesRouter.get("/delete", controller.delete_get);

// delete catalog 
statesRouter.delete("/:id", validateSchema(StatesDeleteSchema), controller.delete_post);

// download catalog rendering template
statesRouter.get("/download/:filter", controller.download_lazy);
