const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://khanakhajana:khanakhajana@cluster0.kx1yfw4.mongodb.net/khanakhajana?retryWrites=true&w=majority'

const mongoDB = async() => {
      await mongoose.connect(mongoURI , async(err , result) => {
        if(err) {
            console.log('err--' , err)
        } 
        else {
            console.log("Connected to Mongo Successfully!");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find().toArray(async function(err , data) {
                const category_data = await mongoose.connection.db.collection("food_category");
                category_data.find().toArray(function(err , catData){
                    if(err) {
                        console.log(err)
                    } 
                    else {
                        global.food_items = data;
                        global.category_items = catData;
                    }
                })
                
            })
        }
      });
  };

module.exports = mongoDB;