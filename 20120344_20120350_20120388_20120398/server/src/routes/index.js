import authRoutes from "../modules/auth/authRoutes";
import { authJwt } from "../modules/auth/authControllers";
import leagueRoutes from "../modules/leagues/leagueRoutes";
import teamRoutes from "../modules/teams/teamRoutes";
import roundRoutes from "../modules/rounds/roundRoutes";
import tableRoutes from "../modules/tables/tableRoutes";
import matchRoutes from "../modules/matches/matchRoutes";
const useRoutes = (app) => {
    app.use("/v1/auth", authRoutes);
    app.use("/v1/leagues", authJwt, leagueRoutes);
    app.use("/v1/teams", authJwt, teamRoutes);
    app.use("/v1/rounds", authJwt, roundRoutes);
    app.use("/v1/tables", authJwt, tableRoutes);
    app.use("/v1/matches", authJwt, matchRoutes);
};

export default useRoutes;
