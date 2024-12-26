

import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import AppsLoader from "./src/apps/AppsLoader.js";
import sequelizeSoog from "./src/apps/soog/db/sequelize.js";
import sequelizeGlobal from "./src/db/sequelize.js";

import { AppRequest, AppResponse, ErrObj } from "./src/helpers/types.js";


const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // 100 requests per IP
  message: "Too many requests, please slow down",
});

const app = express();
// @todo check not sure if needed since im only accepting query params
app.use(express.json());

const appDbs : [typeof sequelizeSoog, typeof sequelizeGlobal] = [sequelizeSoog, sequelizeGlobal];

//sync dbs
// Test the database connection
(async () => {
  for (let i = 0; i < appDbs.length; i++) {
    const sq = appDbs[i];

    try {
      await sq.authenticate();

      // Sync the models with the database
      await sq.sync({ alter: true, force: false }); // Use `force: true` to drop tables and recreate them
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
})();

//not needed atm

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

//handle app errors mainly to do with body request parsing error
app.use(function (err : ErrObj, req : AppRequest, res : AppResponse, next : () => any) {
  // handle err
  if (err) {
    res.status(400).json({
      status: "error",
      message: err.message ?? "Invalid request",
    });
  } else {
    next();
  }
});

app.use(helmet()); //sets security headers
app.use(cors()); //protects from xss
app.use(hpp()); //protects from paramater polution
app.use(limiter); //limit number of requests

app.get("/", (req : AppRequest, res : AppResponse) => {
  res.status(301).json({
    message: "Please request the POST /api endpoint",
  });
});

//all actions are achieved via post request i.e get, patch, delete and post
app.all("/:app/:action", (req : AppRequest, res : AppResponse) => {
  new AppsLoader(req, res);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`running on localhost:${process.env.SERVER_PORT}`);
});
