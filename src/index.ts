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
const cookieParser = require("cookie-parser");
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
// const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");
// // const swaggerFile = require("./docs/swagger.json");
// const swaggerOptions = require("./docs/swaggeroptions.ts");
// const specs = swaggerJsdoc(swaggerOptions);
const { specs, swaggerUi } = require('./docs/swagger');
/**
 * API Reference
 */
// HOME
import { homeRouter } from "./routes/home.router";

// ALARMS
import { alarmsClassesRouter } from "./routes/alarms/alarms_classes.router";
import { alarmsGroupsRouter } from "./routes/alarms/alarms_groups.router";
import { alarmsRendersRouter } from "./routes/alarms/alarms_renders.router";
import { alarmsRouter } from "./routes/alarms/alarms.router";

// ANALYSES
import { analyseAllowedRouter } from "./routes/analyses/analyse_allowed.router";
import { analyseCategoriesRouter } from "./routes/analyses/analyse_categories.router";
import { analyseMethodsRouter } from "./routes/analyses/analyse_methods.router";
import { analysePointsRouter } from "./routes/analyses/analyse_points.router";
import { analyseTypesRouter } from "./routes/analyses/analyse_types.router";

// BUSINESSES
import { businessesRouter } from "./routes/businesses/businesses.router";
import { companiesRouter } from "./routes/businesses/companies.router";
import { entitiesRouter } from "./routes/businesses/entities.router";

// CONNEXIONS
import { machinesRouter } from "./routes/connexions/machines.router";
import { machinesDriversRouter } from "./routes/connexions/machines_drivers.router";

// LOCALISATIONS
import { citiesRouter } from "./routes/localisations/locations_cities.router";
import { countriesRouter } from "./routes/localisations/locations_countries.router";
import { regionsRouter } from "./routes/localisations/locations_regions.router";
import { statesRouter } from "./routes/localisations/locations_states.router";
import { subRegionsRouter } from "./routes/localisations/locations_subregions.router";
import { locationsRouter } from "./routes/localisations/locations.router";

// MAINTENANCE
import { equipementsDataExternalRouter } from "./routes/maintenance/equipements_data_external.router";
import { equipementsExternalProvidersRouter } from "./routes/maintenance/equipements_external_providers.router";
import { equipementsRouter } from "./routes/maintenance/equipements.router";

// MEASURES
import { measuresComparatorsRouter } from "./routes/measures/meas_comparators.router";
import { measuresLimitsGroupsRouter } from "./routes/measures/meas_limits_groups.router";
import { measuresLimitsRouter } from "./routes/measures/meas_limits.router";
import { measuresUnitsRouter } from "./routes/measures/meas_units.router";

// PERSISTENCES
import { persistencesMethodsRouter } from "./routes/persistences/pers_methods";
import { persistencesStandardsLimitsRouter } from "./routes/persistences/pers_standards_limits.router";
import { persistencesStandardsRouter } from "./routes/persistences/pers_standards.router";
import { persistencesRouter } from "./routes/persistences/persistences.router";

// TAGS
import { tagsListContentsRouter } from "./routes/tags/tags_list_contents.router";
import { tagsListTypeRouter } from "./routes/tags/tags_list_type.router";
import { tagsListRouter } from "./routes/tags/tags_list.router";
import { tagsMemoriesRouter } from "./routes/tags/tags_memories.router";
import { tagsTablesRouter } from "./routes/tags/tags_tables.router";
import { tagsTypesRouter } from "./routes/tags/tags_types.router";
import { tagsRouter } from "./routes/tags/tags.router";

// USERS
import { usersAccountRoleRouter } from "./routes/users/users_account_role.router";
import { usersAccountRouter } from "./routes/users/users_account.router";
import { usersEmailVerifiedRouter } from "./routes/users/users_email_verified.router";
import { usersExternalProvidersRouter } from "./routes/users/users_external_providers.router";
import { usersHashingAlgorithmsRouter } from "./routes/users/users_hashing_algorithms.router";
import { usersLoginDataExternalRouter } from "./routes/users/users_login_data_external.router";
import { usersLoginDataRouter } from "./routes/users/users_login_data.router";
import { usersPermissionsRouter } from "./routes/users/users_permissions.router";
import { usersRolePermissionsRouter } from "./routes/users/users_role_permissions.router";
import { usersRolesRouter } from "./routes/users/users_roles.router";

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

// ALARMS
app.use(path_api_v1 + "/alarms/classes", alarmsClassesRouter);
app.use(path_api_v1 + "/alarms/groups", alarmsGroupsRouter);
app.use(path_api_v1 + "/alarms/renders", alarmsRendersRouter);
app.use(path_api_v1 + "/alarms/", alarmsRouter);

// ANALYSES
app.use(path_api_v1 + "/analyses/allowed", analyseAllowedRouter);
app.use(path_api_v1 + "/analyses/categories", analyseCategoriesRouter);
app.use(path_api_v1 + "/analyses/methods", analyseMethodsRouter);
app.use(path_api_v1 + "/analyses/points", analysePointsRouter);
app.use(path_api_v1 + "/analyses/types", analyseTypesRouter);

// BUSINESSES
app.use(path_api_v1 + "/businesses/", businessesRouter);
app.use(path_api_v1 + "/businesses/companies", companiesRouter);
app.use(path_api_v1 + "/businesses/entities", entitiesRouter);

// CONNEXIONS
app.use(path_api_v1 + "/connexions/machines", machinesRouter);
app.use(path_api_v1 + "/connexions/drivers", machinesDriversRouter);

// LOCALISATIONS
app.use(path_api_v1 + "/localisations/cities", citiesRouter);
app.use(path_api_v1 + "/localisations/countries", countriesRouter);
app.use(path_api_v1 + "/localisations/regions", regionsRouter);
app.use(path_api_v1 + "/localisations/states", statesRouter);
app.use(path_api_v1 + "/localisations/subregions", subRegionsRouter);
app.use(path_api_v1 + "/localisations/locations", locationsRouter);

// MAINTENANCE
app.use(path_api_v1 + "/maintenance/equipementsDataExternal", equipementsDataExternalRouter);
app.use(path_api_v1 + "/maintenance/equipementsExternalProviders", equipementsExternalProvidersRouter);
app.use(path_api_v1 + "/maintenance/equipements", equipementsRouter);

// MEASURES
app.use(path_api_v1 + "/measures/comparators", measuresComparatorsRouter);
app.use(path_api_v1 + "/measures/limitsgroups", measuresLimitsGroupsRouter);
app.use(path_api_v1 + "/measures/limits", measuresLimitsRouter);
app.use(path_api_v1 + "/measures/units", measuresUnitsRouter);

// PERSISTENCES 
app.use(path_api_v1 + "/persistences/methods", persistencesMethodsRouter);
app.use(path_api_v1 + "/persistences/standardslimits", persistencesStandardsLimitsRouter);
app.use(path_api_v1 + "/persistences/standards", persistencesStandardsRouter);
app.use(path_api_v1 + "/persistences/", persistencesRouter);

// PERSISTENCES
app.use(path_api_v1 + "/tags/listcontents", tagsListContentsRouter);
app.use(path_api_v1 + "/tags/listtype", tagsListTypeRouter);
app.use(path_api_v1 + "/tags/list", tagsListRouter);
app.use(path_api_v1 + "/tags/memories", tagsMemoriesRouter);
app.use(path_api_v1 + "/tags/tables", tagsTablesRouter);
app.use(path_api_v1 + "/tags/types", tagsTypesRouter);
app.use(path_api_v1 + "/tags/", tagsRouter);

// USERS
app.use(path_api_v1 + "/users/accountrole", usersAccountRoleRouter);
app.use(path_api_v1 + "/users/account", usersAccountRouter);
app.use(path_api_v1 + "/users/emailverified", usersEmailVerifiedRouter);
app.use(path_api_v1 + "/users/externalproviders", usersExternalProvidersRouter);
app.use(path_api_v1 + "/users/hashingalgorithms", usersHashingAlgorithmsRouter);
app.use(path_api_v1 + "/users/logindataexternal", usersLoginDataExternalRouter);
app.use(path_api_v1 + "/users/logindata", usersLoginDataRouter);
app.use(path_api_v1 + "/users/permissions", usersPermissionsRouter);
app.use(path_api_v1 + "/users/rolepermissions", usersRolePermissionsRouter);
app.use(path_api_v1 + "/users/roles", usersRolesRouter);


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
app.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
