import Login from "@/components/Login/index";
import TeamDetail from "@/layout/TeamDetail/index";
import Leagues from "@/layout/Leagues/index";
import Teams from '@/layout/Teams/index'
import LeagueDetail from "@/layout/LeagueDetail/index";
import Home from "@/layout/Home/index";
import Profile from "@/layout/Profile/Profile";
import TableSetting from "@/layout/TableSetting/index";
import MatchSetting from "@/layout/MatchSetting/index";
import RoundSetting from "@/layout/RoundSetting/RoundSetting";
import NotFound from "@/layout/NotFound/index";
import ForgotPasswordForm from "@/components/ForgetPassword/index";

const routes = [
    {
        path: '/',
        Component: Home,
        exact: true
    },
    {
        path: '/leagues',
        Component: Leagues,
        exact: true
    },
    {
        path: '/teams',
        Component: Teams,
        exact: true
    },
    {
        path: '/teams/:id/:tab',
        Component: TeamDetail,
        exact: true
    },
    {
        path: '/leagues',
        Component: Leagues,
        exact: true
    },
    {
        path: '/leagues/:id/:tab',
        Component: LeagueDetail,
        exact: true
    },
    {
        path: '/profile/me',
        Component: Profile,
        exact: false
    },
    {
        path: '/leagues/:leagueId/table-setting',
        Component: TableSetting,
        exact: true
    },
    {
        path: '/leagues/:leagueId/rounds/:roundId/table-setting',
        Component: TableSetting,
        exact: false
    },
    {
        path: '/leagues/:leagueId/match-setting',
        Component: MatchSetting,
        exact: false
    },
    {
        path: '/leagues/:leagueId/rounds/:roundId/match-setting',
        Component: MatchSetting,
        exact: false
    },
    {
        path: '/leagues/:leagueId/rounds/:roundId/tables/:tableId/match-setting',
        Component: MatchSetting,
        exact: false
    },
    {
        path: '/leagues/:leagueId/round-setting',
        Component: RoundSetting,
        exact: false
    },
]

const noHeaderRoutes = [
    {
        path: '/login',
        Component: Login,
        exact: false
    },
    {
        path: '/forgot-password',
        Component: ForgotPasswordForm,
        exact: false
    },
    {
        path: '*',
        Component: NotFound,
        exact: false
    },
]

export { noHeaderRoutes, routes }