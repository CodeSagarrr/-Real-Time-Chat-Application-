import mongoose  from "mongoose";


const ConversationsSchema = new mongoose.Schema({
    members:{
        type:Array,
    },
    
},  {timestamps:true});

const ConversationsModel = mongoose.model('ConversationsModel', ConversationsSchema);
export default ConversationsModel