import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //roundId: ID của vòng đấu
        roundId: { type: Schema.Types.String, require: true },
        //tableId: ID của bảng đấu, nếu là đấu vòng tròn
        tableId: { type: Schema.Types.String },
        //date: Thời gian diễn ra trận đấu
        date: { type: Schema.Types.Date, require: true },
        //stadium: Sân thi đấu
        stadium: { type: Schema.Types.String },
        //homeTeam: Thông tin đội nhà
        //- id: ID của team
        //- memberIds: Danh sách ID của thành viên
        //- goal
        //- penalty
        homeTeam: { type: Schema.Types.Object, require: true },
        //awayTeam: Thông tin đội khách
        //- id: ID của team
        //- memberIds: Danh sách ID của thành viên
        //- goal
        //- penalty
        awayTeam: { type: Schema.Types.Object, require: true },
        //details: Danh sách thông tin chi tiết của trận, mỗi chi tiết có
        //- type: redCard | yellowCard | ownGoal | goal
        //- minute: Phút xảy ra chi tiết.
        //- player: ID của cầu thủ
        details: { type: Schema.Types.Array },
        //highlight: link highlight của trận đấu
        highlight: { type: Schema.Types.String },
        //isEnded: true | false
        isEnded: { type: Schema.Types.Boolean }
    },
    { timestamps: true }
);

export default mongoose.model("matches", schema);