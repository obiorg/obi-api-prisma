import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { PrismaClient } from "@prisma/client";
import { Model } from "../../utils/model";
import { validateSchema } from "../../middleware/validationMDW";
import { CitiesCreateSchema, CitiesDeleteSchema, CitiesUpdateSchema } from "../../schemas/localisationsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/localisations/CitiesController");

export const citiesRouter = express.Router();

// list of all catalog
citiesRouter.get("/", controller.list);

// count of all catalog
citiesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
citiesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
citiesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
citiesRouter.get("/:id", controller.detail);

// create catalog rendering template
citiesRouter.get("/create", controller.create_get);

// create catalog 
citiesRouter.post("/", validateSchema(CitiesCreateSchema), controller.create_post);

// update catalog rendering template
citiesRouter.get("/update", controller.update_get);

// update catalog 
citiesRouter.put("/:id", validateSchema(CitiesUpdateSchema), controller.update_post);

// delete catalog rendering template 
citiesRouter.get("/delete", controller.delete_get);

// delete catalog 
citiesRouter.delete("/:id", validateSchema(CitiesDeleteSchema), controller.delete_post);

// download catalog rendering template
citiesRouter.get("/download/:filter", controller.download_lazy);

 

