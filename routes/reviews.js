const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listings");
const wrapAsnyc = require("../utils/wrapAsnyc");
const Review = require("../models/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews");

//Reviews-Post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsnyc(reviewController.createReviews),
);

//Reviews-Delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsnyc(reviewController.deleteReviews),
);

module.exports = router;
