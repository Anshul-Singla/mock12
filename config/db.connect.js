const mongoose  = require("mongoose");
// mongoose.set("strictQuery", false);

const dbconnect = mongoose.connect("mongodb+srv://mock:12@cluster0.4eojp4w.mongodb.net/mock12")
.then(()=> console.log('connected to DB'))

module.exports = dbconnect