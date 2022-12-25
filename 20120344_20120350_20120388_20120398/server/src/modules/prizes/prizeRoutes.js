import express from "express";
import * as controllers from "./prizeControllers";
const prizeRoutes = new express.Router();

prizeRoutes.get("/", controllers.get);


prizeRoutes.post("/", controllers.create);

export default prizeRoutes;
