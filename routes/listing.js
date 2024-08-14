const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const methodOverride = require("method-override");
router.use(methodOverride("_method"));
let { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const {storage}=require("../cloudConfig.js")
const multer=require('multer')
const upload=multer({storage});

//index Listing
router.get("/", wrapAsync(listingController.index));
// form for listing
router.get("/new", isloggedIn, listingController.renderNewForm);
// show listing in detail
router.get("/:id", wrapAsync(listingController.showListing));

// create new listing
router.post(
  "/",
  isloggedIn,
   upload.single('listing[image]'),
   validateListing,
  wrapAsync(listingController.addNewListing)
);

//edit route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.rendereditRoute)
);

//update route
router.put(
  "/:id",
  isloggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//delete

router.delete(
  "/:id",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);
module.exports = router;
