const Listing = require("../models/listings");
const Review = require("../models/reviews");
const { listingSchema, reviewSchema } = require("../schema");
const axios = require("axios");

module.exports.index = async (req, res) => {
  const { category, search } = req.query;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ];
  }

  const allListings = await Listing.find(filter);

  res.render("listings/index.ejs", {
    allListings,
    category,
    search,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  const listing = req.body.listing;
  const newListing = new Listing(listing);

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  const locationQuery = `${listing.location}, ${listing.country}`;

  const geoRes = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: locationQuery,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": "StayScapeApp/1.0",
    },
  });

  if (geoRes.data.length > 0) {
    newListing.geometry = {
      type: "Point",
      coordinates: [
        parseFloat(geoRes.data[0].lon),
        parseFloat(geoRes.data[0].lat),
      ],
    };
  }

  newListing.owner = req.user._id;

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }
  let orgImgUrl = listing.image.url;
  orgImgUrl = orgImgUrl.replace("/upload", "/upload/h_50,w_100");
  res.render("listings/edit.ejs", { listing, orgImgUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listing = req.body.listing;
  let newListing = await Listing.findByIdAndUpdate(id, { ...listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };
    await newListing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
