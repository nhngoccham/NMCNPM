import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
    {
        name: { type: Schema.Types.String },
        username: { type: Schema.Types.String },
        password: { type: Schema.Types.String },
        email: { type: Schema.Types.String },
        resetPassword: { type: Schema.Types.String },
        verifyCode: { type: Schema.Types.String },
    },
    { timestamps: true }
);

export default mongoose.model("user", schema);
