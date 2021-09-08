var express = require('express');
const { isValidObjectId } = require('mongoose');
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contacts');
const app = express();


app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

const port = process.env.port||8000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("assets"))

var contacts = [
    {
        name:"Mahesh Babu",
        number:"896497312"
    },
    {
        name:"Chiranjevi",
        number:"9875093209"
    }
]





app.get("/",function (req,res) {

    Contact.find({},function (err,contact) {
        if(err){
            console.log("error while fetching contacts from db");
            return;
        }

        return res.render('home',{title:"My Contact List",contact:contact});
    })

    
});

app.post("/action",function(req,res){
    // contacts.push({
    //     name:req.body.name,
    //     number:req.body.number
    // });
    //contacts.push(req.body);

    Contact.create({
        name:req.body.name,
        number:req.body.number
    },function(err,newcontact){
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log('*********',newcontact);
        return res.redirect('back');
    });


    //return res.redirect("/")
});
app.get("/delete/",function(req,res){
    console.log(req.query);
    let phone = req.query.number;
    Contact.findByIdAndDelete(phone,function (err) {
        if(err){
            console.log("error while deleting contact");
        }
        return res.redirect("back");
    });
    // let contactindex = contacts.findIndex(contactss => contactss.number == phone);
    // if(contactindex !== -1){
    //     contacts.splice(contactindex,1);
    // }
    
});

app.listen(port,function (err) {
    if(err){
        console.log("ouch there was an error");
        return;
    }
    console.log("port is up and running on:",port);
  });