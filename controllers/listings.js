const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  //console.log(allListings);
  res.render("Listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("Listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  console.log(id);
   try {
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", " No such Listing Exist in Database");
      res.redirect("/listings");
    }
    console.log(listing);

    res.render("Listings/show.ejs", { listing });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addNewListing=async (req, res, next) => {
         let url=req.file.path;
         let filename=req.file.filename;
      //console.log(url,"..",filename);
        
         
        const newListing = new Listing(req.body.listing);
         newListing.owner=req.user._id;
         newListing.image={url,filename}
         await newListing.save();
         req.flash("success","New Listing Created")
         res.redirect("/listings");
     
     }

     module.exports.rendereditRoute=async(req,res)=>{
        let {id}=req.params;
         //console.log(id);
       const listing=   await Listing.findById(id);
       res.render("Listings/edit.ejs",{listing})
    
    
    }

    module.exports.updateListing=async (req,res)=>{
        let {id}=req.params;
        console.log(id);
       let listing=  await Listing.findByIdAndUpdate(id,{...req.body.listing});
      
      if(typeof req.file !== "undefined"){
       let url=req.file.path;
       let filename=req.file.filename;
       listing.image={url,filename};
       await listing.save();
      }
        req.flash("success"," Listing Updated")
         res.redirect(`/listings/${id}`);
    }

    module.exports.deleteListing=async(req,res)=>{
        let {id}=req.params;
        let delteData=  await Listing.findByIdAndDelete(id);
        console.log(delteData);
        req.flash("success"," Listing Deleted")
        res.redirect("/listings")
    
    }
