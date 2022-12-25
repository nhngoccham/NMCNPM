import tableModel from '../../models/table/tableModel'
import teamModel from '../../models/team/teamModel';
export const create = async (req, res) => {
    try {
        const {
            roundId = "",
            name = "",
        } = req.body
        const data = await tableModel.create({
            roundId,
            name,
        })
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
};


export const get = async (req, res) => {
    try {
        const { page = 1, perPage = 100 } = req.query

        const p = Math.max(1, parseInt(page))
        const pp = parseInt(perPage)

        const data = await tableModel.find({}).skip(p * pp - pp).limit(pp).lean()
        const total = await tableModel.countDocuments({})
        res.json({ data, total })
    } catch (error) {
        res.sendStatus(500);
    }
}


export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await tableModel.findById(id)
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
}



export const createTeam = async (req, res) => {
    try {
        const { tableId } = req.params
        const { id = "" } = req.body

        const table = await tableModel.findById(tableId)

        table.teams.push({ id })
        await table.save()

        res.json({ data: table.lean() })
    } catch (error) {
        res.sendStatus(500);
    }
}

export const getTeams = async (req, res) => {
    try {
        const { id } = req.params

        const { teams } = await tableModel.findById(id).lean() || {}
        if (!teams) {
            throw new Error("Không tồn tại câu lạc bộ!")
        }
        let data = []
        for (const teamId of teams) {
            const teamDetail = await teamModel.findById(teamId).lean()
            data.push(teamDetail)
        }
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
}


export const getMatches = async (req, res) => {
    try {
        const { id } = req.params
        const data = await matchModel.find({ roundId: id }).lean()
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
}