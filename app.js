if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

console.log(process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.use(express.json());
const ExpressError = require("./utils/ExpressError.js");

const Listing=require("./models/listing.js");
const session = require("express-session");
const flash=require("connect-flash");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter=require("./routes/user.js");

const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");




const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust_DataBase";


async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);


const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    Cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
}

app.use(session(sessionOptions) )
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error")
    //console.log(res.locals.success);
    res.locals.currUser=req.user;
    
    next();
})

app.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    //console.log(allListings);
    res.render("Listings/index.ejs", { allListings });
});

// listing Routes
app.use("/listings", listingsRouter);

// reviews Routes
app.use("/listings/:id/reviews", reviewRouter);

// user Routes
app.use("/",userRouter)

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    let { id } = req.params;
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.render("Listings/error.ejs", { err, id }); // Send status and message
});

app.listen(8080, (req, res) => {
    console.log(`app is listening at port No. ${8080}`);
});
