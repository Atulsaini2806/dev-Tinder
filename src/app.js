const express = require('express');
const app = express();

app.use("/user", (req ,res,next) => {
    res.send("Route handler two");
});
app.use("/user", (req ,res,next) => {
    res.send("Route handler one");
   next();
});


app.listen(7777, () => {
    console.log('Server is successfully lis   tening on port 7777');
});