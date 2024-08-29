import userModel from '../Model/authSchema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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
        console.log(error.message);
    }

};

export async function handleLogin(req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await userModel.findOne({username});
    if(!user){
        res.status(404).json({msg:'User not found'});
    }else{
        const passMatch = await bcrypt.compare(password , user.password);
        if(!passMatch){
            res.status(404).json({msg:'Password incorrect'});
        }else{
            const token = jwt.sign({username,password},process.env.SECRETE_KEY_JWT , {expiresIn:'15days'})
            res.cookie('jwt',token);
            res.status(200).json({msg:'User are login'});
        }
    }
}

