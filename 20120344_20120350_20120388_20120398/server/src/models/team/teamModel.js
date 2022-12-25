import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        //name: Tên câu lạc bộ
        name: { type: Schema.Types.String, require: true },
        //logo:
        logo: { type: Schema.Types.String, require: true },
        //primaryKit:
        primaryKit: { type: Schema.Types.String, require: true },
        //secondaryKit:
        secondaryKit: { type: Schema.Types.String, require: true },
        //description
        description: { type: Schema.Types.String, require: true },
        //admin: ID của admin
        admin: { type: Schema.Types.String, require: true },
        //foundedDate: ngày thành lập câu lạc bộ
        foundedDate: { type: Schema.Types.Date },
        /**
         * members: Danh sách thành viên, mỗi thành viên:
         * - name: Tên thành viên
         * - birthday: Ngày sinh
         * - number: Số áo
         * - position: Vị trí
         * - createdAt: Ngày thêm
         * - updatedAt: Ngàu cập nhật gần nhất
         */
        members: { type: Schema.Types.Array },
    },
    { timestamps: true }
);

export default mongoose.model("teams", schema);
