const express = require("express");
const wrapAsnyc = require("../utils/wrapAsnyc");
const passport = require("passport");
const { route } = require("./listings");
const router = express.Router();
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.signUpForm)
  .post(wrapAsnyc(userController.signup));

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    wrapAsnyc(userController.login),
  );

router.get("/logout", userController.logout);
module.exports = router;
