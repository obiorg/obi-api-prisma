import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";

// Import the module
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient({
  log: [
    "query",
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

// Display list of all catalog.
exports.list = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      let all = await prisma.locations.findMany({
        orderBy: { id: "asc" },
        include: {
          loc_countries: true,
          loc_states: true,
          loc_cities: true,
        },
      });
      return response.status(200).json(all);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display count of all catalog.
exports.list_count = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      const count = await prisma.locations.count();
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

    // console.log("location where clause: " + whereClause);

    // Process request
    try {
      const result = await prisma.locations.findMany({
        skip:
          parseInt(requestFilter.page, 10) * parseInt(requestFilter.rows, 10),
        take: parseInt(requestFilter.rows),
        where: whereClause,
        orderBy: sortingClause,
        include: {
          loc_countries: true,
          loc_states: true,
          loc_cities: true,
        },
      });

      if (result) {
        return response.status(200).json(result);
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
      const all = await prisma.locations.count({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).json(all);
      } else {
        return response.status(400).json("location is empty");
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
      const byId = await prisma.locations.findUnique({
        where: {
          id: id,
        },
        include: {
          loc_countries: true,
          loc_states: true,
          loc_cities: true,
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json("catalog location with id(" + id + ") not found");
      }
    } catch (error: any) {
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
    // console.log('check if existing');
    const existing = await prisma.locations.findFirst({
      where: {
        location: request.body.location,
      },
    });
    if (existing) {
      const error = {
        errors: {
          location: ["Doublon ! ...déjà spécifié !"],
        },
      };
      console.error(error);
      return response.status(400).json(error);
    }

    // If not duplicates
    try {
      const catalog = request.body;
      delete catalog.id;
      delete catalog.created;
      delete catalog.changed;
      if (catalog.floor === null || catalog.floor === undefined)
        catalog["floor"] = null;
      // console.log("catalog", catalog);

      const catalogResult = await prisma.locations.create({
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("locationsController create_post", error.message);
      return response.status(500).json(error.message);
    }
  }
);

// POST : Create post
exports.createMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // Check duplication
    let catalogs = request.body.map((item: any) => item.location);
    const existing = await prisma.locations.findMany({
      where: {
        location: { in: catalogs },
      },
    });
    const existingLocations = existing.map((item: any) => item.locations);
    // console.log("ids", catalogs, existingLocations);
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
      // console.error(error);
      return response.status(400).json(error);
    }

    // If not duplicates
    try {
      catalogs = request.body;
      catalogs.forEach((catalog: any) => {
        delete catalog.transaction;
        delete catalog.index;
        delete catalog.comment;
        delete catalog.id;
        delete catalog.created;
        delete catalog.changed;
        if (catalog.floor === null || catalog.floor === undefined)
          catalog["floor"] = null;
        // console.log("catalog", catalog);
      });

      const catalogResult = await prisma.locations.createMany({
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
    const existing = await prisma.locations.findFirst({
      where: {
        location: request.body.location,
      },
    });
    if (!existing) {
      const error = {
        errors: {
          location: ["Localisation n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    // If not duplicates
    try {
      const catalog = request.body;
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

      const catalogResult = await prisma.locations.update({
        where: { id: id },
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("locationsController update_post", error.message);
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
  const savedCatalog = {...catalog};
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
    const existing = await prisma.locations.findFirst({
      where: {
        id: id,
      },
    });
    if (!existing) {
      console.log("n existe pas !");
      const error = {
        errors: {
          location: ["Localisation n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.locations.delete({
        where: { id: id },
      });

      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("locationsController update_post", error.message);
      return response.status(500).json(error);
    }
  }
);

// Handle catalog delete on POST.
exports.deleteMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {

    // Check if catalogs exists
    let ids = request.body.map((item: any) => parseInt(item.id, 10));
    
    const existing = await prisma.locations.findMany({
      where: {
        id: { in: ids },
      },
    });
    const existingIds = existing.map((item: any) => item.ids);
    console.log('ids', ids, 'existingIds', existing);

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
           id: { in :  ids },
        }
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
      request.params.filename || "locations_" + Math.floor(Date.now() / 1000);
    const fields = prisma.locations.fields;

    // Process request
    try {
      const result = await prisma.locations.findMany({
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
