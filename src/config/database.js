const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://atul_saini:8c6kad6EAyEpnY31@atulsaini-cluster.g4sc5jb.mongodb.net/devTinder"
    );
};

module.exports = connectDB;