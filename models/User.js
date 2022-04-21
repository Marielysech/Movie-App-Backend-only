const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: true,
        message : "Please enter you name"
    },
    email:{
        type: String,
        unique: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Email is not a valid email format"]
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    picture:{
        type: String, //as it will be a path to the picture
    },
    favGenres: [{
        type: String,
        default : []
    }],

    favMovies: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        default : [],
        unique: true
    }]
})


module.exports = new mongoose.model("UserX", userSchema)