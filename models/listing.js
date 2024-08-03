const mongoose=require("mongoose");
const Schema=mongoose.Schema;
// creating schema
const listingSchema= new Schema({
    title:{
        type:String,
        required:true

    },
    description: String,
    image: {
        filename: {
          type: String,
          default: "default-image-filename",
        },
        url: {
          type: String,
          default: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
          set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        },
      },
    price: Number,
    location:String,
    country:String
});

//creating Model---- 
//In Db It covert as listings for our understanding model is just a collection 

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;