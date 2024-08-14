const express = require("express");
const router = express.Router({});

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersControllers = require("../controllers/users.js");

// signup form render
router.get("/signup", usersControllers.renderSignupForm);

router.post("/signup", wrapAsync(usersControllers.signup));
//login
router.get("/Login", usersControllers.renderLoginForm);

router.post(
  "/Login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/Login",
    failureFlash: true,
  }),
  usersControllers.login
);

//logout
router.get("/logout", usersControllers.logout);

module.exports = router;
