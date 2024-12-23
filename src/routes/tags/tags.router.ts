import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { TagsCreateSchema, TagsDeleteSchema, TagsUpdateSchema } from "../../schemas/tagsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/tags/TagsController");

export const tagsRouter = express.Router();

// list of all catalog
tagsRouter.get("/", controller.list);

// count of all catalog
tagsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
tagsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
tagsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
tagsRouter.get("/:id", controller.detail);

// detail of catalog defined by id
tagsRouter.get("/in/:ids", controller.details);

// create catalog rendering template
tagsRouter.get("/create", controller.create_get);

// create catalog 
tagsRouter.post("/", validateSchema(TagsCreateSchema), controller.create_post);

// update catalog rendering template
tagsRouter.get("/update", controller.update_get);

// update catalog 
tagsRouter.put("/:id", validateSchema(TagsUpdateSchema), controller.update_post);

// delete catalog rendering template 
tagsRouter.get("/delete", controller.delete_get);

// delete catalog 
tagsRouter.delete("/:id", validateSchema(TagsDeleteSchema), controller.delete_post);

// download catalog rendering template
tagsRouter.get("/download/:filter", controller.download_lazy);

 