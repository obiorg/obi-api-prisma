import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema, validateSchemas } from "../../middleware/validationMDW";
import { MachinesCreateSchema, MachinesDeleteSchema, MachinesUpdateSchema } from "../../schemas/connexionsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/connexions/MachinesController");

export const machinesRouter = express.Router();

// list of all catalog
machinesRouter.get("/", controller.list);

// count of all catalog
machinesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
machinesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
machinesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
machinesRouter.get("/:id", controller.detail);

// create catalog rendering template
machinesRouter.get("/create", controller.create_get);

// create catalog 
machinesRouter.post("/", validateSchema(MachinesCreateSchema), controller.create_post);

// create catalogs
machinesRouter.post("/create", validateSchemas(MachinesCreateSchema), controller.createMany_post);

// update catalog rendering template
machinesRouter.get("/update", controller.update_get);

// update catalog 
machinesRouter.put("/:id", validateSchema(MachinesUpdateSchema), controller.update_post);

// update catalogs
machinesRouter.post("/update", validateSchemas(MachinesUpdateSchema), controller.updateMany_post);

// delete catalog rendering template 
machinesRouter.get("/delete", controller.delete_get);

// delete catalog 
machinesRouter.delete("/:id", validateSchema(MachinesDeleteSchema), controller.delete_post);

// update catalogs
machinesRouter.post("/delete", validateSchemas(MachinesDeleteSchema), controller.deleteMany_post);

// download catalog rendering template
machinesRouter.get("/download/:filter", controller.download_lazy);

 