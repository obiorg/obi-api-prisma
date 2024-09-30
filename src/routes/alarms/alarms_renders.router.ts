import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { RendersCreateSchema, RendersDeleteSchema, RendersUpdateSchema } from "../../schemas/alarmsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/alarms/AlarmsRendersController");

export const alarmsRendersRouter = express.Router();

// list of all catalog
alarmsRendersRouter.get("/", controller.list);

// count of all catalog
alarmsRendersRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
alarmsRendersRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
alarmsRendersRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
alarmsRendersRouter.get("/:id", controller.detail);

// create catalog rendering template
alarmsRendersRouter.get("/create", controller.create_get);

// create catalog 
alarmsRendersRouter.post("/", validateSchema(RendersCreateSchema), controller.create_post);

// update catalog rendering template
alarmsRendersRouter.get("/update", controller.update_get);

// update catalog 
alarmsRendersRouter.put("/:id", validateSchema(RendersUpdateSchema), controller.update_post);

// delete catalog rendering template 
alarmsRendersRouter.get("/delete", controller.delete_get);

// delete catalog 
alarmsRendersRouter.delete("/:id", validateSchema(RendersDeleteSchema), controller.delete_post);

// download catalog rendering template
alarmsRendersRouter.get("/download/:filter", controller.download_lazy);

 