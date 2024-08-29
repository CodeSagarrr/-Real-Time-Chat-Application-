import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now(),
    },

});

const chatModel = mongoose.model('chatModel', chatSchema);

export default chatModel;