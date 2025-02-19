const swaggerAutogen = require("swagger-autogen")();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const doc = {
  info: {
    title: "Swagger OBI Express API",
    version: "1.0.0",
    description:
      "This is a CRUD API application for OBI made with Express and documented with Swagger",
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
    contact: {
      name: "r.hendrick",
      url: "https://OneBreweryIndustry.com",
      email: "info@OneBreweryIndustry.com",
    },
  },
  servers: [
    {
      url: "https://localhost:7023/api/v1/docs",
    },
  ],
  tags: [
    {
      name: "Home",
      description: "Default Service Display Status",
    },
    {
      name: "Businesses/Entities",
      description: "Manage entities api CRUD operations",
    },
    {
      name: "Businesses/Businesses",
      description: "Manage businesses of an entity",
    },
    {
      name: "Businesses/Companies",
      description: "Manage companies of businesses",
    },

    {
      name: "Process/AnalyseData",
      description: "The data management encoding",
    },
    {
      name: "HR",
      description: "The human resources part of the application",
    },
  ],
  apis: ["app/routes/*.js"],
  host: "localhost:7023",
  basePath: "/api/v1",
  schemes: ["https", "http"],
  consumes: ["application/json"],
  produces: ["application/json", "text/json", "text/plain", "text/html"],

  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
    // ,
    // petstore_auth: {
    //     type: "oauth2",
    //     authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
    //     flow: "implicit",
    //     scopes: {
    //         read_pets: "read your pets",
    //         write_pets: "modify pets in your account"
    //     }
    // }
  },
  definitions: {
    Entreprises: {
      type: "object",
      object: [
        "e_id",
        "e_entreprise",
        "e_designation",
        "e_builded",
        "e_main",
        "e_activated",
        "e_deleted",
        "e_created",
        "e_changed",
      ],
      required: {
        e_entreprise: "entreprise code",
        e_designation: "entreprise designation",
        e_builded: "entreprise builded year",
        e_main: "entreprise specified as main",
        e_activated: "entreprise activated for use",
      },
      e_id: 1,
      e_entreprise: "Entreprise code",
      e_designation: "Entreprise Designation",
    },
    //     Parents: {
    //         father: "Simon Doe",
    //         mother: "Marie Doe"
    //     },
    //     User: {
    //         name: "Jhon Doe",
    //         age: 29,
    //         parents: {
    //             $ref: '#/definitions/Parents'
    //         },
    //         diplomas: [
    //             {
    //                 school: "XYZ University",
    //                 year: 2020,
    //                 completed: true,
    //                 internship: {
    //                     hours: 290,
    //                     location: "XYZ Company"
    //                 }
    //             }
    //         ]
    //     },
    //     AddUser: {
    //         $name: "Jhon Doe",
    //         $age: 29,
    //         about: ""
    //     }
  },
};

const outputFile = "./app/docs/swagger.json";
const endpointsFiles = [
  "./../routes/home.js",


  "./../routes/alarms/alarms.router.js",
  "./../routes/alarms/classes.router.js",
  "./../routes/alarms/groupes.router.js",
  "./../routes/alarms/renders.router.js",

  "./../routes/analyses/allowed.router.js",
  "./../routes/analyses/categories.router.js",
  "./../routes/analyses/groupes.router.js",
  "./../routes/analyses/methods.router.js",
  "./../routes/analyses/points.router.js",
  "./../routes/analyses/types.router.js",

  "./../routes/businesses/businesses.router.js",
  "./../routes/businesses/comapanies.router.js",
  "./../routes/businesses/entities.router.js",

  "./../routes/connexions/machines.router.js",
  "./../routes/connexions/machinesDrivers.router.js",

  "./../routes/localisations/locations.router.js",
  "./../routes/localisations/locationsCities.router.js",
  "./../routes/localisations/locationsCountries.router.js",
  "./../routes/localisations/locationsRegions.router.js",
  "./../routes/localisations/locationsStates.router.js",
  "./../routes/localisations/locationsSubRegions.router.js",

  "./../routes/maintenance/equExtDatas.router.js",
  "./../routes/maintenance/equipements.router.js",
  "./../routes/maintenance/equProvider.router.js",
  
  "./../routes/measures/comparators.router.js",
  "./../routes/measures/limits.router.js",
  "./../routes/measures/limitsGroups.router.js",
  "./../routes/measures/units.router.js",

  "./../routes/persistences/persistences.router.js",
  "./../routes/persistences/persLimitsStandards.router.js",
  "./../routes/persistences/persMethods.router.js",
  "./../routes/persistences/persStandards.router.js",

  "./../routes/tags/tags.router.js",
  "./../routes/tags/tagsList.router.js",
  "./../routes/tags/tagsListContents.router.js",
  "./../routes/tags/tagsListType.router.js",
  "./../routes/tags/tagsMemories.router.js",
  "./../routes/tags/tagsTables.router.js",
  "./../routes/tags/tagsTypes.router.js",

  // "./../routes/users/tags.router.js",
];


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OAP API Reference',
      version: '1.0.0',
      description: 'One Brewery Industry - Express API power by prisma',
    },
  },
  apis: ['./../routes/*.js'], // Path to your API routes
};
const specs = swaggerJsdoc(options);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//   require("../../server.ts/index.js");
// });

module.exports = {
  specs,
  swaggerUi,
};