import express from "express";

import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { UsersExternalProvidersCreateSchema, UsersExternalProvidersDeleteSchema, UsersExternalProvidersUpdateSchema } from "../../schemas/usersSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/users/UsersExternalProvidersController");

export const usersExternalProvidersRouter = express.Router();

// list of all catalog
usersExternalProvidersRouter.get("/", controller.list);

// count of all catalog
usersExternalProvidersRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
usersExternalProvidersRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
usersExternalProvidersRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
usersExternalProvidersRouter.get("/:id", controller.detail);

// create catalog rendering template
usersExternalProvidersRouter.get("/create", controller.create_get);

// create catalog 
usersExternalProvidersRouter.post("/", validateSchema(UsersExternalProvidersCreateSchema), controller.create_post);

// update catalog rendering template
usersExternalProvidersRouter.get("/update", controller.update_get);

// update catalog 
usersExternalProvidersRouter.put("/:id", validateSchema(UsersExternalProvidersUpdateSchema), controller.update_post);

// delete catalog rendering template 
usersExternalProvidersRouter.get("/delete", controller.delete_get);

// delete catalog 
usersExternalProvidersRouter.delete("/:id", validateSchema(UsersExternalProvidersDeleteSchema), controller.delete_post);

// download catalog rendering template
usersExternalProvidersRouter.get("/download/:filter", controller.download_lazy);

 