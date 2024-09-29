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

const express = require("express");
const cors = require("cors"); /** Allow to access resources from other domain */
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const createError = require("http-errors");
const path = require("path");
const morgan = require("morgan"); // use for logging

/**
 * Define cors options
 *
 * Usage example :
 *  app.get('/products/:id', cors(corsOptions), (req, res, next) => {
 *      //...
 *  })
 *
 */
const whitelist = ["http://localhost:7023/", "http://localhost:7025"];
const corsOptions = {
  // origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //         callback(null, true)
  //     } else {
  //         callback(new Error('Not allowed by CORS'))
  //     }
  // }
};

/**
 * Swagger Configuration
 */
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerFile = require("./docs/swagger.json");
const swaggerOptions = require("./docs/swaggeroptions.ts")
const specs = swaggerJsdoc(swaggerOptions);

/**
 * API Reference
 */
// HOME
import { homeRouter } from "./routes/home.router";

import { entitiesRouter } from "./routes/businesses/entities.router";
import { companiesRouter } from "./routes/businesses/companies.router";
import { businessesRouter } from "./routes/businesses/businesses.router";


// localisations
import { locationsRouter } from "./routes/localisations/locations.router";
import { citiesRouter } from "./routes/localisations/locationsCities.router";
import { countriesRouter } from "./routes/localisations/locationsCountries.router";
import { regionsRouter } from "./routes/localisations/locationsRegions.router";
import { statesRouter } from "./routes/localisations/locationsStates.router";
import { subRegionsRouter } from "./routes/localisations/locationsSubRegions.router";

// Persistence
import { persistencesRouter } from "./routes/persistences/persistences.router";
import { persStandardsRouter } from "./routes/persistences/persStandards.router";

import { machinesDriversRouter } from "./routes/connexions/machinesDrivers.router";
import { machinesRouter } from "./routes/connexions/machines.router";

import { tagsRouter } from "./routes/tags/tags.router";

/**
 * SETUP EXPRESS
 */
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// /**
//  * Serving static files
//  */
// app.use(express.static("public"));


/**
 * Swagger API endpoint
 */
const path_home = "/obi";
const path_home_api = path_home + "/api";
const path_api_v1 = path_home_api + "/v1";

/** Home */
app.use(path_home, homeRouter);

/** Businesses */
app.use(path_api_v1 + "/businesses/entities", entitiesRouter);
app.use(path_api_v1 + "/businesses/businesses", businessesRouter);
app.use(path_api_v1 + "/businesses/companies", companiesRouter);

/** Localisations */
app.use(path_api_v1 + "/localisations/locations", locationsRouter);
app.use(path_api_v1 + "/localisations/cities", citiesRouter);
app.use(path_api_v1 + "/localisations/countries", countriesRouter);
app.use(path_api_v1 + "/localisations/regions", regionsRouter);
app.use(path_api_v1 + "/localisations/states", statesRouter);
app.use(path_api_v1 + "/localisations/subregions", subRegionsRouter);

/** Connexions */
app.use(path_api_v1 + "/connexions/machines/drivers", machinesDriversRouter);
app.use(path_api_v1 + "/connexions/machines", machinesRouter);

/** Persistence */
app.use(path_api_v1 + "/persistences", persistencesRouter);
app.use(path_api_v1 + "/persistences/standards", persStandardsRouter);

/** Tags */
app.use(path_api_v1 + "/tags", tagsRouter);

/**
 * Setup swagger API documentation
 */
// app.use(
//   path_api_v1 + "/docs",
//   swaggerUi.serve,
//   //swaggerUi.setup(swaggerFile)            // without a search bar
//   swaggerUi.setup(swaggerFile, { explorer: true }) // add a search bar
// );
app.use(path_api_v1 + "/docs", swaggerUi.serve, swaggerUi.setup(specs));


// catch 404 and forward to error handler
app.use(function (req:any, res:any, next:any) {
  next(createError(404));
});

// error handler
app.use(function (err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
