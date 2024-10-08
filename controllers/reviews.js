const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");


module.exports.createReview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id
    console.log(newReview);
    

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    req.flash("success","New Review Created")
     res.redirect(`/listings/${listing._id}`);
    


}

module.exports.deleteReview=async (req,res)=>{

    // console.log(req.params);
     
 let { id, reviewId}=req.params;
 console.log(reviewId);
 

 await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId);
  req.flash("success"," Review Deleted")
  res.redirect(`/listings/${id}`)
}