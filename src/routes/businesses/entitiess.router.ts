import express from "express";
import { entityValidate } from "../../middleware/validationMDW";
import { entitiesCreateSchema } from "../../schemas/businesses/entitiesSchema";


// Select The rooter
export const router = express.Router();

// Require controller modules.
const controller = require("../controllers/businesses/EntitiesController");

/// COMPONENT ROUTES ///

// GET catalog home page.
router.get("/", controller.index);

// GET request for creating a COMPONENT. NOTE This must come before routes that display COMPONENT (uses id).
router.get("/create", controller.create_get);

// POST request for creating COMPONENT.
router.post("/create", entityValidate(entitiesCreateSchema), controller.create_post);

// GET request to delete COMPONENT.
router.get("/:id/delete", controller.delete_get);

// POST request to delete COMPONENT.
router.post("/:id/delete", controller.delete_post);

// GET request to update COMPONENT.
router.get("/:id/update", controller.update_get);

// POST request to update COMPONENT.
router.post("/:id/update", controller.update_post);

// GET request for one COMPONENT.
router.get("/:id", controller.detail);

// GET request for list of all COMPONENT items.
router.get("/", controller.findAll);




