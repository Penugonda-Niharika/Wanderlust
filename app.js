if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const listings = require("./routes/listings");
const reviews = require("./routes/reviews");
const user = require("./routes/user");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const { default: MongoStore } = require("connect-mongo");

let dbUrl = process.env.MONGO_URL;

function connectToDB() {
  mongoose
    .connect(dbUrl)
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log("Error in connecting to DB", err));
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

connectToDB();

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET 
  },
  touchAfter: 24*3600
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/demo", async (req, res, next) => {
  try {
    let fakeUser = new User({
      email: "st@gmail.com",
      username: "det-stu",
    });

    let reguser = await User.register(fakeUser, "akhfd");
    res.send(reguser);
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);


app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  console.log("ERROR:", err);
  let { statusCode = 500 } = err;
  let msg = err.msg || err.message || "something went wrong";
  res.status(statusCode).render("listings/error.ejs", { msg });
});

app.listen(8080, () => {
  console.log("Server started listening!");
});
