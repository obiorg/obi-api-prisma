import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema, validateSchemas } from "../../middleware/validationMDW";
import { TagsMemoriesCreateSchema, TagsMemoriesDeleteSchema, TagsMemoriesUpdateSchema } from "../../schemas/tagsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/tags/TagsMemoriesController");

export const tagsMemoriesRouter = express.Router();

// list of all catalog
tagsMemoriesRouter.get("/", controller.list);

// count of all catalog
tagsMemoriesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
tagsMemoriesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
tagsMemoriesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
tagsMemoriesRouter.get("/:id", controller.detail);

// create catalog rendering template
tagsMemoriesRouter.get("/create", controller.create_get);

// create catalog 
tagsMemoriesRouter.post("/", validateSchema(TagsMemoriesCreateSchema), controller.create_post);

// create catalogs
tagsMemoriesRouter.post("/create", validateSchemas(TagsMemoriesCreateSchema), controller.createMany_post);

// update catalog rendering template
tagsMemoriesRouter.get("/update", controller.update_get);

// update catalog 
tagsMemoriesRouter.put("/:id", validateSchema(TagsMemoriesUpdateSchema), controller.update_post);

// update catalogs
tagsMemoriesRouter.post("/update", validateSchemas(TagsMemoriesUpdateSchema), controller.updateMany_post);

// delete catalog rendering template 
tagsMemoriesRouter.get("/delete", controller.delete_get);

// delete catalog 
tagsMemoriesRouter.delete("/:id", validateSchema(TagsMemoriesDeleteSchema), controller.delete_post);

// update catalogs
tagsMemoriesRouter.post("/delete", validateSchemas(TagsMemoriesDeleteSchema), controller.deleteMany_post);

// download catalog rendering template
tagsMemoriesRouter.get("/download/:filter", controller.download_lazy);