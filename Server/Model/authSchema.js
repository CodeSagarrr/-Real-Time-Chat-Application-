import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username :{
        type:'String',
        required: true,
    },
    email:{
        type:'String',
        required: true,
        unique: true,
    },
    password:{
        type:'String',
        required: true,
    },
    profilePicture:{
        type:'String',
        default: 'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png'  // default profile picture
    },
    phoneNo:{
        type:'String',
        unique: true,
    },
    bio:{
        type: String,
    }
},{timestamps:true})

const userModel = mongoose.model('userModel',authSchema);

export default userModel;