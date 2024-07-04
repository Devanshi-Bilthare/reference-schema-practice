const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    userCreated:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})


const post = mongoose.model('post', postModel)

module.exports = post

