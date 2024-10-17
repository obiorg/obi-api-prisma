import express from "express";
import { PrismaClient } from "@prisma/client";
import { validateSchema } from "../../middleware/validationMDW";
import { AlarmsCreateSchema, AlarmsDeleteSchema, AlarmsUpdateSchema } from "../../schemas/alarmsSchema";

const prisma = new PrismaClient();
// Require controller modules.
const controller = require("./../../controllers/alarms/AlarmsController");

export const alarmsRouter = express.Router();

/**
 * @swagger
 * /alarms 
 *   get:
 *     summary: return the full list of alarms 
 *     responses:
 *       200:
 *         description: Full list of alarms 
 */
// list of all catalog
alarmsRouter.get("/", controller.list);

// count of all catalog
alarmsRouter.get("/count", controller.list_count);

// list of filter catalog lazy loading
alarmsRouter.get("/lazy/:filter", controller.list_lazy);

// count list of filter catalog lazy loading
alarmsRouter.get("/lazy/count/:filter", controller.list_lazy_count);

// detail of catalog defined by id
alarmsRouter.get("/:id", controller.detail);

// create catalog rendering template
alarmsRouter.get("/create", controller.create_get);

// create catalog 
alarmsRouter.post("/", validateSchema(AlarmsCreateSchema), controller.create_post);

// update catalog rendering template
alarmsRouter.get("/update", controller.update_get);

// update catalog 
alarmsRouter.put("/:id", validateSchema(AlarmsUpdateSchema), controller.update_post);

// delete catalog rendering template 
alarmsRouter.get("/delete", controller.delete_get);

// delete catalog 
alarmsRouter.delete("/:id", validateSchema(AlarmsDeleteSchema), controller.delete_post);

// download catalog rendering template
alarmsRouter.get("/download/:filter", controller.download_lazy);

 