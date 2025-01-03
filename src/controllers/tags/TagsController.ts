import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";
import { JsonHelper } from "../../utils/helper/JsonHelper";

const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient({
  // log: ["query"],
});

// Display list of all catalog.
exports.list = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      let all = await prisma.tags.findMany({
        orderBy: { id : "asc" },
        include: {
          alarms: true,
          companies: true,
          tags_lists: true,
          machines: true,
          meas_units: true,
          tags_memories: true,
          tags_tables: true,
          tags_types: true,
        },
      });
      return response.status(200).send(JsonHelper.mngBigInt(all));
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display count of all catalog.
exports.list_count = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      const count = await prisma.tags.count();
      return response.status(200).json(count);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display list of all catalog (lazy loading).
exports.list_lazy = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    const requestFilter: any = JSON.parse(request.params.filter);

    // Manage Filters and sorting
    const model = new Model();

    const whereClause = model.convFilterReactToPrisma(requestFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      requestFilter.multiSortMeta
    );

    // Process request
    try {
      const result = await prisma.tags.findMany({
        skip:
          parseInt(requestFilter.page, 10) * parseInt(requestFilter.rows, 10),
        take: parseInt(requestFilter.rows),
        where: whereClause,
        orderBy: sortingClause,
        include: {
          alarms: true,
          companies: true,
          tags_lists: true,
          machines: true,
          meas_units: true,
          tags_memories: true,
          tags_tables: true,
          tags_types: true,
        },
      });

      if (result) {
        return response.status(200).send(JsonHelper.mngBigInt(result));
      } else {
        const status400 = '{ "status": 400, "message": "Bad request" }';
        return response.status(400).json(status400);
      }
    } catch (error: any) {
      console.log('error', error);
      return response.status(500).json(error.message);
    }
  }
);

// Display count of all catalog (lazy loading).
exports.list_lazy_count = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // Get Request react filter
    const reqFilter: any = JSON.parse(request.params.filter);

    // Manage Filters and sorting
    const model = new Model();
    const whereClause = model.convFilterReactToPrisma(reqFilter.filters);


    try {
      const all = await prisma.tags.count({
        where: whereClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).json(all);
      } else {
        const status400 = '{ "status": 400, "message": "Bad request", "object": all }';
        return response.status(400).json(status400);
        // return response.status(400).json("... is empty");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display detail page for a specific catalog.
exports.detail = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // response.send(`NOT IMPLEMENTED: Catalog detail: ${request.params.id}`);

    const id: number = parseInt(request.params.id, 10);
    console.log('details for id ' + id);
    try {
      const byId = await prisma.tags.findUnique({
        where: {
          id: id,
        },
        include: {
          alarms: true,
          companies: true,
          tags_lists: true,
          machines: true,
          meas_units: true,
          tags_memories: true,
          tags_tables: true,
          tags_types: true,
        },
      });

      if (byId) {
        return response.status(200).send(JsonHelper.mngBigInt(byId));
      } else {
        console.log('error 500 : ' + JsonHelper.mngBigInt(response));
        return response
          .status(400)
          .json("catalog ... with id(" + id + ") not found");
      }
    } catch (error: any) {
      console.log('error 500 : ' + error.message);
      return response.status(500).json(error.message);
    }
  }
);

// Display detail page for a specific catalog.
exports.details = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // response.send(`NOT IMPLEMENTED: Catalog detail: ${request.params.id}`);

    const ids: string[] = request.params.ids.split(',');
    const idInt: number[] = ids.map((idStr: string) => parseInt(idStr, 10));
    // console.log('catalog id :' + idInt);

    try {
      const byId = await prisma.tags.findMany({
        where: {
          id: { in: idInt } ,
        },
        include: {
          alarms: true,
          companies: true,
          tags_lists: true,
          machines: true,
          meas_units: true,
          tags_memories: true,
          tags_tables: true,
          tags_types: true,
        },
      });

      if (byId) {
        return response.status(200).send(JsonHelper.mngBigInt(byId));
      } else {
        console.log('error 500 : ' + JsonHelper.mngBigInt(response));
        return response
          .status(400)
          .json("catalog ... with id(" + idInt + ") not found");
      }
    } catch (error: any) {
      console.log('error 500 : ' + error.message);
      return response.status(500).json(error.message);
    }
  }
);

// Display catalog create form on GET.
exports.create_get = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send("NOT IMPLEMENTED: Catalog create GET");
  }
);

// Handle catalog create on POST.

// POST : Create post
exports.create_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // check duplicates
    const existing = await prisma.tags.findFirst({
      where: {
        company: request.body.company,
        name: request.body.name,
        machine: request.body.machine,
      },
    });
    if (existing) {
      const error = {
        errors: {
          company: ["Doublon ! ...déjà spécifié !"],
          name: ["Doublon ! ...déjà spécifié !"],
          machine: ["Doublon ! ...déjà spécifié !"],
        },
      };
      return response.status(400).json(error);
    }

    // If not duplicates
    try {
      const catalog = request.body;
      delete catalog.id;
      delete catalog.created;
      delete catalog.changed;

      const catalogResult = await prisma.tags.create({
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("TagsController create_post", error.message);
      return response.status(500).json(error.message);
    }
  }
);

// Display catalog update form on GET.
exports.update_get = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send("NOT IMPLEMENTED: Catalog update GET");
  }
);

// Handle catalog update on POST.
exports.update_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // check duplicates
    const existing = await prisma.tags.findFirst({
      where: {
        company: request.body.company,
        name: request.body.name,
        machine: request.body.machine,
      },
    });
    if (!existing) {
      const error = {
        errors: {
          company: ["... n'existe plus !"],
          name: ["... n'existe plus !"],
          machine: ["... n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    // If not duplicates
    try {
      const catalog = request.body;
      const id = catalog.id;
      delete catalog.id;
      delete catalog.created;
      delete catalog.changed;

      const catalogResult = await prisma.tags.update({
        where: { id: id },
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("TagsController update_post", error.message);
      return response.status(500).json(error);
    }
  }
);

// Display catalog delete form on GET.
exports.delete_get = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send("NOT IMPLEMENTED: Catalog delete GET");
  }
);

// Handle catalog delete on POST.
exports.delete_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    const id: number = parseInt(request.params.id, 10);

    // check duplicates
    const existing = await prisma.tags.findFirst({
      where: {
        id: id,
      },
    });
    if (!existing) {
      console.log("n existe pas !");
      const error = {
        errors: {
          company: ["... n'existe plus !"],
          name: ["... n'existe plus !"],
          machine: ["... n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.tags.delete({
        where: { id: id },
      });

      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("TagsController update_post", error.message);
      return response.status(500).json(error);
    }
  }
);

// download csv lazy
exports.download_lazy = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // Get request react filter
    const requestFilter: any = JSON.parse(request.params.filter);

    // Manage Filters and sorting
    const model = new Model();

    const whereClause = model.convFilterReactToPrisma(requestFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      requestFilter.multiSortMeta
    );

    // Get base information
    const filename =
      request.params.filename || "tags_" + Math.floor(Date.now() / 1000);
    const fields = prisma.tags.fields;

    // Process request
    try {
      const result = await prisma.tags.findMany({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (result) {
        return response.status(200).send(JsonHelper.mngBigInt(result));
      } else {
        const status400 = '{ "status": 400, "message": "Bad request" }';
        return response.status(400).json(status400);
      }
    } catch (error: any) {
      return response.status(500).json(error.message); 
    }
  }
);
