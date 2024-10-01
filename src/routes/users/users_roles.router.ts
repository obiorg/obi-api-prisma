import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersRolesCreateSchema, UsersRolesDeleteSchema, UsersRolesUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersRolesController");

export const usersRolesRouter = express.Router();

// list of all catalog
usersRolesRouter.get("/", controller.list);

// count of all catalog
usersRolesRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersRolesRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersRolesRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersRolesRouter.get("/:id", controller.detail);

// create catalog rendering template
usersRolesRouter.get("/create", controller.create_get);

// create catalog 
usersRolesRouter.post("/", validateSchema(UsersRolesCreateSchema), controller.create_post);

// update catalog rendering template
usersRolesRouter.get("/update", controller.update_get);

// update catalog 
usersRolesRouter.put("/:id", validateSchema(UsersRolesUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersRolesRouter.get("/delete", controller.delete_get);

// delete catalog 
usersRolesRouter.delete("/:id", validateSchema(UsersRolesDeleteSchema), controller.delete_post);

// download catalog rendering template
usersRolesRouter.get("/download/:filter", controller.download_lazy);

 