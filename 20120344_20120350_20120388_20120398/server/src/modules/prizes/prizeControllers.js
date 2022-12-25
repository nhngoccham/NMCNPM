import prizeModel from "../../models/prize/prizeModel";
export const create = async (req, res) => {
    try {
        const {
            leagueId,
            teamId,
            name
        } = req.body
        const data = await prizeModel.create({
            leagueId,
            teamId,
            name
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

        const data = await prizeModel.find({}).skip(p * pp - pp).limit(pp).lean()
        const total = await prizeModel.countDocuments({})
        res.json({ data, total })
    } catch (error) {
        res.sendStatus(500);
    }
}


