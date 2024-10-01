import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersHashingAlgorithmsCreateSchema, UsersHashingAlgorithmsDeleteSchema, UsersHashingAlgorithmsUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersHashingAlgorithmsController");

export const usersHashingAlgorithmsRouter = express.Router();

// list of all catalog
usersHashingAlgorithmsRouter.get("/", controller.list);

// count of all catalog
usersHashingAlgorithmsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersHashingAlgorithmsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersHashingAlgorithmsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersHashingAlgorithmsRouter.get("/:id", controller.detail);

// create catalog rendering template
usersHashingAlgorithmsRouter.get("/create", controller.create_get);

// create catalog 
usersHashingAlgorithmsRouter.post("/", validateSchema(UsersHashingAlgorithmsCreateSchema), controller.create_post);

// update catalog rendering template
usersHashingAlgorithmsRouter.get("/update", controller.update_get);

// update catalog 
usersHashingAlgorithmsRouter.put("/:id", validateSchema(UsersHashingAlgorithmsUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersHashingAlgorithmsRouter.get("/delete", controller.delete_get);

// delete catalog 
usersHashingAlgorithmsRouter.delete("/:id", validateSchema(UsersHashingAlgorithmsDeleteSchema), controller.delete_post);

// download catalog rendering template
usersHashingAlgorithmsRouter.get("/download/:filter", controller.download_lazy);

 