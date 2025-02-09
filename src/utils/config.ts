

import * as assert from "assert";
import * as dotenv from "dotenv";

dotenv.config();


const { PORT_HTTP, PORT_HTTPS, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, SQL_PORT, SQL_INSTANCENAME } = process.env;
const sqlEncrypt = (process.env.SQL_ENCRYPT === 'true');
assert(PORT_HTTPS, 'PORT is required');
assert(HOST, 'HOST is required');

const config = {
    port: PORT_HTTPS, 
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        port: SQL_PORT,
        options: {
            encrypt: sqlEncrypt,
            instancename: SQL_INSTANCENAME,
            enableArithAbort: true,
            trustedconnection: true,
            trustServerCertificate: true
        }
    },
    api: {
        path: "/api",
        version: "/v1",
        prependUrl: "/api/v1"
    }
};


module.exports = config ;
