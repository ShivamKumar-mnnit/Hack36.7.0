import mongoose from "mongoose";

export const AccidentSchema = new mongoose.Schema({
    location:{},
    nop:{type:Number},
    level:{Number}
},
{
    timestamps: true,
}
);
export default mongoose.model.Users || mongoose.model('User', UserSchema);