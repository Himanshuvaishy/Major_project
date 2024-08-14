const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review =require("./reviews.js")
// creating schema
const listingSchema= new Schema({
    title:{
        type:String,
        required:true

    },
    description: String,
    image: {
       url:String,
       filename:String,
      },
    price: Number,
    location:String,
    country:String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review"

      }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"

    },
});

listingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing) {
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
})

//creating Model---- 
//In Db It covert as listings for our understanding model is just a collection 

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;