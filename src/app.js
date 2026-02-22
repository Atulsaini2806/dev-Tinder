const express = require('express');
const app = express();

app.use("/user", (req ,res,next) => {
    res.send("Route handler one");
   next();
       //res.send("Route handler one");
},
(req,res) => {
  res.send("Route handler 2");
}
);


app.listen(7777, () => {
    console.log('Server is successfully listening on port 7777');
});