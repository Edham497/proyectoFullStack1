import mongoose from 'mongoose'
const {Schema} = mongoose

mongoose.model('user', new Schema({
    username: String,
    password: String,
    email: String,
    tel: String,
    img: String
}))