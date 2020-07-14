import mongoose from 'mongoose'
const { Schema } = mongoose

const product = new Schema({
    name: '',
    marca: String,
    departamento: String,
    descripcion: String,
    categoria: String,
    precio: Number,
    existencia: Number
})

export default mongoose.model('product', product)