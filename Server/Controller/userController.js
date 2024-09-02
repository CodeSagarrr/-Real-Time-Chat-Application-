import userModel from '../Model/authSchema.js';
import chatModel from '../Model/chatSchema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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
            const token = jwt.sign({ username, password }, process.env.SECRETE_KEY_JWT, { expiresIn: '15days' })
            res.cookie('jwt', token);
            res.status(200).json({ msg: 'User are login' });
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

// message routes
export const sendMessage = async (req, res) => {
    const { message, receiver } = req.body;
    console.log(message, receiver);
    try {
        const Message = await chatModel.create({
            message,
            sender: req.user.username,
            receiver
        })
        res.status(200).json({ msg: Message.message });
    } catch (error) {
        console.log(error);
    }
};

