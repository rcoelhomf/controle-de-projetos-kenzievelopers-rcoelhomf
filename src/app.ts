import "express-async-errors"
import express, { Application } from "express";
import "dotenv/config";
import { developRoutes } from "./routers/developer.routers";
import { handleError } from "./middlewares/handleError";

export const app: Application = express();

app.use(express.json())

app.use('/developers', developRoutes)


app.use(handleError)
