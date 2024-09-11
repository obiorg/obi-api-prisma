import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { CountriesCreateSchema, CountriesDeleteSchema, CountriesUpdateSchema } from "../../schemas/localisationsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/localisations/CountriesController");

export const countriesRouter = express.Router();

// list of all catalog
countriesRouter.get("/", controller.list);

// count of all catalog
countriesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
countriesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
countriesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
countriesRouter.get("/:id", controller.detail);

// create catalog rendering template
countriesRouter.get("/create", controller.create_get);

// create catalog 
countriesRouter.post("/", validateSchema(CountriesCreateSchema), controller.create_post);

// update catalog rendering template
countriesRouter.get("/update", controller.update_get);

// update catalog 
countriesRouter.put("/:id", validateSchema(CountriesUpdateSchema), controller.update_post);

// delete catalog rendering template 
countriesRouter.get("/delete", controller.delete_get);

// delete catalog 
countriesRouter.delete("/:id", validateSchema(CountriesDeleteSchema), controller.delete_post);


