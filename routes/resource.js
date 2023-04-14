var express = require("express");
var router = express.Router();
// Require controller modules.
var api_controller = require("../controllers/api");
var university_controller = require("../controllers/University");
/// API ROUTE ///
// GET resources base.
router.get("/", api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post("/university", university_controller.university_create_post);
// DELETE request to delete Costume.
router.delete("/university/:id", university_controller.university_delete);
// PUT request to update Costume.
router.put("/university/:id", university_controller.University_update_put);
// GET request for one Costume.
router.get("/university/:id", university_controller.university_detail);
// GET request for list of all Costume items.
router.get("/universities", university_controller.university_list);
module.exports = router;
