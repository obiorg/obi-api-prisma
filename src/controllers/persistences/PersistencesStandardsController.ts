import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";
import json from "../../utils/helper/json";

// Import the module
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient({
  log: ["query"],
});

// Display list of all catalog.
exports.list = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    try {
      let all = await prisma.pers_standard.findMany({
        orderBy: { id: "asc" },
        include: {
          companies: true,
          tags: true,
          pers_standard_limits_pers_standard_limits_pers_standardTopers_standard:
            true,
        },
      });
      return response.status(200).send(json(all));
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

exports.dedicatedCatalogByTag = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    console.log(request.params);
    const tag: any = JSON.parse(request.params.tag);
    const from: any = parseInt(request.params.from, 10);
    const to: any = parseInt(request.params.to, 10);
    const sortField: any = request.params.sortField;
    const sortOrder: any = request.params.order;
    const sort = {
      [sortField]: sortOrder === "asc" ? "asc" : "desc",
    };

    console.log(tag, from, to, sortField, sortOrder);

    try {
      let all = await prisma.pers_standard.findMany({
        orderBy: sort,
        skip: from,
        take: to - from + 1,
        where: {
          AND: {
            tag: tag,
          },
        },
        include: {
          companies: true,
          tags: true,
          pers_standard_limits_pers_standard_limits_pers_standardTopers_standard:
            true,
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
      const count = await prisma.pers_standard.count();
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
      const result = await prisma.pers_standard.findMany({
        skip:
          parseInt(requestFilter.page, 10) * parseInt(requestFilter.rows, 10),
        take: parseInt(requestFilter.rows),
        where: whereClause,
        orderBy: sortingClause,
        include: {
          companies: true,
          tags: true,
          pers_standard_limits_pers_standard_limits_pers_standardTopers_standard:
            true,
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
      const all = await prisma.pers_standard.count({
        where: whereClause,
        orderBy: sortingClause,
      });

      if (all) {
        // console.log(all);
        return response.status(200).send(json(all));
      } else {
        return response.status(400).json("...is empty");
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
      const byId = await prisma.pers_standard.findUnique({
        where: {
          id: id,
        },
        include: {
          companies: true,
          tags: true,
          pers_standard_limits_pers_standard_limits_pers_standardTopers_standard:
            true,
        },
      });

      if (byId) {
        return response.status(200).json(byId);
      } else {
        return response
          .status(400)
          .json("catalog ...with id(" + id + ") not found");
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
    // const existing = await prisma.pers_standard.findFirst({
    //   where: {
    //     company: request.body.company,
    //     tag: request.body.tag,
    //   },
    // });
    // if (existing) {
    //   const error = {
    //     errors: {
    //       company: ["Doublon ! ...déjà spécifié !"],
    //       tag: ["Doublon ! ...déjà spécifié !"],
    //     },
    //   };
    //   return response.status(400).json(error);
    // }

    // If not duplicates
    try {
      const catalog = request.body;
      delete catalog.id;
      delete catalog.created;
      delete catalog.changed;

      const catalogResult = await prisma.pers_standard.create({
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("PersistencesStandardsController create_post", error.message);
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
    const existing = await prisma.pers_standard.findFirst({
      where: {
        id: request.body.company,
      },
    });
    if (!existing) {
      const error = {
        errors: {
          id: ["n'existe plus !"],
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

      const catalogResult = await prisma.pers_standard.update({
        where: { id: id },
        data: {
          ...catalog,
        },
      });
      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("PersistencesStandardsController update_post", error.message);
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
    const existing = await prisma.pers_standard.findFirst({
      where: {
        id: id,
      },
    });
    if (!existing) {
      const error = {
        errors: {
          location: ["n'existe plus !"],
        },
      };
      return response.status(400).json(error);
    }

    try {
      const catalogResult = await prisma.pers_standard.delete({
        where: { id: id },
      });

      return response.status(201).json(catalogResult);
    } catch (error: any) {
      console.log("PersistencesStandardsController update_post", error.message);
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
      "pers_standard_" + Math.floor(Date.now() / 1000);
    const fields = prisma.pers_standard.fields;

    // Process request
    try {
      const result = await prisma.pers_standard.findMany({
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

// Average Min Max Hours
exports.averageMinMaxHours = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // console.log(request.params);
    const tag: any = JSON.parse(request.params.tag);
    const limits: any = parseInt(request.params.hours, 10);

    try {
      const result =
        await prisma.$queryRaw`SELECT TOP(${limits}) DATEADD(HOUR, DATEPART(HOUR, created), CAST(CAST(created as Date) as datetime)) [Time]
      , AVG(vFloat) AS Average
      , Min(vFloat) AS Minimal
      , Max(vFloat) AS Maximal
      FROM [OBI].[dbo].[pers_standard]
      WHERE tag = ${tag}
      GROUP BY DATEADD(HOUR, DATEPART(HOUR, created), CAST(CAST(created as Date) as datetime)) 
      ORDER BY [Time] desc`;

      return response.status(200).send(json(result));
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Average Min Max Days
exports.averageMinMaxDays = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // console.log(request.params);
    const tag: any = JSON.parse(request.params.tag);
    const limits: any = parseInt(request.params.days, 10);
    try {
      const all =
        await prisma.$queryRaw`SELECT TOP(${limits}) CAST(CAST(created as Date) as date) [day]
        , AVG(vFloat) AS Average
        , Min(vFloat) AS Minimal
        , Max(vFloat) AS Maximal
      FROM [OBI].[dbo].[pers_standard]
      WHERE tag = ${tag}
      GROUP BY CAST(CAST(created as Date) as date)
      ORDER BY [day] desc`;
      return response.status(200).send(json(all));
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Average Min Max Months
exports.averageMinMaxMonths = asyncHandler(
  async (request: Request, response: Response, next: any) => {
    // console.log(request.params);
    const tag: any = JSON.parse(request.params.tag);
    const limits: any = parseInt(request.params.months, 10);
    try {
      const all = await prisma.$queryRaw`SELECT TOP(${limits})
        datefromparts(year(created), month(created), 1) [Month]
        , AVG(vFloat) AS Average
        , Min(vFloat) AS Minimal
        , Max(vFloat) AS Maximal
      FROM [OBI].[dbo].[pers_standard]
      WHERE tag = ${tag}
      GROUP BY datefromparts(year(created), month(created), 1)`;
      return response.status(200).send(json(all));
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
