import foodModel from "../models/foodModels.js";
import fs from 'fs';


// add food item

const addFood = async(req, res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });

    try {
        await food.save();
        res.send({success:true,message:"food added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// List Food items
const listFood = async(req, res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// remove food items
const removeFood = async (req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,(error)=>{
            console.log(error);
        });
        await foodModel.findByIdAndDelete(food._id);
        res.json({success:true,message:"Food removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}

export {addFood, listFood, removeFood};