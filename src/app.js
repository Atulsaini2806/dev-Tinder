const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); 
app.use(cookieParser());

app.post("/signup", async (req, res) => { 
    try{
    validateSignUpData(req);
    const {firstName,lastName, emailId ,password} = req.body;
//Encrypting the password
     const passwordHash = await bcrypt.hash(password, 10);

//creating a new instance of the user model
    const user = new User ({
        firstName,
        lastName,
        emailId ,
        password : passwordHash
    });
     await user.save();
    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
 });

 app.post("/login", async (req, res) => {
    try{
        const {emailId ,password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){

//create the JWT Token

const token =  await jwt.sign({_id : user._id}, "DEV@TinderSecretKey");

// add the token to cokoie and the response back to the user
            res.cookie("token", token);
            res.send("Login successful!!!!!!!");
        }else{
            throw new Error("Invalid credentials.");
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
 });

 app.get("/profile", async (req, res) => {
     try{
        const cookies = req.cookies; 
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid Token");
        }
const decodedMessage = await jwt.verify(token, "DEV@TinderSecretKey");

const {_id} = decodedMessage;

const user = await User.findById(_id);
if(!user){
    throw new Error("User does not exist");
}
res.send(user);
} catch(err){
    res.status(400).send("Error : " + err.message);
}
 });

 //Get user by mail
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
  try{
    const user = await User.findOne({emailId : userEmail});
    if(!user){
        return res.status(404).send("User not found with email: " + userEmail);
    } else{
        res.send(user);
    }
    // const users = await User.find({emailId : userEmail});
    // if(users.length === 0){
    //     return res.status(404).send("User not found with email: " + userEmail);
    // } else{
    //     res.send(users);
    // }
  }
  catch(err){
    res.status(400).send("something went wrong: " + err.message);
  }
});

 // feed API - GET /feed - get all the user from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Error in fetching users: " + err.message);
    }
});

//delete a user from a database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
         //const user = await User.findByIdAndDelete({ _id: userId});
       const user =await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(400).send("Error in deleting user: " + err.message);
    }
});

//update the data of the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
   const data = req.body;

   try{
     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age","skills"];

   const isUpdateAllowed = Object.keys(data).every((k) => 
    ALLOWED_UPDATES.includes(k));

   if(!isUpdateAllowed){
    throw new error("Update not allowed");
   }

   if(data?.skills.length>10){
    throw new error("Skills should not be more than 10");
   }

    const user = await User.findByIdAndUpdate( {_id: userId}, data, {runValidators : true});
    res.send("User updated successfully");
   }
    catch(err){
        res.status(400).send("Error in updating user: " + err.message);
    }
});

connectDB().then(() => {
    console.log("Database connected successfully.....");
    app.listen(7777, () => {
    console.log('Server is successfully listening on port 7777');
  });
})
.catch((err) => {
    console.error("Database connection failed.....");
});



