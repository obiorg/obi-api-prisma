import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersAccountCreateSchema, UsersAccountDeleteSchema, UsersAccountUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersAccountController");

export const usersAccountRouter = express.Router();

// list of all catalog
usersAccountRouter.get("/", controller.list);

// count of all catalog
usersAccountRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersAccountRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersAccountRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersAccountRouter.get("/:id", controller.detail);

// create catalog rendering template
usersAccountRouter.get("/create", controller.create_get);

// create catalog 
usersAccountRouter.post("/", validateSchema(UsersAccountCreateSchema), controller.create_post);

// update catalog rendering template
usersAccountRouter.get("/update", controller.update_get);

// update catalog 
usersAccountRouter.put("/:id", validateSchema(UsersAccountUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersAccountRouter.get("/delete", controller.delete_get);

// delete catalog 
usersAccountRouter.delete("/:id", validateSchema(UsersAccountDeleteSchema), controller.delete_post);

// download catalog rendering template
usersAccountRouter.get("/download/:filter", controller.download_lazy);

 