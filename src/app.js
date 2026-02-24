const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json()); 

app.post("/signup", async (req, res) => { 
    //creating a new instance of the user model
    const user = new User (req.body);

    try{
     await user.save();
    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error in adding user: " + err.message);
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
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
   const data = req.body;
   try{
    await User.findByIdAndUpdate( {_id: userId}, data);
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



