import userModel from '../Model/authSchema.js';
import bcrypt from 'bcrypt'

async function handleRegister(req,res){
    const {username,email,password} = req.body;
    console.log(username,email,password);
    const salt = 10;
    const hashPassword = await bcrypt.hash(password,salt);
    const user = new userModel({
        username,
        email,
        password: hashPassword,
    });
    await user.save();
    res.status(200).json({msg:'user successfully registered'});
};



export default handleRegister