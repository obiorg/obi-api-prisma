import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersPermissionsCreateSchema, UsersPermissionsDeleteSchema, UsersPermissionsUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersPermissionsController");

export const usersPermissionsRouter = express.Router();

// list of all catalog
usersPermissionsRouter.get("/", controller.list);

// count of all catalog
usersPermissionsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersPermissionsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersPermissionsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersPermissionsRouter.get("/:id", controller.detail);

// create catalog rendering template
usersPermissionsRouter.get("/create", controller.create_get);

// create catalog 
usersPermissionsRouter.post("/", validateSchema(UsersPermissionsCreateSchema), controller.create_post);

// update catalog rendering template
usersPermissionsRouter.get("/update", controller.update_get);

// update catalog 
usersPermissionsRouter.put("/:id", validateSchema(UsersPermissionsUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersPermissionsRouter.get("/delete", controller.delete_get);

// delete catalog 
usersPermissionsRouter.delete("/:id", validateSchema(UsersPermissionsDeleteSchema), controller.delete_post);

// download catalog rendering template
usersPermissionsRouter.get("/download/:filter", controller.download_lazy);

 