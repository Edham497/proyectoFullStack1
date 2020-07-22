import mongoose from 'mongoose'
const { Schema } = mongoose

export default mongoose.model('compra', new Schema({
    total: Number,
    userId: Schema.ObjectId,
    productos: Object,
    cantidad: Number,
    total: Number
}))