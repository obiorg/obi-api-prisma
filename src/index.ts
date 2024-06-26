/*
 * Run the project and access the documentation at: http://localhost:7023/docs
 *
 * Use the command below to generate the documentation without starting the project:
 * $ npm start
 *
 * Use the command below to generate the documentation at project startup:
 * $ npm run start-gendoc
 */
import * as dotenv from "dotenv";
import * as assert from "assert";

const express = require('express')
const cors = require('cors');   /** Allow to access resources from other domain */
const bodyParser = require('body-parser')





/**
 * Define cors options
 * 
 * Usage example : 
 *  app.get('/products/:id', cors(corsOptions), (req, res, next) => {
 *      //...
 *  })
 * 
 */
const whitelist = ['http://localhost:7023/', 'http://localhost:7025']
const corsOptions = {
    // origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true)
    //     } else {
    //         callback(new Error('Not allowed by CORS'))
    //     }
    // }
}


/**
 * Swagger Configuration
 */
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require('./docs/swagger.json');



/**
 * API Reference
 */
import { entitiesRouter } from "./entities/entities.router";
import { companiesRouter } from "./routes/businesses/companies.router";
import { businessesRouter } from "./routes/businesses/businesses.router";
// import { locCountriesRouter } from "./loc_countries/loc_countries.router";

import { persistencesRouter } from "./routes/persistences/persistences.router";
import { persStandardsRouter } from "./routes/persistences/persStandards.router";

import { machinesDriversRouter } from "./routes/connexions/machinesDrivers.router";
import { machinesRouter } from "./routes/connexions/machines.router";



/**
 * SETUP EXPRESS
 */
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());





/**
 * Swagger API endpoint
 */


/** Businesses */
app.use("/api/v1/businesses/entities", entitiesRouter);
app.use("/api/v1/businesses/businesses", businessesRouter);
app.use("/api/v1/businesses/companies", companiesRouter);

/** Connexions */
app.use("/api/v1/connexions/machines/drivers", machinesDriversRouter);
app.use("/api/v1/connexions/machines", machinesRouter);

/** Persistence */
app.use("/api/v1/persistences", persistencesRouter);
app.use("/api/v1/persistences/standards", persStandardsRouter);



 


/**
 * Setup swagger API documentation
 */
app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  //swaggerUi.setup(swaggerFile)            // without a search bar 
  swaggerUi.setup(swaggerFile, { explorer: true })  // add a search bar
);





/**
 * Serving static files
 */
app.use(express.static('public'));



module.exports = app;














// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const allTagsTypes = await prisma.tags_types.findMany();
//   console.log(allTagsTypes);

//    const countCountries = await prisma.loc_countries.findFirst();
//    console.log('countCountries', countCountries);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })