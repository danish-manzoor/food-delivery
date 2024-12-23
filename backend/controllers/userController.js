import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const login = async(req, res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not exist"});
        }

        //validate the password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:true,message:"Invalid credentials"});
        }

        const token = createToken(user._id);
        return res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"}); 
    }
}

//Generate the token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
//register user
const register = async(req, res)=>{
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        //checking user already exist
        if(exists){
            return res.json({success:false,message:"User already exist"});
        }

        //validate the email and password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            name:name,
            email:email,
            password:hashPassword
        });

        const newUser = await user.save();
        const token = createToken(newUser._id);
        return res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
    
}

export {login, register};
