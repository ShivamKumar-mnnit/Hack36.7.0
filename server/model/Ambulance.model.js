import mongoose from "mongoose";

export const AmbulanceSchema = new mongoose.Schema({
    a_id:{
        type:Number,
        required:[true,"Please provide unique Uid"],
        unique: [true,"Uid exist"]
    },
    a_name : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    a_email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    a_mobile : { type : Number},
    a_address: { type: String},
    a_img: { type: String},
    a_verified:{type: Boolean},
    ae_id:{type:Number},
    location:{},
},
{
    timestamps: true,
}
);

export default mongoose.model.Users || mongoose.model('User', UserSchema);