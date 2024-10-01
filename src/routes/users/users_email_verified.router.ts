import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersEmailVerifiedCreateSchema, UsersEmailVerifiedDeleteSchema, UsersEmailVerifiedUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersEmailVerifiedController");

export const usersEmailVerifiedRouter = express.Router();

// list of all catalog
usersEmailVerifiedRouter.get("/", controller.list);

// count of all catalog
usersEmailVerifiedRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersEmailVerifiedRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersEmailVerifiedRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersEmailVerifiedRouter.get("/:id", controller.detail);

// create catalog rendering template
usersEmailVerifiedRouter.get("/create", controller.create_get);

// create catalog 
usersEmailVerifiedRouter.post("/", validateSchema(UsersEmailVerifiedCreateSchema), controller.create_post);

// update catalog rendering template
usersEmailVerifiedRouter.get("/update", controller.update_get);

// update catalog 
usersEmailVerifiedRouter.put("/:id", validateSchema(UsersEmailVerifiedUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersEmailVerifiedRouter.get("/delete", controller.delete_get);

// delete catalog 
usersEmailVerifiedRouter.delete("/:id", validateSchema(UsersEmailVerifiedDeleteSchema), controller.delete_post);

// download catalog rendering template
usersEmailVerifiedRouter.get("/download/:filter", controller.download_lazy);

 