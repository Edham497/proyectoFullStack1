import express from 'express'
import Product from '../models/product'
import User from '../models/user'

import { SERVER_ERROR, WRITE_JSON, NOT_FOUND, WRITE_DATA, WRITE_OK } from '../models/ResponseHandler'

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const router = express.Router()

router.get('/list', async (request, response) => {
    const listaProducts = await Product.find({})
    if (listaProducts.length < 2)
        WRITE_JSON(response, listaProducts[0])
    else
        WRITE_JSON(response, listaProducts)
})

router.post('/add', async (request, response) => {
    const product = new Product(request.body)
    await product.save()
    WRITE_JSON(response, { status: 'OK' })
})

router.put('/edit', async (request, response) => {
    const { productToChange, data } = request.body
    const res = await Product.updateOne({ _id: productToChange }, { $set: data })
    WRITE_JSON(response, { status: 'OK', backlog: JSON.stringify(res) })
})

// router.delete('/delete', async(request, response) => {
//     const productoToDelete = request.body
//     const res = await Product.deleteOne()
// })

router.get('/find', async (request, response) => {
    try {
        const product = await Product.findById(request.body)
        if (product)
            WRITE_JSON(response, { status: 'OK', product })
        else
            NOT_FOUND(response, 'Producto no encontrado')
    } catch (e) {
        SERVER_ERROR(response)
    }
})


router.post('/findList', async (request, response) => {
    const products = request.body
    let list = []
    await asyncForEach(products, async product => {
        try {
            const _produc = await Product.findById(product)
            list.push(_produc)
        } catch (e) {
            SERVER_ERROR(response)
        }
    })
    WRITE_DATA(response, list)
})

router.post('/addToCart', async (request, response) => {
    try {
        const { userID, carritoNuevo } = request.body
        console.log(carritoNuevo)
        await User.findByIdAndUpdate(userID, { $set: { carrito: carritoNuevo} })
        WRITE_OK(response)
    } catch (e) {
        console.log(e)
        SERVER_ERROR(response, e)
    }
})

export default router