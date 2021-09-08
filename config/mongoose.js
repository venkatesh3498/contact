const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"eroor in connecting to server"));

db.once('open',function () { 
    console.log("connection successful to database");
});