const express = require("express");
const router = express.Router();


router.post('/displaydata' , (req , res) => {
    try {
        res.send([global.food_items , global.category_items]);
    } catch (error) {
        console.error(error.message);
        res.send("server error")
    }
})


module.exports = router;