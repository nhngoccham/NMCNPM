import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //roundId: ID của vòng đấu
        roundId: { type: Schema.Types.String, require: true },
        //name: Tên vòng đấu
        name: { type: Schema.Types.String, require: true },
        //matches: Danh sách ID các đội
        teams: { type: Schema.Types.Array, require: true },
    },
    { timestamps: true }
);

export default mongoose.model("tables", schema);