const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");


const {
  validateReview,
  isloggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");

router.post(
  "/",
  isloggedIn,
  validateReview,
  wrapAsync(reviewsController.createReview)
);

router.delete(
  "/:reviewId",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewsController.deleteReview)
);

module.exports = router;
