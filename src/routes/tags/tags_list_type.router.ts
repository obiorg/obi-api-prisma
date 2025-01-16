import express from "express";

import { PrismaClient } from "@prisma/client";
import {
  validateSchema,
  validateSchemas,
} from "../../middleware/validationMDW";
import {
  TagsListTypeCreateSchema,
  TagsListTypeDeleteSchema,
  TagsListTypeUpdateSchema,
} from "../../schemas/tagsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/tags/TagsListTypeController");

export const tagsListTypeRouter = express.Router();

// list of all catalog
tagsListTypeRouter.get("/", controller.list);

// count of all catalog
tagsListTypeRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
tagsListTypeRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
tagsListTypeRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
tagsListTypeRouter.get("/:id", controller.detail);

// create catalog rendering template
tagsListTypeRouter.get("/create", controller.create_get);

// create catalog
tagsListTypeRouter.post(
  "/",
  validateSchema(TagsListTypeCreateSchema),
  controller.create_post
);

// create catalogs
tagsListTypeRouter.post(
  "/create",
  validateSchemas(TagsListTypeCreateSchema),
  controller.createMany_post
);

// update catalog rendering template
tagsListTypeRouter.get("/update", controller.update_get);

// update catalog
tagsListTypeRouter.put(
  "/:id",
  validateSchema(TagsListTypeUpdateSchema),
  controller.update_post
);

// update catalogs
tagsListTypeRouter.post(
  "/update",
  validateSchemas(TagsListTypeUpdateSchema),
  controller.updateMany_post
);

// delete catalog rendering template
tagsListTypeRouter.get("/delete", controller.delete_get);

// delete catalog
tagsListTypeRouter.delete(
  "/:id",
  validateSchema(TagsListTypeDeleteSchema),
  controller.delete_post
);

// update catalogs
tagsListTypeRouter.post(
  "/delete",
  validateSchemas(TagsListTypeDeleteSchema),
  controller.deleteMany_post
);

// download catalog rendering template
tagsListTypeRouter.get("/download/:filter", controller.download_lazy);
