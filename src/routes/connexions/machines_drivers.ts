import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { MachinesDriversCreateSchema, MachinesDriversDeleteSchema, MachinesDriversUpdateSchema } from "../../schemas/connexionsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/connexions/MachinesDriversController");

export const machinesDriversRouter = express.Router();

// list of all catalog
machinesDriversRouter.get("/", controller.list);

// count of all catalog
machinesDriversRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
machinesDriversRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
machinesDriversRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
machinesDriversRouter.get("/:id", controller.detail);

// create catalog rendering template
machinesDriversRouter.get("/create", controller.create_get);

// create catalog 
machinesDriversRouter.post("/", validateSchema(MachinesDriversCreateSchema), controller.create_post);

// update catalog rendering template
machinesDriversRouter.get("/update", controller.update_get);

// update catalog 
machinesDriversRouter.put("/:id", validateSchema(MachinesDriversUpdateSchema), controller.update_post);

// delete catalog rendering template 
machinesDriversRouter.get("/delete", controller.delete_get);

// delete catalog 
machinesDriversRouter.delete("/:id", validateSchema(MachinesDriversDeleteSchema), controller.delete_post);

// download catalog rendering template
machinesDriversRouter.get("/download/:filter", controller.download_lazy);

 