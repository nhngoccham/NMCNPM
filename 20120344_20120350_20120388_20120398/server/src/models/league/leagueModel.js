import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //name: Tên giải đấu
        name: { type: Schema.Types.String, require: true },
        //logo:
        logo: { type: Schema.Types.String, require: true },
        //admin: ID của admin
        admin: { type: Schema.Types.String, require: true },
        //startDate: Thời gian bắt đầu
        startDate: { type: Schema.Types.Date, require: true },
        //endDate: Thời gian kết thúc
        endDate: { type: Schema.Types.Date, require: true },
        //registerDate: Hạn đăng kí
        registerDate: { type: Schema.Types.Date, require: true },
        //numTeamLimit: Số đội tham gia tối đa
        numTeamLimit: { type: Schema.Types.Number, require: true },
        //minNumMember: Số lượng thành viên tối thiểu
        minNumMember: { type: Schema.Types.Number, require: true },
        //maxNumMember: Số lượng thành viên tối đa
        maxNumMember: { type: Schema.Types.Number, require: true },
        //minAgeMember: Tuổi tối thiểu của thành viên
        minAgeMember: { type: Schema.Types.Number, require: true },
        //maxAgeMember: Tuổi tối đa của thành viên
        maxAgeMember: { type: Schema.Types.Number, require: true },
        ///winScore: Điểm thắng  
        winScore: { type: Schema.Types.Number, require: true },
        ///equalScore: Điểm hòa  
        equalScore: { type: Schema.Types.Number, require: true },
        //loseScore: Điểm thua  
        loseScore: { type: Schema.Types.Number, require: true },
        //gender: Giới tính
        gender: { type: Schema.Types.String, require: true },
        /**
        * teams: Danh sách câu lạc bộ, mỗi clb: 
        * - id: ID của team
        * - members: Danh sách  thành viên 
        * - status: pending | accepted | rejected
        * - isPayed: true |  false
        * - createdAt: Ngày đăng kí
        */
        teams: { type: Schema.Types.Array }

    },
    { timestamps: true }
);

export default mongoose.model("leagues", schema);