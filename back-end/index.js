const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const app = express();
const Clients = require("./model/Client");

dotenv.config();
app.use(cors());
app.use(express.static("./public"));
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post("/api/login", (req, res) => {
    const { mail, name } = req.body;
    console.log(mail, name);
    const client = Clients.findOne({ mail }).then((data) => {
    
    
      if(data.name == name){
        res.json({
            status : "Success"
        })
    }
   
    }).catch((error) => {res.json({status : "failed" , message :"either mail or password is incorrect"})});
  });
  app.get("/" ,(req,res)=>{
    res.send("hello");
  })

  app.listen(process.env.PORT, () => {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
  
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("server running on port :" + process.env.PORT);
      })
      .catch((error) => {
        console.log(error);
      
      });
  });