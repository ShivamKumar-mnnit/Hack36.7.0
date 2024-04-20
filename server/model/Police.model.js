import mongoose from "mongoose";

export const PoliceSchema = new mongoose.Schema({
    p_id:{
        type:Number,
        required:[true,"Please provide unique Uid"],
        unique: [true,"Uid exist"]
    },
    p_name : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    p_email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    p_phone : { type : Number},
    p_img: { type: String},
    p_address: { type: String},
    p_verified:{type: Boolean},
    pe_id:{type:Number},
    location:{},
},
{
    timestamps: true,
}

);

export default mongoose.model.Polices || mongoose.model('Police', PoliceSchema);