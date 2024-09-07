import userModel from '../Model/authSchema.js';
import chatModel from '../Model/chatSchema.js';
import ConversationsModel from '../Model/ConverSationSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

// registration routes
export async function handleRegister(req, res) {
    const { username, email, password} = req.body;
    console.log(username, email, password);
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const user = new userModel({
            username,
            email,
            password: hashPassword,
        });
        await user.save();
        res.status(200).json({ msg: 'user successfully registered' });
    } catch (error) {
        console.log('user not register', error);
    }

};

// login routes
export async function handleLogin(req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await userModel.findOne({ username });
    if (!user) {
        res.status(404).json({ msg: 'User not found' });
    } else {
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            res.json({ msg: 'Password incorrect' });
        } else {
            const token = jwt.sign({ username, password }, process.env.SECRETE_KEY_JWT, { expiresIn: '15days' })
            res.cookie('jwt', token);
            res.status(200).json({ msg: 'User are login', username:username , password:password});
        }
    }
}


// logout routes
export const handleLogout = (req, res) => {
    const clearToken = req.cookies.jwt;

    if (clearToken) {
        res.clearCookie('jwt').json({ msg: 'user are logout' });
    }
}

// get user 
export const getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
};



// conersation of user
export const newConversation = async(req,res)=>{
    const {senderId ,receiverId } = req.body;
    try{
        const userConversation = new ConversationsModel({
            members: [senderId, receiverId],
        });
        await userConversation.save();
        res.status(200).json(userConversation)
    }catch(err){
        res.status(500).json({ msg: err.message });
    }
}
//get userConversation
export const getUserConversation = async(req,res)=>{
    const {userId } = req.params;
    try{
        const userConversation = await ConversationsModel.find({ members: {$in: [userId]} });
        res.status(200).json(userConversation)
    }catch(err){
        res.status(500).json({ msg: err.message });
    }
}

// get chat user
export const addUserChat = async(req,res)=>{
    const {sender,text ,chatId} = req.body;
    try {
        const chatuser = await chatModel.create({
            sender,
            text,
            chatId
        });
        res.status(200).json(chatuser);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// get chat user 

export const getUserChat = async(req,res)=>{
    const {chatId} = req.params;
    try {
        const findChat = await chatModel.find({chatId});
        res.status(200).json(findChat);
    } catch (error) {
        res.status(500).json(error.message);
    }
};