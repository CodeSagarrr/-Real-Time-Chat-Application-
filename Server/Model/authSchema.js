import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId, 
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
    }
})

const userModel = mongoose.model('userModel',authSchema);

export default userModel;