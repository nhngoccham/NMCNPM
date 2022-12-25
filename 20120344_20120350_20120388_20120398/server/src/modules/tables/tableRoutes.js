import express from "express";
import * as controllers from "./tableControllers";
const tableRoutes = new express.Router();

tableRoutes.get("/", controllers.get);
tableRoutes.get("/:id", controllers.getById);
tableRoutes.get("/:id/teams", controllers.getTeams);
tableRoutes.get("/:id/matches", controllers.getMatches);
tableRoutes.post("/", controllers.create);
tableRoutes.post("/:tableId/teams", controllers.createTeam);

export default tableRoutes;
