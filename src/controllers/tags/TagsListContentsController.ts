import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";

// Import the module
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient({
  // log: ["query"],
});

// Display list of all catalog.
exports.list = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      let all = await prisma.tags_lists_content.findMany({
        orderBy: { id : "asc" },
        include: {
          companies: true,
          tags_lists: true,
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
      const count = await prisma.tags_lists_content.count();
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
      const result = await prisma.tags_lists_content.findMany({
        skip:
          parseInt(requestFilter.page, 10) * parseInt(requestFilter.rows, 10),
        take: parseInt(requestFilter.rows),
        where: whereClause,
        orderBy: sortingClause,
        include: {
          companies: true,
          tags_lists: true,
        },
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
      const all = await prisma.tags_lists_content.count({
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
      const byId = await prisma.tags_lists_content.findUnique({
        where: {
          id: id,
        },
        include: {
          companies: true,
          tags_lists: true,
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

// Display detail page for a specific catalog.
exports.detailListContent = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // response.send(`NOT IMPLEMENTED: Catalog detail: ${request.params.id}`);

    const list: number = parseInt(request.params.list, 10);
    const content: number = parseInt(request.params.content, 10);
    try {
      const listContent = await prisma.tags_lists_content.findMany({
        where: {
          list: list,
          content: content,

        },
        include: {
          companies: true,
          tags_lists: true,
        },
      });

      if (listContent) {
        return response.status(200).json(listContent);
      } else {
        return response
          .status(400)
          .json("catalog ... with id(" + listContent + ") not found");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Display detail page for a specific catalog.
exports.detailList = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // response.send(`NOT IMPLEMENTED: Catalog detail: ${request.params.id}`);

    const list: number = parseInt(request.params.list, 10);
    const company: number = parseInt(request.params.company, 10);
    try {
      const listContent = await prisma.tags_lists_content.findMany({
        where: {
          list: list,
          company: company,

        },
        include: {
          companies: true,
          tags_lists: true,
        },
      });

      if (listContent) {
        return response.status(200).json(listContent);
      } else {
        return response
          .status(400)
          .json("catalog ... with id(" + listContent + ") not found");
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
    const existing = await prisma.tags_lists_content.findFirst({
      where: {
        company: request.body.location,
        list: request.body.location,
        content: request.body.location,
      },
    });
    if (existing) {
      const error = {
        errors: {
          company: ["Doublon ! ...déjà spécifié !"],
          list: ["Doublon ! ...déjà spécifié !"],
          content: ["Doublon ! ...déjà spécifié !"],
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

      const catalogResult = await prisma.tags_lists_content.create({
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("TagsListContentsController create_post", error.message);
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
    const existing = await prisma.tags_lists_content.findFirst({
      where: {
        company: request.body.location,
        list: request.body.location,
        content: request.body.location,
      },
    });
    if (!existing) {
      const error = {
        errors: {
          company: ["... n'existe plus !"],
          list: ["... n'existe plus !"],
          content: ["... n'existe plus !"],
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

      const catalogResult = await prisma.tags_lists_content.update({
        where: { id: id },
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("TagsListContentsController update_post", error.message);
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
    const existing = await prisma.tags_lists_content.findFirst({
      where: {
        id: id,
      },
    });
    if (!existing) {
      const error = {
        errors: {
          company: ["... n'existe plus !"],
          list: ["... n'existe plus !"],
          content: ["... n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.tags_lists_content.delete({
        where: { id: id },
      });

      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("TagsListContentsController update_post", error.message);
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
      request.params.filename || "tagsListContents_" + Math.floor(Date.now() / 1000);
    const fields = prisma.tags_lists_content.fields;

    // Process request
    try {
      const result = await prisma.tags_lists_content.findMany({
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
