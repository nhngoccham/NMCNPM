import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //leagueId: ID của giải đấu
        leagueId: { type: Schema.Types.String, require: true },
        //type:  Vòng tròn | Loại trực tiếp
        type: { type: Schema.Types.String, require: true },
        //name: Tên vòng đấu
        name: { type: Schema.Types.String, require: true },
    },
    { timestamps: true }
);

export default mongoose.model("rounds", schema);