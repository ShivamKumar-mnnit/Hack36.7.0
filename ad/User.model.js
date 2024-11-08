const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String},
    driving_lic:{type: String},
    alt_img:{type:String},
    ue_id:{type: Number},
    role:{type: Number,default:0},
    isverified:{type: Boolean},
    distance:{type:String}
},
{
    timestamps: true,
}
);

module.exports = UserSchema;
// export default mongoose.model.Users || mongoose.model('User', UserSchema);