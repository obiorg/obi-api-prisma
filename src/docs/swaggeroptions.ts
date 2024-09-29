"use strict";

import * as dotenv from "dotenv";
dotenv.config();


const swaggeroptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "OBI API",
      version: "1.0.0",
      description:
        "This is a CRUD API application for OBI made with Express, Prisma and documented with Swagger",
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
      contact: {
        name: "r.hendrick",
        url: "https://IndustrialSystemManager.com",
        email: "info@IndustrialSystemManager.com",
      },
    },
    servers: [
      {
        url:
          "https://localhost:" +
          process.env.PORT_HTTP +
          "/api/" +
          process.env.VERSION +
          "/docs",
      }, 
    ],
    tags: [
      {
        name: "Home",
        description: "Default Service Display Status",
      },

      {
        name: "Alarms/alarms",
        description: "Alarms oprations",
      },
      {
        name: "Alarms/classes",
        description: "Alarms classes associated to alarms",
      },
      {
        name: "Alarms/groupes",
        description: "Alarms groupes to group alarms",
      },
      {
        name: "Alarms/renders",
        description: "Alarms renders sepecify a rendering way",
      },

      {
        name: "Analyses/allowed",
        description: "Analyses allowed on sample points",
      },
      {
        name: "Analyses/categories",
        description: "Analyses categories classifie analyses",
      },
      {
        name: "Analyses/groupes",
        description: "Analyses groupes allowed to regroup analyses",
      },
      {
        name: "Analyses/methods",
        description: "Analyses methods to followed on type analyses",
      },
      {
        name: "Analyses/points",
        description: "Analyses points described sampling points",
      },
      {
        name: "Analyses/types",
        description: "Analyses types on sample points",
      },

      {
        name: "Businesses/Businesses",
        description: "Businesses of an entity",
      },
      {
        name: "Businesses/Companies",
        description: "Businesses companies are associated to a business",
      },
      {
        name: "Businesses/Entities",
        description: "Businesses entities are top level structure or coporate",
      },

      {
        name: "Connexions/machines",
        description: "Connexions machines discribes communication components",
      },
      {
        name: "Connexions/machinesDrivers",
        description: "Connexions drivers defines communication protocol",
      },

      {
        name: "Localisations/locations",
        description: "Locations refer to geographic positions or addresses",
      },
      {
        name: "Localisations/Cities",
        description: "Informations related to cities",
      },
      {
        name: "Localisations/Countries",
        description: "Informations related to countries",
      },
      {
        name: "Localisations/Regions",
        description: "Informations related to regions or continent",
      },
      {
        name: "Localisations/States",
        description: "Informations related to states or province",
      },
      {
        name: "Localisations/SubRegions",
        description: "Informations related to sub regions ",
      },

      
      {
        name: "Maintenance/equExtDatas",
        description: "Informations of external data of equipement",
      },
      {
        name: "Maintenance/equipements",
        description: "Informations of internal equipement",
      },
      {
        name: "Maintenance/equProvider",
        description: "Informations of the provider of equipement",
      },

      
      {
        name: "Measures/Comparators",
        description: "Informations measuring comprators ",
      },
      {
        name: "Measures/limits",
        description: "Informations measuring limits ",
      },
      {
        name: "Measures/limitsGroups",
        description: "Informations measuring groups limits ",
      },
      {
        name: "Measures/units",
        description: "Informations measuring units ",
      },


      {
        name: "Persistences/Persistences",
        description: "Informations of persistences list",
      },
      {
        name: "Persistences/Standard Limit",
        description: "Informations of persistences limits",
      },
      {
        name: "Persistences/Methods",
        description: "Informations of persistences methods",
      },
      {
        name: "Persistences/Standards",
        description: "Informations of persistences standars",
      },

    ],
  },
  
  apis: ["src/routes/persistences/*.js"],
};

module.exports = swaggeroptions;
