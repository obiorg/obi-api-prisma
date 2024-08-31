import { Request, Response } from "express";
import { Model } from "../../utils/model";
import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();



// export const registerLocations = (req: Request, res: Response) => {
//   // Handle user registration logic using validated data from req.body

//   console.log("resquested !'");
//   res.json({
//     message: "Register locations processed successfully",
//     data: req.body,
//   });
// };

// export const Locations_getLazy = async (req: Request, res: Response) => {
//   // Get Request react filter
//   const reqFilter: any = JSON.parse(req.params.filter);
//   // console.log(reqFilter);

//   // Manage Filters and sorting
//   const model = new Model();
//   // console.log("Request Filters", reqFilter.filters);
//   // console.log("Request Sorting", reqFilter.multiSortMetaData);
//   const whereClause = model.convFilterReactToPrisma(reqFilter.filters);
//   const sortingClause = model.convSortingReactToPrisma(reqFilter.multiSortMeta);

//   // console.log("whereClause", whereClause);
//   // console.log("sortingClause", sortingClause);

//   /**
//    * Process request
//    */
//   try {
//     const result = await prisma.locations.findMany({
//       skip: parseInt(reqFilter.page, 10) * parseInt(reqFilter.rows, 10),
//       take: parseInt(reqFilter.rows),
//       where: whereClause,
//       orderBy: sortingClause,
//     });

//     if (result) {
//       return res.status(200).json(result);
//     } else {
//       const status400 = '{ "status": 400, "message": "Bad request" }';
//       return res.status(400).json(status400);
//     }
//   } catch (error: any) {
//     return res.status(500).json(error.message);
//   }
// };


// catalog/ — The home/index page.
// catalog/<objects>/ — The list of all books, bookinstances, genres, or authors (e.g. /catalog/books/, /catalog/genres/, etc.)
// catalog/<object>/<id> — The detail page for a specific book, bookinstance, genre, or author with the given _id field value (e.g. /catalog/book/584493c1f4887f06c0e67d37).
// catalog/<object>/create — The form to create a new book, bookinstance, genre, or author (e.g. /catalog/book/create).
// catalog/<object>/<id>/update — The form to update a specific book, bookinstance, genre, or author with the given _id field value (e.g. /catalog/book/584493c1f4887f06c0e67d37/update).
// catalog/<object>/<id>/delete — The form to delete a specific book, bookinstance, genre, or author with the given _id field value (e.g. /catalog/book/584493c1f4887f06c0e67d37/delete).

