// modules
import mongoose from "mongoose";
import Product from './models/product'
import User from './models/user'
import bcrypt from 'bcryptjs'

// data from JSON
import data from './data/data.json'
import settings from './data/settings.json'
import users from './data/users.json'

mongoose
    .connect(
        `mongodb+srv://edham:${settings.pw}@proyectofullstack.xm1zv.mongodb.net/${settings.db}?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
    )
    .then(db => {
        console.log("DB connected")
        importData()
        
    })
    .catch((err) => console.error(err));



function importData() {
    // data.forEach(async product => {
    //     const _product = new Product(product)
    //     // console.log(_product)
    //     await _product.save()
    // })
    users.forEach(async user => {
        try{
            user.password =  await bcrypt.hash(user.password, 10)
            const _user = new User(user)
            await _user.save()

        }catch(e){
            if(e.code == 11000){
                console.log("usuario duplicado")
            }
            // console.log(JSON.stringify(e))
        }
    })
}