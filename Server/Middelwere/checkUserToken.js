import jwt from 'jsonwebtoken';


const checkUserToken = async(req,res,next) =>{
    const checkToken = req.cookies.jwt
    if(!checkToken) return res.status(400).json({msg:'User are not login'});

    const user = jwt.verify(checkToken , process.env.SECRETE_KEY_JWT );
    if(!user){
        return res.json({msg:'Token not verify'});
    }else{
        req.user = user;
        next();
    }
    
};

export default checkUserToken