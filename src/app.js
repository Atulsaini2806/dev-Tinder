const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.post("/signup", async (req, res) => {
    const user = new User ({
        firstName: "Virat",
        lastName: "Kohil",
        emailId: "virat@123",
        passward: "65432112345" 
    });

    try{
     await user.save();
    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error in adding user: " + err.message);
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



