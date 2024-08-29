import jwt from 'jsonwebtoken';


const checkUserToken = async(req,res,next) =>{
    const checkToken = req.body.jwt
    if(!checkToken) return res.status(400).json({msg:'User are not login'});

    const tokenVerify = jwt.verify(checkToken , SECRETE_KEY_JWT );
    if(!tokenVerify){
        return res.status(400).json({msg:'Token not verify'});
    }else{
        req.user = tokenVerify;
    }
    next();
};

export default checkUserToken