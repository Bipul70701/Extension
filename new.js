const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const cors = require('cors')
const router = express.Router();
mongoose.connect("mongodb+srv://Bipul8765:USXgU4Q01wIs6vFh@cluster0.zbvcq.mongodb.net/Extension");

const Schema={
    Full_Name:String,
    Email:{
        type:String,
        unique:true
    },
    Code:String
};

var S = mongoose.Schema
const PhotoSchema={
    photo:String,
    email:String,
    timestamp: String
};

const User=mongoose.model("users",Schema);
const Photo=mongoose.model("photo",PhotoSchema);

const app=express();
app.use(express.static(__dirname+'/public'));
app.set("view engine",'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
  app.post("/new",async (req,res) =>  {
    console.log(req.body);
    var myData=new User({
        "Full_Name":req.body.name,
        "Email":req.body.email,
        "Code":req.body.code
    })
    const data = await myData.save();
    return res.json({data})

});

app.post("/photo",async (req,res) =>  {
    console.log(": ",req.body);
    var myData=new Photo({
        "photo":req.body.blob,
        "email": req.body.email,
        "timestamp": req.body.timestamp
    })
    const data = await myData.save();
    console.log(data);
    return res.json({data})

});

app.get("/",async(req,res)=>{
    res.sendFile(__dirname+"/dashboard.html");
});

app.post("/dashboard",function(req,res){
    User.findOne({"Email" : req.body.Email},
    function(err,user){
        if(user)
        {
           Photo.find({email:req.body.Email},function(err,result){
            if(err)throw err;
            res.render("success",{photos:result});
           });
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    });
});

app.post("/failure",async(req,res)=>{
    res.sendFile(__dirname+"/dashboard.html");
})

app.listen(process.env.PORT || 3000,function ()
{
    console.log("Server started on port 3000");
});
