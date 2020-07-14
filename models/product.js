import mongoose from 'mongoose'
const { Schema } = mongoose

const product = new Schema({
    name: String,
    marca: String,
    departamento: String,
    descripcion: String,
    categoria: String,
    precio: Number
})

export default mongoose.model('product', product)