import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import * as path from "path";

const app = express();

useExpressServer(app, {
  controllers: [path.join(__dirname + "/api/controllers/*Controller.ts")]
}).listen(3000);
