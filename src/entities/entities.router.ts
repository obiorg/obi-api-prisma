import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as entities from "./entities.service";

export const entitiesRouter = express.Router();

// Get : count
entitiesRouter.get("/count", async (request: Request, response: Response) => {
  try {
    const count = await entities.count(); 
    return response.status(200).json(count);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : findAll
entitiesRouter.get("/", async (request: Request, response: Response) => {
  try {
    const all = await entities.findAll();
    return response.status(200).json(all);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : findById
entitiesRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const byId = await entities.findById(id);
    if (byId) {
      return response.status(200).json(byId);
    } else {
      return response.status(400).json("entity with id(" + id + ") not found");
    }
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST : Create
// Params : deleted, entity, designation, main, activated
entitiesRouter.post(
  "/",
  body("deleted").isBoolean(),
  body("entity").isString(),
  body("designation").isString(),
  body("main").isBoolean(),
  body("activated").isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const entity = request.body;
      const newEntity = await entities.create(entity);
      return response.status(201).json(newEntity);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// POST : Update
//
entitiesRouter.put(
  "/:id",
  body("deleted").isBoolean(),
  body("entity").isString(),
  body("designation").isString(),
  body("main").isBoolean(),
  body("activated").isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(request.params.id, 10);
    try {
      const entity = request.body;
      const updateEntity = await entities.update(entity, id);
      return response.status(200).json(updateEntity);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE
entitiesRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    await entities.delete_(id);
    return response.status(204).json("Entity has been successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
