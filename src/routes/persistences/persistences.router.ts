import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { PersistencesCreateSchema, PersistencesDeleteSchema, PersistencesUpdateSchema } from "../../schemas/persistencesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/persistences/PersistencesController");

export const persistencesRouter = express.Router();


//Get All Students
// list of all catalog
persistencesRouter.get("/", controller.list);

// count of all catalog
persistencesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
persistencesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
persistencesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
persistencesRouter.get("/:id", controller.detail);

// create catalog rendering template
persistencesRouter.get("/create", controller.create_get);

// create catalog 
persistencesRouter.post("/", validateSchema(PersistencesCreateSchema), controller.create_post);

// update catalog rendering template
persistencesRouter.get("/update", controller.update_get);

// update catalog 
persistencesRouter.put("/:id", validateSchema(PersistencesUpdateSchema), controller.update_post);

// delete catalog rendering template 
persistencesRouter.get("/delete", controller.delete_get);

// delete catalog 
persistencesRouter.delete("/:id", validateSchema(PersistencesDeleteSchema), controller.delete_post);

// download catalog rendering template
persistencesRouter.get("/download/:filter", controller.download_lazy);

 