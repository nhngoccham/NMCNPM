import express from "express";
import * as controllers from "./roundControllers";
const roundRoutes = new express.Router();

roundRoutes.get("/", controllers.get);


roundRoutes.get("/:id/tables", controllers.getTables);
roundRoutes.get("/:id/matches", controllers.getMatches);

roundRoutes.post("/", controllers.create);

export default roundRoutes;
