import jwt from "jsonwebtoken";

const authMiddleware = async(req, res, next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorized, login again"});
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
}

export default authMiddleware;