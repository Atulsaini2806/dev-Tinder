const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        minLength : 4,
        maxLength : 20
    },
    lastName:{
        type : String
    },
    emailId:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    passward:{ 
        type : String
    },
    age:{
        type : Number,
        min : 18
    },
    gender:{
        type : String
    },
    photoUrl:{
        type : String,
        default : "https://www.pngitem.com/middle/ixwxbwh_user-profile-dummy-hd-png-download/"
    },
    about:{
        type : String,
        default : "This is the default about the user!"
    },
    skills:{
        type : [String]
    }
});

module.exports =  mongoose.model("user",userSchema);