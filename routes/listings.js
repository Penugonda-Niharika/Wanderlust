const express = require("express");
const router = express.Router();
const wrapAsnyc = require("../utils/wrapAsnyc");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const uploadListingImage = (req, res, next) => {
  upload.single("listing[image]")(req, res, function (err) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect(req.originalUrl.includes("_method=PUT") ? "back" : "/listings/new");
    }
    next();
  });
};

router
  .route("/")
  .get(wrapAsnyc(listingController.index))
  .post(
    isLoggedIn,
    uploadListingImage,
    validateListing,
    wrapAsnyc(listingController.createListing)
  );

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsnyc(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    uploadListingImage,
    validateListing,
    wrapAsnyc(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsnyc(listingController.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsnyc(listingController.renderEditForm)
);

module.exports = router;