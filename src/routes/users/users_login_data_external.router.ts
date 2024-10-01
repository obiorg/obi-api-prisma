import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersLoginDataExternalCreateSchema, UsersLoginDataExternalDeleteSchema, UsersLoginDataExternalUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersLoginDataExternalController");

export const usersLoginDataExternalRouter = express.Router();

// list of all catalog
usersLoginDataExternalRouter.get("/", controller.list);

// count of all catalog
usersLoginDataExternalRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersLoginDataExternalRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersLoginDataExternalRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersLoginDataExternalRouter.get("/:id", controller.detail);

// create catalog rendering template
usersLoginDataExternalRouter.get("/create", controller.create_get);

// create catalog 
usersLoginDataExternalRouter.post("/", validateSchema(UsersLoginDataExternalCreateSchema), controller.create_post);

// update catalog rendering template
usersLoginDataExternalRouter.get("/update", controller.update_get);

// update catalog 
usersLoginDataExternalRouter.put("/:id", validateSchema(UsersLoginDataExternalUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersLoginDataExternalRouter.get("/delete", controller.delete_get);

// delete catalog 
usersLoginDataExternalRouter.delete("/:id", validateSchema(UsersLoginDataExternalDeleteSchema), controller.delete_post);

// download catalog rendering template
usersLoginDataExternalRouter.get("/download/:filter", controller.download_lazy);

 