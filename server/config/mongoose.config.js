// Import Mongoose 
const mongoose = require("mongoose");

module.exports = (DB) => {
    mongoose.connect("mongodb://localhost:27017/" + DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established a connection to the ${DB} database.`))
    .catch(err => console.log("Something went wrong while attempting to connect to the database", err));
}

// // Connect to the DB platform
// mongoose.connect("mongodb://localhost" + DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log(`Established a connection to the ${DB} database.`))
//     .catch(err => console.log("Something went wrong while attempting to connect to the database", err));