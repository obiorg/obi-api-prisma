import express from "express";

export const homeRouter = express.Router();



const portHttp: number = parseInt(process.env.PORT_HTTP as string, 10);
const portHttps: number = parseInt(process.env.PORT_HTTPS as string, 10);

const hostUrlHttp: string = process.env.HOST_URL_HTTP as string;
const hostUrlHttps: string = process.env.HOST_URL_HTTPS as string;


// Get : count
homeRouter.get("/", function (req, res, next) {
  res.render("index", { title: "OBI-API",
    http: `${portHttp}`,
    https: `${portHttps}`,
    hostUrlHttp: `${hostUrlHttp}`,
    hostUrlHttps: `${hostUrlHttps}`,
    apiDocs: `${hostUrlHttps}/api/v1/docs`  // API documentation URL  // Replace with your actual API documentation URL  // Example: https://example.com/api/v1/docs  // Replace with your actual API documentation URL  // Example: https://example.com/api/v1/docs  // Replace with your actual API documentation URL  // Example: https://example.com/api
  });
});


