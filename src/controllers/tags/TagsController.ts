import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";
import { JsonHelper } from "../../utils/helper/JsonHelper";

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
      let all = await prisma.tags.findMany({
        orderBy: { id: "asc" },
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

    try {
      const all = await prisma.tags.count({
        where: whereClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).json(all);
      } else {
        const status400 =
          '{ "status": 400, "message": "Bad request", "object": all }';
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
    console.log("details for id " + id);
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
        console.log("error 500 : " + JsonHelper.mngBigInt(response));
        return response
          .status(400)
          .json("catalog ... with id(" + id + ") not found");
      }
    } catch (error: any) {
      console.log("error 500 : " + error.message);
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
      const byId = await prisma.tags.findMany({
        where: {
          id: { in: idInt },
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
    console.log("Tags >> create_post", request.body);
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

// POST : Create post
exports.createMany_post = asyncHandler(
  /**
   * 1. Check duplicates
   * 2. Create
   * 3. Response with adapted json or error
   */
  async (request: Request, response: Response, next: any) => {
    /**
     * While creating keys in the database are :
     * on company, machine, name, // >> pas pris en compte  >>table, type, memory, measureUnit, alarm, list
     */
    let catalogs = request.body.map((item: any) => {
      return { company: item.company, machine: item.machine, name: item.name };
    });
    console.log('catalogs', catalogs);
    const existing = await prisma.tags.findMany({
      where: {
        name: { in: catalogs.name },
        machine: { in: catalogs.machine },
        company: { in: catalogs.company },
      },
    });
    const existingCatalog = existing.map((item: any) => {
      return { company: item.company, machine: item.machine, name: item.name };
    });
    console.log("ids", catalogs, existingCatalog);
    
    // check duplicates
    if (existing?.length > 0) {
      const error = {
        errors: {
          status: 500,
          message: "Doublon ! ...déjà spécifié !",
          location: true,
          items: existing,
        },
      };
      console.error(error);
      return response.status(400).json(JsonHelper.mngBigInt(error));
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
        // if (catalog.floor === null || catalog.floor === undefined)
        //   catalog["floor"] = null;
        // console.log("catalog", catalog);
      });

      const catalogResult = await prisma.tags.createMany({
        data: catalogs,
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      // console.log("locationsController create_post", error.message);
      return response.status(500).json(error.message);
    }

    // return response.status(200).json("success");
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
async function updater(catalog: any): Promise<any> {
  // check catalog exists to be updated
  const existing = await prisma.locations.findFirst({
    where: {
      location: catalog.location,
    },
  });
  if (!existing) {
    const error = {
      errors: {
        location: ["Localisation n'existe plus !"],
      },
    };
    return error;
  }

  // If catalog already exists
  const savedCatalog = { ...catalog };
  // console.log('saved catalog', savedCatalog);
  try {
    const id = catalog.id;
    delete catalog.transaction;
    delete catalog.index;
    delete catalog.comment;
    delete catalog.id;
    delete catalog.created;
    delete catalog.changed;
    if (catalog.floor === null || catalog.floor === undefined)
      catalog["floor"] = null;
    // console.log("catalog", catalog);

    let catalogResult = await prisma.locations.update({
      where: { id: id },
      data: {
        ...catalog,
      },
    });
    console.log("savedCatalog", savedCatalog);
    let result = {
      ...catalogResult,
      transaction: savedCatalog.transaction,
      index: savedCatalog.index,
      comment: savedCatalog.comment,
    };
    return result;
  } catch (error: any) {
    // console.log("Updater error: " + error);
    let result = {
      error: error,
      transaction: savedCatalog.transaction,
      index: savedCatalog.index,
      comment: savedCatalog.comment,
    };
    return result;
  }
}
// Handle catalog update on POST.
exports.updateMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    console.log("in updateManyPost");
    response.send("NOT IMPLEMENTED: Catalog delete GET");
    const catalogs = request.body;
    // console.log("catalogs", catalogs);

    try {
      let res = await Promise.all(
        catalogs.map((catalog: any) => {
          return updater(catalog);
        })
      );
      console.log("res", res);
      return response.status(201).json(res);
    } catch (error: any) {
      console.log("locationsController updateMany_post", error.message);
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

// Handle catalog delete on POST.
exports.deleteMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    response.send("NOT IMPLEMENTED: Catalog delete GET");

    // Check if catalogs exists
    let ids = request.body.map((item: any) => parseInt(item.id, 10));

    const existing = await prisma.locations.findMany({
      where: {
        id: { in: ids },
      },
    });
    const existingIds = existing.map((item: any) => item.ids);
    console.log("ids", ids, "existingIds", existing);

    // check duplicates
    if (existing?.length < ids.length) {
      const error = {
        errors: {
          status: 500,
          message: "Localisation n'existe plus !",
          id: true,
          items: existing,
        },
      };
      // console.error(error);
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.locations.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("locationsController detleteMany", error.message);
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
