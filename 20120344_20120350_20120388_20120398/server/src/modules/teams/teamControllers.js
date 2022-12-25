import teamModel from "../../models/team/teamModel";
import matchModel from "../../models/match/matchModel";
import roundModel from "../../models/round/roundModel";
import tableModel from "../../models/table/tableModel";
import leagueModel from "../../models/league/leagueModel";
export const create = async (req, res) => {
    try {
        const {
            name,
            logo,
            description,
            foundedDate = new Date(),
            members = [],
            secondaryKit,
            primaryKit,
        } = req.body;
        const admin = req.user?._id || "";
        const data = await teamModel.create({
            name,
            logo,
            admin,
            description,
            foundedDate,
            members,
            secondaryKit,
            primaryKit,
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

        const data = await teamModel
            .find({})
            .skip(p * pp - pp)
            .limit(pp)
            .lean();
        const total = await teamModel.countDocuments({});
        res.json({ data, total });
    } catch (error) {
        res.sendStatus(500);
    }
};
export const getMyTeams = async (req, res) => {
    try {
        // const { page = 1, perPage = 100 } = req.query

        // const p = Math.max(1, parseInt(page))
        // const pp = parseInt(perPage)
        const admin = req.user?._id || "";
        const data = await teamModel.find({ admin }).lean();
        // const total = await teamModel.countDocuments({})
        res.json({ data });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await teamModel.findById(id).lean();
        const isAdmin = req.user?._id === data.admin;
        data.isAdmin = isAdmin;
        res.json({ data });
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getMatchesByTeamId = async (req, res) => {
    try {
        const { id } = req.params;
        const matches = await matchModel
            .find({ $or: [{ "homeTeam.id": id }, { "awayTeam.id": id }] })
            .lean();

        let data = [];
        for (const match of matches) {
            const { roundId, tableId } = match;
            const parent = {};
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
        console.log({ error });

        res.sendStatus(500);
    }
};

export const createMember = async (req, res) => {
    try {
        // * members: Danh sách thành viên, mỗi thành viên:
        // * - name: Tên thành viên
        // * - birthday: Ngày sinh
        // * - number: Số áo
        //* - avatar: Ảnh
        // * - position: Vị trí
        // * - updatedAt: Ngàu cập nhật gần nhất
        const { id } = req.params;
        const {
            name = "",
            birthday = new Date().getUTCDate(),
            number = 0,
            position = "",
            avatar = "",
        } = req.body;
        const team = await teamModel.findOne({ _id: id });

        if (!team) {
            return res
                .status(400)
                .json({ message: "Không tồn tại câu lạc bộ!" });
        }

        team.members.push({
            avatar,
            name,
            birthday,
            number,
            position,
            updatedAt: new Date(),
        });
        await team.save();

        res.json({ data: team });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const updateMember = async (req, res) => {
    try {
        // * members: Danh sách thành viên, mỗi thành viên:
        // * - name: Tên thành viên
        // * - birthday: Ngày sinh
        // * - number: Số áo
        //* - avatar: Ảnh
        // * - position: Vị trí
        // * - updatedAt: Ngàu cập nhật gần nhất
        const { id } = req.params;

        const { member, newMember } = req.body;
        const team = await teamModel.findOne({ _id: id });

        if (!team) {
            return res
                .status(400)
                .json({ message: "Không tồn tại câu lạc bộ!" });
        }
        const idx = team.members.findIndex(
            (item) => JSON.stringify(item) === JSON.stringify(member)
        );
        let data = null;
        if (idx > -1) {
            let newMembers = team.members;
            newMembers[idx] = newMember;
            data = await teamModel.findByIdAndUpdate(id, {
                members: newMembers,
            });
        }

        res.json({ data: data || team });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};

export const deleteMember = async (req, res) => {
    try {
        // * members: Danh sách thành viên, mỗi thành viên:
        // * - name: Tên thành viên
        // * - birthday: Ngày sinh
        // * - number: Số áo
        //* - avatar: Ảnh
        // * - position: Vị trí
        // * - updatedAt: Ngàu cập nhật gần nhất
        const { id } = req.params;

        const { member } = req.body;
        const team = await teamModel.findOne({ _id: id });

        if (!team) {
            return res
                .status(400)
                .json({ message: "Không tồn tại câu lạc bộ!" });
        }
        const newMembers = team.members.filter(
            (item) => JSON.stringify(item) !== JSON.stringify(member)
        );
        const data = await teamModel.findByIdAndUpdate(id, {
            members: newMembers,
        });
        res.json({ data });
    } catch (error) {
        console.log({ error });

        res.sendStatus(500);
    }
};
