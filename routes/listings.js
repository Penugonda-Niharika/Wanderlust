const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const Review = require("../models/reviews");
const wrapAsnyc = require("../utils/wrapAsnyc");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const { isLoggedIn, isOwner } = require("../middleware");
const { validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

router
  .route("/")
  .get(wrapAsnyc(listingController.index))
  .post(
    isLoggedIn,
    (req, res, next) => {
    upload.single("listing[image]")(req, res, function (err) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/listings/new");
      }
      next();
    });
  },
    validateListing,
    wrapAsnyc(listingController.createListing),
  );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsnyc(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsnyc(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsnyc(listingController.deleteListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsnyc(listingController.renderEditForm),
);

module.exports = router;
