import roundModel from '../../models/round/roundModel'
import tableMadel from '../../models/table/tableModel';
export const create = async (req, res) => {
    try {
        const {
            leagueId = "",
            type = "Vòng tròn",
            name = "",
        } = req.body
        const data = await roundModel.create({
            leagueId,
            type,
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

        const data = await roundModel.find({}).skip(p * pp - pp).limit(pp).lean()
        const total = await roundModel.countDocuments({})
        res.json({ data, total })
    } catch (error) {
        res.sendStatus(500);
    }
}


export const getTables = async (req, res) => {
    try {
        const { id } = req.params
        const data = await tableModel.find({ roundId: id }).lean()
        res.json({ data })
    } catch (error) {
        res.sendStatus(500);
    }
}

export const createMember = async (req, res) => {
    try {
        // * members: Danh sách thành viên, mỗi thành viên: 
        // * - name: Tên thành viên
        // * - birthday: Ngày sinh
        // * - number: Số áo
        // * - position: Vị trí
        // * - createdAt: Ngày thêm
        // * - updatedAt: Ngàu cập nhật gần nhất
        const { id } = req.params
        const { name = "", birthday = new Date().getUTCDate(), number = 0, position = "" } = req.body
        const team = await roundModel.find({ _id: id })

        if (!team) {
            return res.status(400).json({ message: "Không tồn tại câu lạc bộ!" })
        }

        team.members.push({ name, birthday, number, position, createdAt: new Date(), updatedAt: new Date() })
        await team.save()

        res.json({ data: team.lean() })
    } catch (error) {
        res.sendStatus(500);
    }
}
