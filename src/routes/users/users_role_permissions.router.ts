import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersRolePermissionsCreateSchema, UsersRolePermissionsDeleteSchema, UsersRolePermissionsUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersRolePermissionsController");

export const usersRolePermissionsRouter = express.Router();

// list of all catalog
usersRolePermissionsRouter.get("/", controller.list);

// count of all catalog
usersRolePermissionsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersRolePermissionsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersRolePermissionsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersRolePermissionsRouter.get("/:id", controller.detail);

// create catalog rendering template
usersRolePermissionsRouter.get("/create", controller.create_get);

// create catalog 
usersRolePermissionsRouter.post("/", validateSchema(UsersRolePermissionsCreateSchema), controller.create_post);

// update catalog rendering template
usersRolePermissionsRouter.get("/update", controller.update_get);

// update catalog 
usersRolePermissionsRouter.put("/:id", validateSchema(UsersRolePermissionsUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersRolePermissionsRouter.get("/delete", controller.delete_get);

// delete catalog 
usersRolePermissionsRouter.delete("/:id", validateSchema(UsersRolePermissionsDeleteSchema), controller.delete_post);

// download catalog rendering template
usersRolePermissionsRouter.get("/download/:filter", controller.download_lazy);

 