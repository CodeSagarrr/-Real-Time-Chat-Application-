import jwt from 'jsonwebtoken';


const checkUserToken = async(req,res,next) =>{
    const checkToken = req.cookies.jwt
    if(!checkToken) return res.status(400).json({msg:'User are not login'});

    const tokenVerify = jwt.verify(checkToken , process.env.SECRETE_KEY_JWT );
    if(!tokenVerify){
        return res.json({msg:'Token not verify'});
    }else{
        req.user = tokenVerify;
        next();
    }
    
};

export default checkUserToken