import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersLoginDataCreateSchema, UsersLoginDataDeleteSchema, UsersLoginDataUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersLoginDataController");

export const usersLoginDataRouter = express.Router();

// list of all catalog
usersLoginDataRouter.get("/", controller.list);

// count of all catalog
usersLoginDataRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersLoginDataRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersLoginDataRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersLoginDataRouter.get("/:id", controller.detail);

// create catalog rendering template
usersLoginDataRouter.get("/create", controller.create_get);

// create catalog 
usersLoginDataRouter.post("/", validateSchema(UsersLoginDataCreateSchema), controller.create_post);

// update catalog rendering template
usersLoginDataRouter.get("/update", controller.update_get);

// update catalog 
usersLoginDataRouter.put("/:id", validateSchema(UsersLoginDataUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersLoginDataRouter.get("/delete", controller.delete_get);

// delete catalog 
usersLoginDataRouter.delete("/:id", validateSchema(UsersLoginDataDeleteSchema), controller.delete_post);

// download catalog rendering template
usersLoginDataRouter.get("/download/:filter", controller.download_lazy);

 