import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { CategoriesCreateSchema, CategoriesDeleteSchema, CategoriesUpdateSchema } from "../../schemas/analysesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/analyses/AnalyseCategoriesController");

export const analyseCategoriesRouter = express.Router();

// list of all catalog
analyseCategoriesRouter.get("/", controller.list);

// count of all catalog
analyseCategoriesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
analyseCategoriesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
analyseCategoriesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
analyseCategoriesRouter.get("/:id", controller.detail);

// create catalog rendering template
analyseCategoriesRouter.get("/create", controller.create_get);

// create catalog 
analyseCategoriesRouter.post("/", validateSchema(CategoriesCreateSchema), controller.create_post);

// update catalog rendering template
analyseCategoriesRouter.get("/update", controller.update_get);

// update catalog 
analyseCategoriesRouter.put("/:id", validateSchema(CategoriesUpdateSchema), controller.update_post);

// delete catalog rendering template 
analyseCategoriesRouter.get("/delete", controller.delete_get);

// delete catalog 
analyseCategoriesRouter.delete("/:id", validateSchema(CategoriesDeleteSchema), controller.delete_post);

// download catalog rendering template
analyseCategoriesRouter.get("/download/:filter", controller.download_lazy);

 