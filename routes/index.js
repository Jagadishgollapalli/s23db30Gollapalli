var express = require("express");

var http = require("http-errors");

var passport = require("passport");

var router = express.Router();

var Account = require("../models/account");

router.get("/", function (req, res) {
  res.render("index", { title: "University App", user: req.user });
});

router.get("/register", function (req, res) {
  res.render("register", { title: "University App Registration" });
});

router.post("/register", async function (req, res) {
  try {
    const user = await Account.findOne({ username: req.body.username });

    if (user) {
      return res.render("register", {
        title: "Registration",

        message: "Existing User",

        account: req.body.username,
      });
    }

    const newAccount = new Account({ username: req.body.username });

    await Account.register(newAccount, req.body.password);

    console.log("Success, redirect");

    res.redirect("/");
  } catch (err) {
    console.error(err);

    return res.render("register", {
      title: "Registration",

      message: "Registration error",

      account: req.body.username,
    });
  }
});

router.get("/login", function (req, res) {
  res.render("login", { title: "University App Login", user: req.user });
});

router.post("/login", passport.authenticate("local"), function (req, res) {
  if (req.session.returnTo) res.redirect(req.session.returnTo);

  res.redirect("/");
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/ping", function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
