import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //leagueId: ID của giải đấu
        leagueId: { type: Schema.Types.String, require: true },
        //teamId:  ID của đội nhận thưởng
        teamId: { type: Schema.Types.String, require: true },
        //name: Tên giải thưởng
        name: { type: Schema.Types.String, require: true },
    },
    { timestamps: true }
);

export default mongoose.model("prizes", schema);