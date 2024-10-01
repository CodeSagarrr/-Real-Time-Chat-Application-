import userModel from '../Model/authSchema.js'
import cloudinary from 'cloudinary';


cloudinary.v2;

export const getUserProfile = async(req,res) =>{
    const {id} = req.params;
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
    const {username , profilePicture  ,bio } = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id,{username, profilePicture, bio},{new:true});
        if(!updatedUser) return res.status(404).json({msg:'User not found'});
        res.status(200).json({msg:'Profile Updated'});
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}

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
