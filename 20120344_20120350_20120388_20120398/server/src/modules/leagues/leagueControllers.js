import leagueModel from "../../models/league/leagueModel";
import teamModel from "../../models/team/teamModel";
import tableModel from "../../models/table/tableModel";
import roundModel from "../../models/round/roundModel";
import prizeModel from "../../models/prize/prizeModel";
import matchModel from "../../models/match/matchModel";
import leagueHelper from "./leagueHelper";
import { STATUS } from "../../constants";
export const create = async (req, res) => {
    try {
        const {
            name,
            logo,
            startDate,
            endDate,
            registerDate,
            numTeamLimit,
            minNumMember,
            maxNumMember,
            minAgeMember,
            maxAgeMember,
            winScore,
            equalScore,
            loseScore,
            gender,
        } = req.body;

        const admin = req.user?._id || "";
        const data = await leagueModel.create({
            name,
            logo,
            admin,
            startDate,
            endDate,
            registerDate,
            numTeamLimit,
            minNumMember,
            maxNumMember,
            minAgeMember,
            maxAgeMember,
            winScore,
            equalScore,
            loseScore,
            gender,
        });
        res.json({ data });
    } catch (error) {
        res.sendStatus(500);
    }
};

export const get = async (req, res) => {
    try {
        const { page = 1, perPage = 100 } = req.query;

        const p = Math.max(1, parseInt(page));
        const pp = parseInt(perPage);

        const data = await leagueModel
            .find({})
            .skip(p * pp - pp)
            .limit(pp)
            .lean();
        const total = await leagueModel.countDocuments({});
        res.json({ data, total });
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getMyLeagues = async (req, res) => {
    try {
        // const { page = 1, perPage = 100 } = req.query

        // const p = Math.max(1, parseInt(page))
        // const pp = parseInt(perPage)
        const admin = req.user?._id || "";
        const data = await leagueModel.find({ admin }).lean();
        // const total = await leagueModel.countDocuments({})
        res.json({ data });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const league = await leagueModel.findById(id).lean();

        const teams = league.teams || [];
        const isAdmin = req.user?._id === league.admin && !!req.user?._id;
        console.log(req.user);

        let data = league || {};
        let newTeams = [];
        for (const team of teams) {
            const teamId = team.id;
            const detail = await teamModel.findById(teamId).lean();
            newTeams.push({ ...team, detail });
        }
        data.teams = newTeams;
        data.isAdmin = isAdmin;
        res.json({ data });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const createTeam = async (req, res) => {
    try {
        const { leagueId } = req.params;
        const {
            id = "",
            members = [],
            status = "pending",
            isPayed = false,
        } = req.body;

        const league = await leagueModel.findById(leagueId);
        const team = await teamModel.findById(id);

        if (!league || !team) {
            return res
                .status(400)
                .json({ message: "Không tồn tại câu lạc bộ, giải đấu!" });
        }

        league.teams.push({
            id,
            members,
            status,
            isPayed,
            createdAt: new Date(),
        });
        await league.save();

        res.json({ data: league });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const updateTeam = async (req, res) => {
    try {
        const { leagueId } = req.params;
        const { status = STATUS.PENDING, teamId } = req.body;

        const data = await leagueModel.updateOne(
            {
                _id: leagueId,
                "teams.id": teamId,
                "teams.status": STATUS.PENDING,
            },
            {
                $set: {
                    "teams.$.status": status,
                },
            }
        );
        res.json({ data });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const getRounds = async (req, res) => {
    try {
        const { id } = req.params;
        const rounds = await roundModel.find({ leagueId: id }).lean();

        let data = [];
        for (const round of rounds) {
            const { _id, type } = round;

            const tables = [];
            if (type === "Vòng tròn") {
                tables = (await tableModel.find({ roundId: _id }).lean()) || [];
            }
            data.push({ ...round, tables });
        }

        res.json({ data });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const getPrizes = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prizeModel.find({ leagueId: id }).lean();
        res.json({ data });
    } catch (error) {
        res.sendStatus(500);
    }
};

export const pay = async (req, res) => {
    try {
        const { leagueId } = req.params;
        const { id } = req.body;

        const data = await leagueModel.updateOne(
            { _id: leagueId, "teams.id": id },
            {
                $set: {
                    "teams.$.isPayed": true,
                },
            }
        );

        res.json({ data });
    } catch (error) {
        console.log("error:", error);
        res.sendStatus(500);
    }
};

export const getStandings = async (req, res) => {
    try {
        const { id, type, typeId } = req.params;
        const league = await leagueModel.findOne({ _id: id });
        const { teams } = league;

        //standings: Bảng xếp hạng các đội trong vòng đấu
        //- teamId: ID của đội
        //- matchesPlayed: Số trận đã đá
        //- won: Số trận thắng
        //- draw: Số trận hòa
        //- loss: Số trận thua
        //- goalsAgainst: Số bàn thắng
        //- goalsFor: Số bàn thua
        //- points: Số điểm
        let standings = teams.map((i) => ({
            teamId: i.id,
            matchesPlayed: 0,
            won: 0,
            draw: 0,
            loss: 0,
            goalsAgainst: 0,
            goalsFor: 0,
            points: 0,
        }));
        let matches = [];
        if (type == "round") {
            matches = (await matchModel.find({ roundId: typeId }).lean()) || [];
        } else {
            matches = (await matchModel.find({ tableId: typeId }).lean()) || [];
        }
        console.log({ standings, matches, id, type, typeId });
        const { winScore, loseScore, equalScore } = league;

        // calculate standings
        for (const match of matches) {
            const homeGoal = match.homeTeam.goal || 0;
            const awayGoal = match.awayTeam.goal || 0;
            const idxAway = standings.findIndex(
                (i) => i.teamId == match.awayTeam.id
            );
            const idxHome = standings.findIndex(
                (i) => i.teamId == match.homeTeam.id
            );
            if (match.isEnded) {
                standings[idxHome]["matchesPlayed"]++;
                standings[idxAway]["matchesPlayed"]++;

                if (
                    match.homeTeam.penalty > match.awayTeam.penalty ||
                    match.homeTeam.goal > match.awayTeam.goal
                ) {
                    // homeTeam win
                    // [standings[idxHome], standings[idxAway]] = leagueHelper.updateStanding({ league, standingWin: standingHome, standingLoss: standingAway, goalWin: +homeGoal, goalLose: +awayGoal })

                    standings[idxHome]["goalsAgainst"] += +homeGoal;
                    standings[idxHome]["goalsFor"] += +awayGoal;

                    standings[idxHome]["won"]++;
                    standings[idxHome]["points"] += +winScore;
                    /*==========================*/

                    standings[idxAway]["goalsAgainst"] += +awayGoal;
                    standings[idxAway]["goalsFor"] += +homeGoal;

                    standings[idxAway]["loss"]++;
                    standings[idxAway]["points"] += +loseScore;
                } else if (
                    match.homeTeam.penalty < match.awayTeam.penalty ||
                    match.homeTeam.goal < match.awayTeam.goal
                ) {
                    // awayTeam win
                    // [standings[idxAway], standings[idxHome]] = leagueHelper.updateStanding({ league, standingWin: standingAway, standingLoss: standingHome, goalWin: +awayGoal, goalLose: +homeGoal })

                    standings[idxAway]["goalsAgainst"] += +awayGoal;
                    standings[idxAway]["goalsFor"] += +homeGoal;

                    standings[idxAway]["won"]++;
                    standings[idxAway]["points"] += +winScore;
                    /*==========================*/

                    standings[idxHome]["goalsAgainst"] += +homeGoal;
                    standings[idxHome]["goalsFor"] += +awayGoal;

                    standings[idxHome]["loss"]++;
                    standings[idxHome]["points"] += +loseScore;
                } else {
                    // draw
                    // [standings[idxHome], standings[idxAway]] = leagueHelper.updateStanding({ league, standingWin: standingHome, standingLoss: standingAway, goalWin: +homeGoal, goalLose: +awayGoal, isEqual: true })

                    standings[idxAway]["goalsAgainst"] += +awayGoal;
                    standings[idxAway]["goalsFor"] += +homeGoal;

                    standings[idxAway]["draw"]++;
                    standings[idxAway]["points"] += equalScore;
                    /*==========================*/

                    standings[idxHome]["goalsAgainst"] += +homeGoal;
                    standings[idxHome]["goalsFor"] += +awayGoal;

                    standings[idxHome]["draw"]++;
                    standings[idxHome]["points"] += equalScore;
                }
            }
        }

        let newStandings = [];

        for (const team of standings) {
            const detail = await teamModel.findById(team.teamId);
            newStandings.push({ ...team, detail });
        }

        res.json({ data: newStandings });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

// export const getMatches = async (req, res) => {
//     try {
//         const { id, isEnded } = req.params
//         const ended = JSON.parse(isEnded);

//         const rounds = await roundModel.find({ leagueId: id }).lean()
//         const tables = await tableModel.find({ leagueId: id }).lean()
//         const roundIds = rounds.map(i => i._id)
//         const tableIds = tables.map(i => i._id)
//         const matches = await matchModel.find({ $or: [{ roundId: { $in: roundIds } }, { tableId: { $in: tableIds } }] })

//         const filtered = matches.filter(match => match.isEnded === ended);

//         let data = []
//         for (const match of filtered) {
//             const { roundId, tableId } = match
//             const parent = {}
//             if (tableId) {
//                 parent = await tableModel.findById(tableId)
//                 parent.round = await roundModel.findById(parent.roundId)
//             } else {
//                 parent = await roundModel.findById(roundId)

//             }
//             const leagueId = parent.round?.leagueId || parent.leagueId || ""
//             const league = await leagueModel.findById(leagueId)
//             data.push({ ...match, parent, league })
//         }

//         res.json({ data })
//     } catch (error) {
//         res.sendStatus(500);
//     }
// }

export const getAllMatches = async (req, res) => {
    try {
        const { id } = req.params;

        const rounds = await roundModel.find({ leagueId: id }).lean();
        const tables = await tableModel.find({ leagueId: id }).lean();
        const roundIds = rounds.map((i) => i._id);
        const tableIds = tables.map((i) => i._id);
        const matches = await matchModel
            .find({
                $or: [
                    { roundId: { $in: roundIds } },
                    { tableId: { $in: tableIds } },
                ],
            })
            .lean();

        let data = [];
        for (const match of matches) {
            const { roundId, tableId } = match;
            let parent = {};
            if (tableId) {
                parent = await tableModel.findById(tableId).lean();
                parent = {
                    ...parent,
                    round: await roundModel.findById(parent.roundId),
                };
            } else {
                parent = await roundModel.findById(roundId);
            }
            const leagueId = parent.round?.leagueId || parent.leagueId || "";
            const league = await leagueModel.findById(leagueId);
            data.push({ ...match, parent, league });
        }

        res.json({ data });
    } catch (error) {
        res.sendStatus(500);
    }
};
