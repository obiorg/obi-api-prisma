import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";
import { ErrorHelper } from "../../utils/helper/ErrorHelper";

// Import the module
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient({
  log: [
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
      let all = await prisma.tags_memories.findMany({
        orderBy: { id : "asc" },
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
      const count = await prisma.tags_memories.count();
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
      const result = await prisma.tags_memories.findMany({
        skip:
          parseInt(requestFilter.page, 10) * parseInt(requestFilter.rows, 10),
        take: parseInt(requestFilter.rows),
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
    const sortingClause = model.convSortingReactToPrisma(
      reqFilter.multiSortMeta
    );

    try {
      const all = await prisma.tags_memories.count({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).json(all);
      } else {
        return response.status(400).json("... is empty");
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
      const byId = await prisma.tags_memories.findUnique({
        where: {
          id: id,
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json("catalog ... with id(" + id + ") not found");
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
    let controllerName = 'TagsMemoriesController';
    //console.log(controllerName + " create_post", request.body);

    try {
      // Check if duplicate catalog on
      // // => name
      let existing = await prisma.tags_memories.findFirst({
        where: {
          name: request.body.name,
        },
      });
      let existingError = false;
      let error: any = ErrorHelper.default(400);
      if (existing) {
        error.errors = {
          name: ["Doublon ! ...déjà spécifié !"],
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

      const catalogResult = await prisma.tags_memories.create({
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      //console.log(controllerName + " create_post", create_post", error.message);
      return response.status(500).json(error.message);
    }
  }
);

// POST : Create post
exports.createMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    let controllerName = 'TagsMemoriesController';
    let catalogs = request.body; //.map((item: any) => {item.company, item.address});

    //
    try {
      // Check if duplicate catalog on
      // // => name
      let existing = await prisma.tags_memories.findMany({
        where: {
          name: { in: catalogs.map((c: any) => c.name) },
        },
      });
      let existingError = false;
      let error: any = ErrorHelper.default(400);
      if (existing?.length > 0) {
        error.errors = {
          name: ["Doublon ! ...déjà spécifié !"],
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
      });

      const catalogResult = await prisma.tags_memories.createMany({
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
    let controllerName = 'TagsMemoriesController';
    //console.log(controllerName + " update_post", request.body);

    //
    // Check not remove components
    //
    try {
      // Check if duplicate catalog on
      let existing = await prisma.tags_memories.findFirst({
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
      // // => name
      let existing = await prisma.tags_memories.findFirst({
        where: {
          id: { not: request.body.id },
          name: request.body.name,
        },
      });
      let existingError = false;
      let error: any = ErrorHelper.default(400);
      if (existing) {
        error.errors = {
          name: ["Doublon ! ...déjà spécifié !"],
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

      const catalogResult = await prisma.tags_memories.update({
        where: { id: id },
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log(controllerName + " update_post", error.message);
      return response.status(500).json(error);
    }
  }
);

async function updater(catalog: any): Promise<any> {
  let controllerName = 'TagsMemoriesController';
  //
  // Check not remove components
  //
  try {
    // Check if duplicate catalog on
    let existing = await prisma.tags_memories.findFirst({
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
    // // => name
    let existing = await prisma.tags_memories.findFirst({
      where: {
        id: { not: catalog.id },
        name: catalog.name,
      },
    });
    let existingError = false;
    let error: any = ErrorHelper.default(400);
    if (existing) {
      error.errors = {
        name: ["Doublon ! ...déjà spécifié !"],
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

    const catalogResult = await prisma.tags_memories.update({
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
      items: catalogResult
    }

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
  let controllerName = 'TagsMemoriesController';
    const catalogs = request.body;
    // console.log("catalogs", catalogs);

    try {
      let res = await Promise.all(
        catalogs.map((catalog: any) => {
          return updater(catalog);
        })
      );
      // console.log("res", res);
      return response.status(201).json(res);
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
    let controllerName = 'TagsMemoriesController';
    const id: number = parseInt(request.params.id, 10);

    // check duplicates
    const existing = await prisma.tags_memories.findFirst({
      where: {
        id: id,
      },
    });
    let error: any = ErrorHelper.default(400);
    if (!existing) {
      error = {
        errors: {
          ...error.errors,
          name: [" n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.tags_memories.delete({
        where: { id: id },
      });

      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log(controllerName + " update_post", error.message);
      return response.status(500).json(error);
    }
  }
);

// Handle catalog delete on POST.
exports.deleteMany_post = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    let controllerName = 'TagsMemoriesController';
    // Check if catalogs exists
    let ids = request.body.map((item: any) => parseInt(item.id, 10));

    const existing = await prisma.tags_memories.findMany({
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
      const catalogResult = await prisma.tags_memories.deleteMany({
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
      request.params.filename || "tagsMemories_" + Math.floor(Date.now() / 1000);
    const fields = prisma.tags_memories.fields;

    // Process request
    try {
      const result = await prisma.tags_memories.findMany({
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
