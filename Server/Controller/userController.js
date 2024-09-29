import userModel from '../Model/authSchema.js';
import chatModel from '../Model/chatSchema.js';
import ConversationsModel from '../Model/ConverSationSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';

cloudinary.v2;
// registration routes
export async function handleRegister(req, res) {
    const { username, email, password } = req.body;
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
            const { password, ...otherDetails } = user._doc;
            const token = jwt.sign({ username, password }, process.env.SECRETE_KEY_JWT, { expiresIn: '15days' })
            res.cookie('jwt', token);
            res.status(200).json({ msg: 'User are login', otherDetails });
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
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (user) {
            const { ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json("No such User");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// add conersation of user
export const otherUserAdd = async (req, res) => {
    const { currentUser } = req.params;
    const { username } = req.body;
    try {
        const otherUser = await userModel.findOne({ username: username });
        if (!otherUser) {
            res.json({msg:'User not regiter'});
        } else {
            const conversation = await ConversationsModel.create(
                {
                    members:  [currentUser, otherUser._id.toString()]
                }
            );
            res.status(200).json({ msg: 'Friends are added successfully', conversation: conversation });
        }

    } catch (error) {
        console.log(error)
    }
};
//get userConversation
export const getUserConversation = async (req, res) => {
    const { userId } = req.params;
    try {
        const userConversation = await ConversationsModel.find({ members: { $all: [userId] } });
        res.status(200).json(userConversation)
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

// add chat user
export const addUserChat = async (req, res) => {
    const { sender, text, chatId } = req.body;
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

export const getUserChat = async (req, res) => {
    const { chatId } = req.params;
    try {
        const findChat = await chatModel.find({ chatId });
        res.status(200).json(findChat);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const changeProfilePic = async (req, res) => {
    const { id } = req.params;
    const dpFilename = req.file.path; 
    try {
        const cloudImage = await cloudinary.uploader.upload(dpFilename, { resource_type: 'auto' });

        if (!cloudImage) {
            return res.status(400).json({ msg: 'Failed to upload profile picture' });
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { profilePicture: cloudImage.url },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'Profile Pic Updated', user: updatedUser });

    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
};
