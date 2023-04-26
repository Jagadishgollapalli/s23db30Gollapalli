const mongoose = require("mongoose");
const universitySchema = mongoose.Schema({
  University_name: { type: String, minlength: 3, maxlength: 20 },
  City: { type:String, minlength: 3, maxlength: 20 },
  Students: { type: Number, minlength: 1, maxlength: 1000 },
});
module.exports = mongoose.model("University", universitySchema);
