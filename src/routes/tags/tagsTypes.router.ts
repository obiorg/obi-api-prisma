import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { TagsTypesCreateSchema, TagsTypesDeleteSchema, TagsTypesUpdateSchema } from "../../schemas/tagsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/tags/TagsTypesController");

export const tagsTypesRouter = express.Router();

// list of all catalog
tagsTypesRouter.get("/", controller.list);

// count of all catalog
tagsTypesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
tagsTypesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
tagsTypesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
tagsTypesRouter.get("/:id", controller.detail);

// create catalog rendering template
tagsTypesRouter.get("/create", controller.create_get);

// create catalog 
tagsTypesRouter.post("/", validateSchema(TagsTypesCreateSchema), controller.create_post);

// update catalog rendering template
tagsTypesRouter.get("/update", controller.update_get);

// update catalog 
tagsTypesRouter.put("/:id", validateSchema(TagsTypesUpdateSchema), controller.update_post);

// delete catalog rendering template 
tagsTypesRouter.get("/delete", controller.delete_get);

// delete catalog 
tagsTypesRouter.delete("/:id", validateSchema(TagsTypesDeleteSchema), controller.delete_post);

// download catalog rendering template
tagsTypesRouter.get("/download/:filter", controller.download_lazy);

 