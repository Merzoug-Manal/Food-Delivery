import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//placing user order from frontend
const placeOrder = async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        res.json({ success: true, message: "Order placed successfully!", orderId: newOrder._id });
    } catch (error) {
        console.error("Order placement failed:", error); // This will print the exact error
        res.status(500).json({ success: false, message: "Order placement failed.", error });
    }
};
//users order for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});  
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
        
    }
};
//Listing order for admin panel
const listOrders = async(req,res)=>{
 try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
    
 }
}
// api fro updating orders status
const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}
export {placeOrder,userOrders,listOrders,updateStatus}
