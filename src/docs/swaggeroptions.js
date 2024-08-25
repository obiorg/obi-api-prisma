'use strict'

const config = require('../../config.ts');

const swaggeroptions = {
    definition: {
        openapi: "3.1.0",
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
                url: "https://IndustrialSystemManager.com",
                email: "info@IndustrialSystemManager.com",
            },
        },
        servers: [
            {
                url: "https://localhost:" + config.port + "/api/" + config.version + "/docs",
            },
        ],
        tags: [
            {
                name: "Administration",
                description: "The administration part of the application"
            },
            {
                name: "HR",
                description: "The human resources part of the application"
            }
        ],
        
    },
apis: ["app/routes/*.js"],
};


module.exports = swaggeroptions;
