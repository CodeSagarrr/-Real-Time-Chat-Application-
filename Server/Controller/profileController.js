import userModel from '../Model/authSchema.js'

export const getUserProfile = async(req,res) =>{
    const {id} = req.params;
    console.log(id)
    try {
        const findUser = await userModel.findById(id);
        if(!findUser) return res.status(404).json({msg:'User not found'});
        res.status(200).json(findUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const changeUserProfile = async(req,res)=>{
    const {id} = req.params;
    const {username , profilePicture ,bio } = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id,{username, profilePicture, bio},{new:true});
        if(!updatedUser) return res.status(404).json({msg:'User not found'});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}