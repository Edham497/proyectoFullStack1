import express, { response, request } from 'express'
import Product from '../../models/product'

const router = express.Router()

router.get('/', async(request, response) => {
    const listaProducts = await Product.find({})
    response.status(200).json(listaProducts)
})

router.post('/add', async(request, response) => {
    // console.log(request.body)
    const product = new Product(request.body)
    await product.save()
    response.status(200).json({status: 'OK'})
})

router.put('/refresh', async(request, response) => {
    const {productToChange, data} = request.body
    const res = await Product.updateOne({_id: productToChange}, {$set: data})
    response.status(200).json({status: 'OK', backlog: JSON.stringify(res)})
})

// router.delete('/delete', async(request, response) => {
//     const productoToDelete = request.body
//     const res = await Product.deleteOne()
// })

export default router