import express, { Application } from "express";
import "dotenv/config";
import { developRoutes } from "./routers/developer.routers";

export const app: Application = express();

app.use(express.json())

app.use('/developers', developRoutes)
