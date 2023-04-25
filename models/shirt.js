const mongoose = require("mongoose")
const shirtSchema = mongoose.Schema({
shirt_type: String,
shirt_size: String,
shirt_value: {
    type: Number,
    min:143,
    mxm:225
}
})
module.exports = mongoose.model("shirt",
shirtSchema)