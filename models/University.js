const mongoose = require("mongoose")
const universitySchema = mongoose.Schema({
University_name: String,
City: String,
Students: Number
})
module.exports = mongoose.model("University",
universitySchema)