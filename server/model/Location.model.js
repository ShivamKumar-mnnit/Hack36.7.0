import mongoose from "mongoose";

export const LocationSchema = new mongoose.Schema({
    name:{type:String,unique: true,},
    longitude:{type: Number},
    latitude:{type: Number}  
},
{
    timestamps: true,
}
);

export default mongoose.model.Locations || mongoose.model('Location', LocationSchema);