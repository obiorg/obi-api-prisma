import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { TagsListCreateSchema, TagsListDeleteSchema, TagsListUpdateSchema } from "../../schemas/tagsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/tags/TagsListController");

export const tagsListRouter = express.Router();

// list of all catalog
tagsListRouter.get("/", controller.list);

// count of all catalog
tagsListRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
tagsListRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
tagsListRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
tagsListRouter.get("/:id", controller.detail);

// create catalog rendering template
tagsListRouter.get("/create", controller.create_get);

// create catalog 
tagsListRouter.post("/", validateSchema(TagsListCreateSchema), controller.create_post);

// update catalog rendering template
tagsListRouter.get("/update", controller.update_get);

// update catalog 
tagsListRouter.put("/:id", validateSchema(TagsListUpdateSchema), controller.update_post);

// delete catalog rendering template 
tagsListRouter.get("/delete", controller.delete_get);

// delete catalog 
tagsListRouter.delete("/:id", validateSchema(TagsListDeleteSchema), controller.delete_post);

// download catalog rendering template
tagsListRouter.get("/download/:filter", controller.download_lazy);

 