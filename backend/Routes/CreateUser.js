const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body , validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = "mynameisdheerendrasingh"

router.post('/createUser' ,
    [ 
        body('name').isLength({min:5}),
        body('email').isEmail(),
        body('password').isLength({min:5})
    ]   
    , async (req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password , salt);

    try{
        await User.create({
            name : req.body.name,
            location : req.body.location,
            email : req.body.email,
            password : secPassword
        })
        res.json({success : true});
    }
    catch(error){
        console.log(error);
        res.json({success : false});
    }
})

router.post('/loginUser' ,
    [ 
        body('email').isEmail(),
        body('password').isLength({min:5})
    ]   
    , async (req , res) => {
        let useremail = req.body.email;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        try{
            let userData = await User.findOne({email:useremail});

            if(!userData){
                return res.status(400).json({errors : 'Try Logging in with correct credentials'});
            }
            const pwdCompare = await bcrypt.compare(req.body.password , userData.password);
            if(!pwdCompare){
                return res.status(400).json({errors : 'Try Logging in with correct credentials'});
            }  
            const data = {
                user : {
                    id : userData._id
                }
            }
            let authToken = jwt.sign(data , jwtSecretKey);
            return res.json({success : true , authToken : authToken});
        }
        catch(error){
            console.log(error);
            res.json({success : false});
        }
})

module.exports = router;