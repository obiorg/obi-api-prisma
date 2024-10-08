import * as dotenv from "dotenv";



import * as fs from "fs";
import * as http from "http";
import * as https from "https";



  

/**
 * Add Application Service
 */
const app = require("./src");// use for logging
dotenv.config();

if (!process.env.PORT_HTTP) {
  console.log("Please configure PORT_HTTP in .env");
  process.exit(1);
}
if (!process.env.PORT_HTTPS) {
  console.log("Please configure PORT_HTTPS in .env");
  process.exit(1);
}

const portHttp: number = parseInt(process.env.PORT_HTTP as string, 10);
const portHttps: number = parseInt(process.env.PORT_HTTPS as string, 10);

const hostUrlHttp: string = process.env.HOST_URL_HTTP as string;
const hostUrlHttps: string = process.env.HOST_URL_HTTPS as string;
const hostUrlDocsHttp: string = process.env.HOST_URL_DOCS_HTTP as string;
const hostUrlDocsHttps: string = process.env.HOST_URL_DOCS_HTTPS as string;


/**
 * Manage safety
 */
var privateKey = fs.readFileSync("certs/obikey.pem");
var certificate = fs.readFileSync("certs/obi.pem");
var credentials = { key: privateKey, cert: certificate};
  
/**
 * Express Configuration
 */

/**
 * Add Middleware
 */

 
/**
 * Create the security configuration
 */
var httpServer = http.createServer(app); 
var httpsServer = https.createServer(credentials, app);
httpServer.listen(portHttp);
httpsServer.listen(portHttps);
console.log(
  "Server is running!\n",
  `API listening on port  ${portHttp} + ! Go to ${hostUrlHttp} \n`,
  `API listening on port  ${portHttps} + ! Go to ${hostUrlHttps} \n`,
  `API Docs listening on port  ${portHttp} + ! Go to ${hostUrlDocsHttp} \n`,
  `API Docs listening on port  ${portHttps} + ! Go to ${hostUrlDocsHttps} \n`,
);
