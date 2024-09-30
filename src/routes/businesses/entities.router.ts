import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { EntitiesCreateSchema, EntitiesDeleteSchema, EntitiesUpdateSchema } from "../../schemas/businessesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/businesses/EntitiesController");

export const entitiesRouter = express.Router();

// list of all catalog
entitiesRouter.get("/", controller.list);

// count of all catalog
entitiesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
entitiesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
entitiesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
entitiesRouter.get("/:id", controller.detail);

// create catalog rendering template
entitiesRouter.get("/create", controller.create_get);

// create catalog 
entitiesRouter.post("/", validateSchema(EntitiesCreateSchema), controller.create_post);

// update catalog rendering template
entitiesRouter.get("/update", controller.update_get);

// update catalog 
entitiesRouter.put("/:id", validateSchema(EntitiesUpdateSchema), controller.update_post);

// delete catalog rendering template 
entitiesRouter.get("/delete", controller.delete_get);

// delete catalog 
entitiesRouter.delete("/:id", validateSchema(EntitiesDeleteSchema), controller.delete_post);

// download catalog rendering template
entitiesRouter.get("/download/:filter", controller.download_lazy);

 