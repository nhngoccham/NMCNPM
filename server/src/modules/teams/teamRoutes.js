import express from "express";
import * as controllers from "./teamControllers";
const teamRoutes = new express.Router();

teamRoutes.get("/", controllers.get);
teamRoutes.get("/me", controllers.getMyTeams);

teamRoutes.get("/:id", controllers.getById);

teamRoutes.get("/:id/matches", controllers.getMatchesByTeamId);
teamRoutes.post("/", controllers.create);

teamRoutes.post("/:id/members", controllers.createMember);
teamRoutes.put("/:id/members", controllers.updateMember);
teamRoutes.delete("/:id/members", controllers.deleteMember);
export default teamRoutes;
