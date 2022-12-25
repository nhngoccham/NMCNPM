import express from "express";
import * as controllers from "./leagueControllers";
const leagueRoutes = new express.Router();


leagueRoutes.get("/", controllers.get);

leagueRoutes.get("/me", controllers.getMyLeagues);
leagueRoutes.get("/:id", controllers.getById);
leagueRoutes.get("/:id/rounds", controllers.getRounds);
leagueRoutes.get("/:id/prizes", controllers.getPrizes);
leagueRoutes.post("/", controllers.create);

leagueRoutes.post("/:leagueId/teams", controllers.createTeam);
leagueRoutes.put("/:leagueId/teams", controllers.updateTeam);

leagueRoutes.post("/:leagueId/pay", controllers.pay);

leagueRoutes.get("/:id/standings/:type/:typeId", controllers.getStandings);

leagueRoutes.get("/:id/matches/", controllers.getAllMatches);
// leagueRoutes.get("/:id/matches/:isEnded", controllers.getMatches);

export default leagueRoutes;
