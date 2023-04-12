const mongoose = require("mongoose")
const shirtSchema = mongoose.Schema({
shirt_type: String,
shirt_size: String,
shirt_value: Number
})
module.exports = mongoose.model("shirt",
shirtSchema)