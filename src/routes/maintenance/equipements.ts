import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { EquipementsCreateSchema, EquipementsDeleteSchema, EquipementsUpdateSchema } from "../../schemas/maintenanceSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/maintenance/EquipementsController");

export const equipementsRouter = express.Router();

// list of all catalog
equipementsRouter.get("/", controller.list);

// count of all catalog
equipementsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
equipementsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
equipementsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
equipementsRouter.get("/:id", controller.detail);

// create catalog rendering template
equipementsRouter.get("/create", controller.create_get);

// create catalog 
equipementsRouter.post("/", validateSchema(EquipementsCreateSchema), controller.create_post);

// update catalog rendering template
equipementsRouter.get("/update", controller.update_get);

// update catalog 
equipementsRouter.put("/:id", validateSchema(EquipementsUpdateSchema), controller.update_post);

// delete catalog rendering template 
equipementsRouter.get("/delete", controller.delete_get);

// delete catalog 
equipementsRouter.delete("/:id", validateSchema(EquipementsDeleteSchema), controller.delete_post);

// download catalog rendering template
equipementsRouter.get("/download/:filter", controller.download_lazy);

 