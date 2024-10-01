import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { PersistencesMethodsCreateSchema, PersistencesMethodsDeleteSchema, PersistencesMethodsUpdateSchema } from "../../schemas/persistencesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/persistences/PersistencesMethodsController");

export const persistencesMethodsRouter = express.Router();

// list of all catalog
persistencesMethodsRouter.get("/", controller.list);

// count of all catalog
persistencesMethodsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
persistencesMethodsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
persistencesMethodsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
persistencesMethodsRouter.get("/:id", controller.detail);

// create catalog rendering template
persistencesMethodsRouter.get("/create", controller.create_get);

// create catalog 
persistencesMethodsRouter.post("/", validateSchema(PersistencesMethodsCreateSchema), controller.create_post);

// update catalog rendering template
persistencesMethodsRouter.get("/update", controller.update_get);

// update catalog 
persistencesMethodsRouter.put("/:id", validateSchema(PersistencesMethodsUpdateSchema), controller.update_post);

// delete catalog rendering template 
persistencesMethodsRouter.get("/delete", controller.delete_get);

// delete catalog 
persistencesMethodsRouter.delete("/:id", validateSchema(PersistencesMethodsDeleteSchema), controller.delete_post);

// download catalog rendering template
persistencesMethodsRouter.get("/download/:filter", controller.download_lazy);

 