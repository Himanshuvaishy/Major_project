const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const { log } = require("console");
const ejsMate=require("ejs-mate");
const { nextTick } = require("process");
app.use(express.json());
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js");
const { wrap } = require("module");
const listingSchema=require("./schema.js")

// connect to db 
// use mongosh command to go into mongo shell in cmd

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust_DataBase"
async function main(){
    await mongoose.connect(MONGO_URL);
}
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);

})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",ejsMate)


app.get("/", async (req,res)=>{
    const allListings=  await Listing.find({});
   //console.log(allListings);
   res.render("Listings/index.ejs",{allListings})
 
})

const validateListing =(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(" ,")
        throw new ExpressError(404,errMsg)
    }else{
        next();
    }
}

// Index Route
app.get("/listings", async (req,res)=>{
   const allListings=  await Listing.find({});
   //console.log(allListings);
   res.render("Listings/index.ejs",{allListings})
})
// create route
app.get("/listings/new",(req,res)=>{
    res.render("Listings/new.ejs")

})


//show  route
app.get("/listings/:id", wrapAsync(async (req,res)=>{
     let {id}=req.params;
     //console.log(id);
   const listing=   await Listing.findById(id);
  // console.log(listing);
   res.render("Listings/show.ejs",{listing})
}))

// create route

app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
   // let {image,price,title,....all data of  listing}=req.body.listing;
        // if(!req.body.listing){
        //     throw new ExpressError(404,"listing not found");
        // }
      //console.log(req.body);
      
        //   let result= listingSchema.validate(req.body)
        //  console.log(`${result}`);
        //   if(result.error){
        //     throw new ExpressError(400,"result.error")
        //   }
          
        //console.log(req.body.listing);
        
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    
    }));
//edit route
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
    let {id}=req.params;
     //console.log(id);
   const listing=   await Listing.findById(id);
   res.render("Listings/edit.ejs",{listing})


}))

//update route
app.put("/listings/:id", validateListing, wrapAsync(async (req,res)=>{
    let {id}=req.params;
    console.log(req.body.listing);
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
}))

//delete

app.delete("/listings/:id", wrapAsync( async(req,res)=>{
    let {id}=req.params;
    let delteData=  await Listing.findByIdAndDelete(id);
    console.log(delteData);
    res.redirect("/listings")

}))








// app.get("/testListing", async (req,res)=>{
//     // here we are creating document for are Listing model(colletion) into wanderlust_DataBase
//    let sampleListing=new Listing({
//     title:"My Sweet Home",
//     description:"It is a place where I feel  more comfortable",
//     price:1200,
//     location:"Haidergarh",
//     Country:"India",
//    })
// await sampleListing.save();
// console.log("sample was saved");
// res.send("sucessful testing");

// })


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));

})

app.use((err,req,res,next)=>{
   let {id}=req.params
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        res.render("Listings/error.ejs",{err,id}) // Send status and message
})




app.listen(8080, (req,res)=>{
    console.log(`app is listening at port No. ${8080}`);
    
})