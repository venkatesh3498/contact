const mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://m001-student:bpotZbGpiUWe2OhG@sandbox.1oufz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"eroor in connecting to server"));

db.once('open',function () { 
    console.log("connection successful to database");
});