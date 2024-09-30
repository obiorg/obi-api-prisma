import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { EquipementsExternalProvidersCreateSchema, EquipementsExternalProvidersDeleteSchema, EquipementsExternalProvidersUpdateSchema } from "../../schemas/maintenanceSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/maintenance/EquipementsExternalProvidersController");

export const equipementsExternalProvidersRouter = express.Router();

// list of all catalog
equipementsExternalProvidersRouter.get("/", controller.list);

// count of all catalog
equipementsExternalProvidersRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
equipementsExternalProvidersRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
equipementsExternalProvidersRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
equipementsExternalProvidersRouter.get("/:id", controller.detail);

// create catalog rendering template
equipementsExternalProvidersRouter.get("/create", controller.create_get);

// create catalog 
equipementsExternalProvidersRouter.post("/", validateSchema(EquipementsExternalProvidersCreateSchema), controller.create_post);

// update catalog rendering template
equipementsExternalProvidersRouter.get("/update", controller.update_get);

// update catalog 
equipementsExternalProvidersRouter.put("/:id", validateSchema(EquipementsExternalProvidersUpdateSchema), controller.update_post);

// delete catalog rendering template 
equipementsExternalProvidersRouter.get("/delete", controller.delete_get);

// delete catalog 
equipementsExternalProvidersRouter.delete("/:id", validateSchema(EquipementsExternalProvidersDeleteSchema), controller.delete_post);

// download catalog rendering template
equipementsExternalProvidersRouter.get("/download/:filter", controller.download_lazy);

 