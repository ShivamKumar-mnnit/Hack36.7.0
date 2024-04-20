import mongoose from "mongoose";

export const HospitalSchema = new mongoose.Schema({
    h_id:{
        type:Number,
        required:[true,"Please provide unique Uid"],
        unique: [true,"Uid exist"]
    },
    h_name : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    h_email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    h_mobile : { type : Number},
    h_img: { type: String},
    h_address: { type: String},
    h_gov:{type:Boolean},
    h_verified:{type: Boolean},
    he_id:{type:Number},
    lat:{type:String},
    lon:{type:String},
},
{
    timestamps: true,
}
);

export default mongoose.model.Hospitals || mongoose.model('Hospital', UserSchema);