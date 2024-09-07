
import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    chatId:{
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