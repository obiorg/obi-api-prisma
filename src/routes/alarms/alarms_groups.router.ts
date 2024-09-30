import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { GroupesCreateSchema, GroupesDeleteSchema, GroupesUpdateSchema } from "../../schemas/alarmsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/alarms/AlarmsGroupsController");

export const alarmsGroupsRouter = express.Router();

// list of all catalog
alarmsGroupsRouter.get("/", controller.list);

// count of all catalog
alarmsGroupsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
alarmsGroupsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
alarmsGroupsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
alarmsGroupsRouter.get("/:id", controller.detail);

// create catalog rendering template
alarmsGroupsRouter.get("/create", controller.create_get);

// create catalog 
alarmsGroupsRouter.post("/", validateSchema(GroupesCreateSchema), controller.create_post);

// update catalog rendering template
alarmsGroupsRouter.get("/update", controller.update_get);

// update catalog 
alarmsGroupsRouter.put("/:id", validateSchema(GroupesUpdateSchema), controller.update_post);

// delete catalog rendering template 
alarmsGroupsRouter.get("/delete", controller.delete_get);

// delete catalog 
alarmsGroupsRouter.delete("/:id", validateSchema(GroupesDeleteSchema), controller.delete_post);

// download catalog rendering template
alarmsGroupsRouter.get("/download/:filter", controller.download_lazy);

 