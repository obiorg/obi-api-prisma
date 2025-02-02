import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { PersistencesStandardsCreateSchema, PersistencesStandardsDeleteSchema, PersistencesStandardsUpdateSchema } from "../../schemas/persistencesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/persistences/PersistencesStandardsController");

export const persistencesStandardsRouter = express.Router();

// list of all catalog
persistencesStandardsRouter.get("/", controller.list);

// list of all catalog on field from, to, sortByField, sortOrder
persistencesStandardsRouter.get("/tag/:tag/from/:from/to/:to/sortField/:sortField/order/:order", controller.dedicatedCatalogByTag);

// count of all catalog
persistencesStandardsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
persistencesStandardsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
persistencesStandardsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
persistencesStandardsRouter.get("/:id", controller.detail);

// create catalog rendering template
persistencesStandardsRouter.get("/create", controller.create_get);

// create catalog 
persistencesStandardsRouter.post("/", validateSchema(PersistencesStandardsCreateSchema), controller.create_post);

// update catalog rendering template
persistencesStandardsRouter.get("/update", controller.update_get);

// update catalog 
persistencesStandardsRouter.put("/:id", validateSchema(PersistencesStandardsUpdateSchema), controller.update_post);

// delete catalog rendering template 
persistencesStandardsRouter.get("/delete", controller.delete_get);

// delete catalog 
persistencesStandardsRouter.delete("/:id", validateSchema(PersistencesStandardsDeleteSchema), controller.delete_post);

// download catalog rendering template
persistencesStandardsRouter.get("/download/:filter", controller.download_lazy);

// SP On changing value get Average, Minimal, Maximal arrange by hour
persistencesStandardsRouter.get("/average/min/max/hour/:tag/:hours", controller.averageMinMaxHours);

// SP On changing value get Average, Minimal, Maximal arrange by hour
persistencesStandardsRouter.get("/average/min/max/day/:tag/:days", controller.averageMinMaxDays);

// SP On changing value get Average, Minimal, Maximal arrange by hour
persistencesStandardsRouter.get("/average/min/max/month/:tag/:months", controller.averageMinMaxMonths);