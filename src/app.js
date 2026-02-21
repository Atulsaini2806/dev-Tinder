const express = require('express');

const app = express();

app.get("/user/:userId/:name/:passward" , (req ,res) => {
    console.log(req.params);
    
  res.send({firstname:"Atul ", lastname:"Saini"});
});

// app.post("/user" , (req ,res) => {
//   res.send("successfully posted data to the database.");
// });

// app.delete("/user" , (req ,res) => {
//   res.send("successfully deleted data from the database.");
// });

app.use("/test", (req, res) => {
    res.send('Hello from the server!');
});


  
app.listen(7777, () => {
    console.log('Server is successfully listening on port 7777');
});