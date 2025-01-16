import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema, validateSchemas } from "../../middleware/validationMDW";
import { TagsListContentsCreateSchema, TagsListContentsDeleteSchema, TagsListContentsUpdateSchema } from "../../schemas/tagsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/tags/TagsListContentsController");

export const tagsListContentsRouter = express.Router();

// list of all catalog
tagsListContentsRouter.get("/", controller.list);

// count of all catalog
tagsListContentsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
tagsListContentsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
tagsListContentsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
tagsListContentsRouter.get("/:id", controller.detail);

// detail of catalog defined by list and content
tagsListContentsRouter.get("/list/:list/content/:content", controller.detailListContent);

// detail of catalog defined by list and content
tagsListContentsRouter.get("/list/:list/company/:company", controller.detailList);


// create catalog rendering template
tagsListContentsRouter.get("/create", controller.create_get);

// create catalog 
tagsListContentsRouter.post("/", validateSchema(TagsListContentsCreateSchema), controller.create_post);

// create catalogs
tagsListContentsRouter.post("/create", validateSchemas(TagsListContentsCreateSchema), controller.createMany_post);

// update catalog rendering template
tagsListContentsRouter.get("/update", controller.update_get);

// update catalog 
tagsListContentsRouter.put("/:id", validateSchema(TagsListContentsUpdateSchema), controller.update_post);

// update catalogs
tagsListContentsRouter.post("/update", validateSchemas(TagsListContentsUpdateSchema), controller.updateMany_post);

// delete catalog rendering template 
tagsListContentsRouter.get("/delete", controller.delete_get);

// delete catalog 
tagsListContentsRouter.delete("/:id", validateSchema(TagsListContentsDeleteSchema), controller.delete_post);

// update catalogs
tagsListContentsRouter.post("/delete", validateSchemas(TagsListContentsDeleteSchema), controller.deleteMany_post);

// download catalog rendering template
tagsListContentsRouter.get("/download/:filter", controller.download_lazy);

 