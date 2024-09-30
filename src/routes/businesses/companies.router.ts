import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { CompaniesCreateSchema, CompaniesDeleteSchema, CompaniesUpdateSchema } from "../../schemas/businessesSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/businesses/CompaniesController");

export const companiesRouter = express.Router();

// list of all catalog
companiesRouter.get("/", controller.list);

// count of all catalog
companiesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
companiesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
companiesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
companiesRouter.get("/:id", controller.detail);

// create catalog rendering template
companiesRouter.get("/create", controller.create_get);

// create catalog 
companiesRouter.post("/", validateSchema(CompaniesCreateSchema), controller.create_post);

// update catalog rendering template
companiesRouter.get("/update", controller.update_get);

// update catalog 
companiesRouter.put("/:id", validateSchema(CompaniesUpdateSchema), controller.update_post);

// delete catalog rendering template 
companiesRouter.get("/delete", controller.delete_get);

// delete catalog 
companiesRouter.delete("/:id", validateSchema(CompaniesDeleteSchema), controller.delete_post);

// download catalog rendering template
companiesRouter.get("/download/:filter", controller.download_lazy);

 