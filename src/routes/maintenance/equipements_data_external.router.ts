import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { EquipementsDataExternalCreateSchema, EquipementsDataExternalDeleteSchema, EquipementsDataExternalUpdateSchema } from "../../schemas/maintenanceSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/maintenance/EquipementsDataExternalController");

export const equipementsDataExternalRouter = express.Router();

// list of all catalog
equipementsDataExternalRouter.get("/", controller.list);

// count of all catalog
equipementsDataExternalRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
equipementsDataExternalRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
equipementsDataExternalRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
equipementsDataExternalRouter.get("/:id", controller.detail);

// create catalog rendering template
equipementsDataExternalRouter.get("/create", controller.create_get);

// create catalog 
equipementsDataExternalRouter.post("/", validateSchema(EquipementsDataExternalCreateSchema), controller.create_post);

// update catalog rendering template
equipementsDataExternalRouter.get("/update", controller.update_get);

// update catalog 
equipementsDataExternalRouter.put("/:id", validateSchema(EquipementsDataExternalUpdateSchema), controller.update_post);

// delete catalog rendering template 
equipementsDataExternalRouter.get("/delete", controller.delete_get);

// delete catalog 
equipementsDataExternalRouter.delete("/:id", validateSchema(EquipementsDataExternalDeleteSchema), controller.delete_post);

// download catalog rendering template
equipementsDataExternalRouter.get("/download/:filter", controller.download_lazy);

 