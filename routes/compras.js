import express from 'express'
import Compra from '../models/compra'
import { WRITE_JSON, NOT_FOUND, SERVER_ERROR } from '../models/ResponseHandler'

const router = express.Router()

router.post('/add', async(request, response) => {
    try{
        let compra = new Compra(request.body)
        compra.save()
        WRITE_JSON(response, {status: "OK", compraID: compra._id})
    }catch(e){
        SERVER_ERROR(request)
    }
})

router.post('/getCompras', async(request, response) => {
    try{
        let listaCompras = await Compra.find({userId: request.body})
        if(compra){
            WRITE_JSON(response, {status: "OK", listaCompras})
        }else{
            NOT_FOUND(response, 'No se encontraron compras con este id')
        }
    }catch(e){
        SERVER_ERROR(response)
    }
})

export default router