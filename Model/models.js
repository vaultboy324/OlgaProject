const mongoose = require("mongoose");

const meetScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    name: String,
    participants : [],
    messages: [],
    creator: String,
    lat: Number,
    lng: Number
});

const userScheme = new mongoose.Schema({
    login: String,
    password: String,
    age: Number,
    lastName: String,
    firstName: String,
    friends: Array,
    friendRequests: []
});

const channelScheme = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    name: String,
    participants : [],
    messages: [],
    creator: String,
});

module.exports = {
//  authScheme : userAuthScheme,
    meetScheme : meetScheme,
    userScheme: userScheme,
    channelScheme: channelScheme
};