var express = require("express");
const University_controller = require("../controllers/University");
var router = express.Router();

// const secured = (req, res, next) => {
//  if (req.user){
//  return next();
//  }
//  req.session.returnTo = req.originalUrl;
//  res.redirect("/login");
//  }

/* GET flowers */
router.get("/", University_controller.University_view_all_Page);

// GET request for one flower.
router.get("/University/:id", University_controller.university_detail);

/* GET detail costume page */
router.get("/detail", University_controller.University_view_one_Page);

/* GET create update page */
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
    }

/* GET create costume page */
router.get("/create",secured, University_controller.University_create_Page);

/* GET create update page */
router.get("/update",secured, University_controller.University_update_Page);

/* GET delete costume page */
router.get("/delete",secured, University_controller.University_delete_Page);

module.exports = router;