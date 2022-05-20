const mongooseConfig = require("../config/mongoose.config");

// Import Mongoose to build a model
const mongoose = require("mongoose");

// The schema - rules that the entries in DB must follow
const authorSchema = new mongoose.Schema(
    {
    fullname: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [3, "Full name must be at least 3 characters long."]
    },
    }, 
    {timestamps: true}
);

// The model - This is what we use to make the actual queries to DB
const Author = mongoose.model('Author', authorSchema);

// Export the model
module.exports = Author;