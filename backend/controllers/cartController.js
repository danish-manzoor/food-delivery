import userModel from "../models/userModels.js";


// add items into the cart
const addToCart = async(req, res)=>{
    const userData = await userModel.findById(req.body.userId);
    if(!userData){
        return res.json({success:false, message:"User not found"});
    }
    const cartData = await userData.cartData;
    try {
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] +=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Cart Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//remove cart
const removeFromCart = async(req, res)=>{
    const userData = await userModel.findById(req.body.userId);
    if(!userData){
        return res.json({success:false, message:"User not found"});
    }
    const cartData = await userData.cartData;
    try {
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Cart removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// fetch user cart data
const getCart = async(req, res)=>{
    try {
        const userData = await userModel.findById(req.body.userId);
        if(!userData){
            return res.json({success:false, message:"User not found"});
        }
        const cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart,removeFromCart,getCart};