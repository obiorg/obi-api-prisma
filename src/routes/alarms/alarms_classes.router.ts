import express from "express";
import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { ClassesCreateSchema, ClassesDeleteSchema, ClassesUpdateSchema } from "../../schemas/alarmsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/alarms/AlarmsClassesController");

export const alarmsClassesRouter = express.Router();

// list of all catalog
alarmsClassesRouter.get("/", controller.list);

// count of all catalog
alarmsClassesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
alarmsClassesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
alarmsClassesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
alarmsClassesRouter.get("/:id", controller.detail);

// create catalog rendering template
alarmsClassesRouter.get("/create", controller.create_get);

// create catalog 
alarmsClassesRouter.post("/", validateSchema(ClassesCreateSchema), controller.create_post);

// update catalog rendering template
alarmsClassesRouter.get("/update", controller.update_get);

// update catalog 
alarmsClassesRouter.put("/:id", validateSchema(ClassesUpdateSchema), controller.update_post);

// delete catalog rendering template 
alarmsClassesRouter.get("/delete", controller.delete_get);

// delete catalog 
alarmsClassesRouter.delete("/:id", validateSchema(ClassesDeleteSchema), controller.delete_post);

// download catalog rendering template
alarmsClassesRouter.get("/download/:filter", controller.download_lazy);

 