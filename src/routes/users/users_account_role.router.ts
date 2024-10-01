import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersAccountRoleCreateSchema, UsersAccountRoleDeleteSchema, UsersAccountRoleUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersAccountRoleController");

export const usersAccountRoleRouter = express.Router();

// list of all catalog
usersAccountRoleRouter.get("/", controller.list);

// count of all catalog
usersAccountRoleRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersAccountRoleRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersAccountRoleRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersAccountRoleRouter.get("/:id", controller.detail);

// create catalog rendering template
usersAccountRoleRouter.get("/create", controller.create_get);

// create catalog 
usersAccountRoleRouter.post("/", validateSchema(UsersAccountRoleCreateSchema), controller.create_post);

// update catalog rendering template
usersAccountRoleRouter.get("/update", controller.update_get);

// update catalog 
usersAccountRoleRouter.put("/:id", validateSchema(UsersAccountRoleUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersAccountRoleRouter.get("/delete", controller.delete_get);

// delete catalog 
usersAccountRoleRouter.delete("/:id", validateSchema(UsersAccountRoleDeleteSchema), controller.delete_post);

// download catalog rendering template
usersAccountRoleRouter.get("/download/:filter", controller.download_lazy);

 