import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async(req, res)=>{
    const userData = await userModel.findById(req.body.userId);
    if(!userData){
        return res.json({success:false, message:"User not found"});
    }
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});


        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"USD",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }));

        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"delivery charges"
                },
                unit_amount:2*100
            },
            quantity:1
        });

   
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


const verifyOrder = async(req, res)=>{
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// display the order at front-end
const userOrders = async(req, res)=>{
    
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


// order list for admin
const orderList = async(req, res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const changeStatus= async(req, res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"});
    } catch (error) {
        console.log(error);
        req.json({success:false,message:"Error"});
        
    }
}
export {placeOrder,verifyOrder,userOrders,orderList,changeStatus};