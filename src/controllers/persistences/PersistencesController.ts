import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";

import json from "../../utils/helper/json";
import { JsonHelper } from "../../utils/helper/JsonHelper";
import { ErrorHelper } from "../../utils/helper/ErrorHelper";

// Import the module
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient({
  // log: [
  //   "query",
  //   {
  //     emit: "event",
  //     level: "query",
  //   },
  //   {
  //     emit: "stdout",
  //     level: "error",
  //   },
  //   {
  //     emit: "stdout",
  //     level: "info",
  //   },
  //   {
  //     emit: "stdout",
  //     level: "warn",
  //   },
  // ],
});

// Display list of all catalog.
exports.list = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      let all = await prisma.persistence.findMany({
        include: {
          companies: {
            select: {
              id: true,
              company: true,
              designation: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
              table: true,
              machine: true,
            },
          },
          pers_method: {
            select: {
              id: true,
              name: true,
              comment: true,
            },
          },
        },
      });
      return response.status(200).send(json(all));
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display count of all catalog.
exports.list_count = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      const count = await prisma.persistence.count();
      return response.status(200).json(count);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display list of all catalog (lazy loading).
exports.list_lazy = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // Get request react filter
    const requestFilter: any = JSON.parse(request.params.filter);

    // Manage Filters and sorting
    const model = new Model();

    console.log("request Filter ", requestFilter);

    const whereClause = model.convFilterReactToPrisma(requestFilter.filters);
    const sortingClause = model.convSortingReactToPrisma(
      requestFilter.multiSortMeta
    );

    // console.log('requestFilter', requestFilter)
    // console.log('created', requestFilter.filters.created)
    // console.log("whereClause", whereClause);

    // Process request
    try {
      const result = await prisma.persistence.findMany({
        skip:
          parseInt(requestFilter.page, 10) * parseInt(requestFilter.rows, 10),
        take: parseInt(requestFilter.rows),
        where: whereClause,
        orderBy: sortingClause,

        include: {
          companies: {
            select: {
              id: true,
              company: true,
              designation: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
              table: true,
              machine: true,
            },
          },
          pers_method: {
            select: {
              id: true,
              name: true,
              comment: true,
            },
          },
        },
      });

      if (result) {
        return response.status(200).send(json(result));
      } else {
        const status400 = '{ "status": 400, "message": "Bad request" }';
        return response.status(400).json(status400);
      }
    } catch (error: any) {
      console.log("error", error);
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
    const sortingClause = model.convSortingReactToPrisma(
      reqFilter.multiSortMeta
    );

    try {
      const all = await prisma.persistence.count({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).json(all);
      } else {
        return response.status(400).json("persistence is empty");
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
    try {
      const byId = await prisma.persistence.findUnique({
        where: {
          id: id,
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json("catalog persistence with id(" + id + ") not found");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display detail page for a specific catalog.
exports.details = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // response.send(`NOT IMPLEMENTED: Catalog detail: ${request.params.id}`);

    const ids: string[] = request.params.ids.split(",");
    const idInt: number[] = ids.map((idStr: string) => parseInt(idStr, 10));
    // console.log('catalog id :' + idInt);

    try {
      const byId = await prisma.persistence.findMany({
        where: {
          id: { in: idInt },
        },
        include: {
          companies: {
            select: {
              id: true,
              company: true,
              designation: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
              table: true,
              machine: true,
            },
          },
          pers_method: {
            select: {
              id: true,
              name: true,
              comment: true,
            },
          },
        },
      });

      if (byId) {
        return response.status(200).send(JsonHelper.mngBigInt(byId));
      } else {
        console.log("error 500 : " + JsonHelper.mngBigInt(response));
        return response
          .status(400)
          .json("catalog ... with id(" + idInt + ") not found");
      }
    } catch (error: any) {
      console.log("error 500 : " + error.message);
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
    let controllerName = "PersistencesController";
    // console.log(controllerName + " create_post - body", request.body);

    try {
      // Check if duplicate catalog on
      // // => company , tag, method
      let existing = await prisma.persistence.findFirst({
        where: {
          company: request.body.company,
          tag: request.body.tag,
          method: request.body.method,
        },
      });
      let existingError = false;
      let error: any = ErrorHelper.default(400);
      if (existing) {
        error.errors = {
          company: ["Doublon ! ...déjà spécifié !"],
          tag: ["Doublon ! ...déjà spécifié !"],
          method: ["Doublon ! ...déjà spécifié !"],
        };
        existingError = true;
      }

      // Return on error message
      if (existingError) {
        return response.status(400).json(error);
      }
    } catch (error: any) {
      console.log(controllerName + " create_post", error.message);
      return response.status(500).json(error.message);
    }

    // If not duplicates, try creating
    try {
      const catalog = request.body;
      delete catalog.id;
      delete catalog.created;
      delete catalog.changed;

      delete catalog.companies;
      delete catalog.tags;
      delete catalog.pers_method;

      const catalogResult = await prisma.persistence.create({
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(JsonHelper.mngBigInt(catalogResult));
    } catch (error: any) {
      //console.log(controllerName + " create_post", create_post", error.message);
      return response.status(500).json(error.message);
    }
  }
);

// POST : Create post
exports.createMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    let controllerName = "PersistencesController";
    let catalogs = request.body; //.map((item: any) => {item.company, item.address});

    //
    try {
      // Check if duplicate catalog on
      // // => company and IP address
      let existing = await prisma.persistence.findMany({
        where: {
          company: { in: catalogs.map((c: any) => c.company) },
          tag: { in: catalogs.map((c: any) => c.tag) },
          method: { in: catalogs.map((c: any) => c.method) },
        },
      });
      let existingError = false;
      let error: any = ErrorHelper.default(400);
      if (existing?.length > 0) {
        error.errors = {
          company: ["Doublon ! ...déjà spécifié !"],
          tag: ["Doublon ! ...déjà spécifié !"],
          method: ["Doublon ! ...déjà spécifié !"],
          status: 500,
          message: "Doublon ! ...déjà spécifié !",
          catalog: true,
          items: existing,
        };
        existingError = true;
      }

      // Return on error message
      if (existingError) {
        return response.status(400).json(error);
      }
    } catch (error: any) {
      console.log(controllerName + " createMany_post", error.message);
      return response.status(500).json(error.message);
    }

    // If not duplicates
    try {
      catalogs = request.body;
      catalogs.forEach((catalog: any) => {
        delete catalog.transaction;
        delete catalog.index;
        delete catalog.commentRet;

        delete catalog.id;
        delete catalog.created;
        delete catalog.changed;

        delete catalog.companies;
        delete catalog.tags;
        delete catalog.pers_method;
      });

      const catalogResult = await prisma.persistence.createMany({
        data: catalogs,
      });
      let success = ErrorHelper.default(200);
      success.items = catalogResult;
      return response.status(201).json(success);
    } catch (error: any) {
      //console.log(controllerName + " create_post", error.message);
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
    let controllerName = "PersistencesController";
    //console.log(controllerName + " update_post", request.body);

    //
    // Check not remove components
    //
    try {
      // Check if duplicate catalog on
      let existing = await prisma.persistence.findFirst({
        where: {
          id: request.body.id,
        },
      });

      let error: any = ErrorHelper.default(400);
      if (!existing) {
        error.errors = {
          id: [" n'existe plus !"],
        };
        return response.status(400).json(error);
      }
    } catch (error: any) {
      console.log(controllerName + " update_post", error.message);
      return response.status(500).json(error.message);
    }

    //
    // Check no duplication model
    //
    try {
      // Check if duplicate catalog on
      // // => company and IP address
      let existing = await prisma.persistence.findFirst({
        where: {
          id: { not: request.body.id },
          company: request.body.company,
          tag: request.body.tag,
          method: request.body.tag,
        },
      });
      let existingError = false;
      let error: any = ErrorHelper.default(400);
      if (existing) {
        error.errors = {
          company: ["Doublon ! ...déjà spécifié !"],
          tag: ["Doublon ! ...déjà spécifié !"],
          method: ["Doublon ! ...déjà spécifié !"],
        };
        existingError = true;
      }

      // Return on error message
      if (existingError) {
        return response.status(400).json(error);
      }
    } catch (error: any) {
      console.log(controllerName + " update_post", error.message);
      return response.status(500).json(error.message);
    }

    //
    // If not duplicates
    //
    try {
      const catalog = request.body;
      const id = catalog.id;

      delete catalog.id;
      delete catalog.created;
      delete catalog.changed;

      delete catalog.companies;
      delete catalog.tags;
      delete catalog.pers_method;

      const catalogResult = await prisma.persistence.update({
        where: { id: id },
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(JsonHelper.mngBigInt(catalogResult));
    } catch (error: any) {
      console.log(controllerName + " update_post", error.message);
      return response.status(500).json(error);
    }
  }
);

async function updater(catalog: any): Promise<any> {
  let controllerName = "PersistencesController";
  // console.log(controllerName + " : updater start....");

  //
  // Check not remove components
  //
  try {
    // Check if duplicate catalog on
    let existing = await prisma.persistence.findFirst({
      where: {
        id: catalog.id,
      },
    });

    let error: any = ErrorHelper.default(400);
    if (!existing) {
      error.errors = {
        id: [" n'existe plus !"],
      };
      return error;
    }
  } catch (error: any) {
    console.log(controllerName + " update_post", error.message);
    return error.message;
  }

  //
  // Check no duplication model
  //
  try {
    // Check if duplicate catalog on
    // // => company, tag, method
    let existing = await prisma.persistence.findFirst({
      where: {
        id: { not: catalog.id },
        company: catalog.company,
        tag: catalog.tag,
        method: catalog.method,
      },
    });
    let existingError = false;
    let error: any = ErrorHelper.default(400);
    if (existing) {
      error.errors = {
        company: ["Doublon ! ...déjà spécifié !"],
        tag: ["Doublon ! ...déjà spécifié !"],
        method: ["Doublon ! ...déjà spécifié !"],
      };
      existingError = true;
    }

    // Return on error message
    if (existingError) {
      return error;
    }
  } catch (error: any) {
    console.log(controllerName + " update_post", error.message);
    return error.message;
  }

  // If catalog already exists
  const savedCatalog = { ...catalog };
  // console.log('saved catalog', savedCatalog);
  try {
    const id = catalog.id;
    delete catalog.transaction;
    delete catalog.index;
    delete catalog.commentRet;

    delete catalog.id;
    delete catalog.created;
    delete catalog.changed;

    delete catalog.companies;
    delete catalog.tags;
    delete catalog.pers_method;

    const catalogResult = await prisma.persistence.update({
      where: { id: id },
      data: {
        ...catalog,
      },
    });

    // console.log("savedCatalog", savedCatalog);
    let success = ErrorHelper.default(200);
    success = {
      ...success,
      transaction: savedCatalog.transaction,
      index: savedCatalog.index,
      comment: savedCatalog.comment,
      items: catalogResult,
    };

    return success;
  } catch (error: any) {
    let errors = ErrorHelper.default(500);
    errors = {
      ...errors,
      error: error,
      transaction: savedCatalog.transaction,
      index: savedCatalog.index,
      comment: savedCatalog.comment,
    };
    return errors;
  }
}

// Handle catalog update on POST.
exports.updateMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    let controllerName = "PersistencesController";
    const catalogs = request.body;
    // console.log("catalogs", catalogs);

    try {
      let res = await Promise.all(
        catalogs.map((catalog: any) => {
          return updater(catalog);
        })
      );
      // console.log("res", res);
      return response.status(201).json(JsonHelper.mngBigInt(res));
    } catch (error: any) {
      console.log(controllerName + " updateMany_post", error.message);
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
    const existing = await prisma.persistence.findFirst({
      where: {
        id: id,
      },
    });
    if (!existing) {
      const error = {
        errors: {
          company: ["... n'existe plus !"],
          tag: ["... n'existe plus !"],
          method: ["... n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.persistence.delete({
        where: { id: id },
      });

      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("persistencesController update_post", error.message);
      return response.status(500).json(error);
    }
  }
);

// Handle catalog delete on POST.
exports.deleteMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    let controllerName = "PersistencesController";
    // Check if catalogs exists
    let ids = request.body.map((item: any) => parseInt(item.id, 10));

    const existing = await prisma.tags.findMany({
      where: {
        id: { in: ids },
      },
    });

    // check removed catalogs
    let error: any = ErrorHelper.default(400);
    if (existing?.length < ids.length) {
      error = {
        ...error.errors,
        errors: {
          status: 500,
          message: "... n'existe plus !",
          id: true,
          items: existing,
        },
      };
      // console.error(error);
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.tags.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log(controllerName + " deleteMany", error.message);
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
      request.params.filename ||
      "persistences_" + Math.floor(Date.now() / 1000);
    const fields = prisma.persistence.fields;

    // Process request
    try {
      const result = await prisma.persistence.findMany({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (result) {
        return response.status(200).json(result);
      } else {
        const status400 = '{ "status": 400, "message": "Bad request" }';
        return response.status(400).json(status400);
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
