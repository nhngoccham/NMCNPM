import roundModel from '../../models/round/roundModel'
import tableMadel from '../../models/table/tableModel';
import matchModel from '../../models/match/matchModel';
export const create = async (req, res) => {
    try {
        const {
            roundId = "",
            tableId = "",
            date = new Date(),
            stadium = "",
            homeTeam = {},
            awayTeam = {},
            details = [],
            highlight = "",
            isEnded = false
        } = req.body
        const data = await matchModel.create({
            roundId,
            tableId,
            date,
            stadium,
            homeTeam,
            awayTeam,
            details,
            highlight,
            isEnded
        })
        const { _id: matchID } = data;
        res.json({ data, matchID })
    } catch (error) {
        res.sendStatus(500);
    }
};


export const get = async (req, res) => {
    try {
        const { page = 1, perPage = 100 } = req.query

        const p = Math.max(1, parseInt(page))
        const pp = parseInt(perPage)

        const data = await matchModel.find({}).skip(p * pp - pp).limit(pp).lean()
        const total = await matchModel.countDocuments({})
        res.json({ data, total })
    } catch (error) {
        res.sendStatus(500);
    }
}

export const update = async (req, res) => {
    try {
        const { id = "" } = req.params
        const { homeTeam = {}, awayTeam = {} } = req.body
        const data = await matchModel.findByIdAndUpdate(id, { homeTeam, awayTeam })
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
}


export const createDetail = async (req, res) => {
    try {
        //details: Danh sách thông tin chi tiết của trận, mỗi chi tiết có
        //- type: redCard | yellowCard | ownGoal | goal
        //- minute: Phút xảy ra chi tiết.
        //- player: ID của cầu thủ
        const { id } = req.params
        const { type = "redCard", minute = 0, player = "" } = req.body
        const match = await matchModel.findById(id)
        if (!match) {
            return res.status(400).json({ message: "Không tồn tại câu lạc bộ!" })
        }
        match.details.push({ type, minute, player })
        await match.save()

        res.json({ data: match })
    } catch (error) {
        res.sendStatus(500);
    }
}

export const createHighlight = async (req, res) => {
    try {
        const { id } = req.params
        const { highlight = "" } = req.body
        const data = await matchModel.updateOne({ _id: id }, { highlight })
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
}

export const createEnd = async (req, res) => {
    try {
        const { id } = req.params
        const { isEnded = false } = req.body
        const data = await matchModel.updateOne({ _id: id }, { isEnded })
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
}
