const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    votes: {
        type: Number,
        required: true,
    }
})

const Post = mongoose.model("post", PostSchema)
module.exports = Post