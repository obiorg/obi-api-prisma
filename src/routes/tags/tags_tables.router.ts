import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema, validateSchemas } from "../../middleware/validationMDW";
import { TagsTablesCreateSchema, TagsTablesDeleteSchema, TagsTablesUpdateSchema } from "../../schemas/tagsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/tags/TagsTablesController");

export const tagsTablesRouter = express.Router();

// list of all catalog
tagsTablesRouter.get("/", controller.list);

// count of all catalog
tagsTablesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
tagsTablesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
tagsTablesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
tagsTablesRouter.get("/:id", controller.detail);

// create catalog rendering template
tagsTablesRouter.get("/create", validateSchemas(TagsTablesCreateSchema),  controller.create_get);

// create catalog 
tagsTablesRouter.post("/", validateSchema(TagsTablesCreateSchema), controller.create_post);

// create catalogs
tagsTablesRouter.post("/create", validateSchemas(TagsTablesCreateSchema), controller.createMany_post);

// update catalog rendering template
tagsTablesRouter.get("/update", controller.update_get);

// update catalog 
tagsTablesRouter.put("/:id", validateSchema(TagsTablesUpdateSchema), controller.update_post);

// update catalogs
tagsTablesRouter.post("/update", validateSchemas(TagsTablesUpdateSchema), controller.updateMany_post);

// delete catalog rendering template 
tagsTablesRouter.get("/delete", controller.delete_get);

// delete catalog 
tagsTablesRouter.delete("/:id", validateSchema(TagsTablesDeleteSchema), controller.delete_post);

// update catalogs
tagsTablesRouter.post("/delete", validateSchemas(TagsTablesDeleteSchema), controller.deleteMany_post);

// download catalog rendering template
tagsTablesRouter.get("/download/:filter", controller.download_lazy);

 