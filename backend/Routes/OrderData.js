const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post("/orderData" , async (req , res) => {
    let data = req.body.order_data;
    await data.splice(0 , 0 , {Order_date : req.body.order_date})

    // if email is not present in db then create order first
    let eid = await Order.findOne({'email' : req.body.email})

    if(eid === null){
        try{
            await Order.create({
                email : req.body.email,
                order_data : [data]
            }).then(() => {
                res.json({success : true})
            })
        }
        catch(error){
            console.log(error.message);
            res.send("Server error" , error.message);
        }
    }
    else {
        try{
            await Order.findOneAndUpdate({email : req.body.email} , {
                $push : { order_data : data}
            }).then(() => {
                res.json({success : true})
            })
        }
        catch(error){
            console.log(error.message);
            res.send("Server error" , error.message);
        }
    }
})

router.post("/myorderData" , async (req , res) => {
    try{
        let myData = await Order.findOne({email : req.body.email})
        let order_data = myData.order_data;
        res.json({orderData : order_data});

    }
    catch(error){
        res.send("Server error" , error.message);
    }
})

module.exports = router