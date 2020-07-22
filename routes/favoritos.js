import express from 'express'
import User from '../models/user'
import { WRITE_JSON, SERVER_ERROR, WRITE_DATA, NOT_FOUND, WRITE_OK } from '../models/ResponseHandler'

const router = express.Router()

router.post('/add', async (request, response) => {
    try {
        const { userID, productID } = request.body
        await User.findByIdAndUpdate(userID, { $addToSet: { favoritos: productID } })
        WRITE_OK(response)
    } catch (e) {
        if (e.code == 11000)
            DUPLICATED(response, 'Favorito ya existe')
        else
            SERVER_ERROR(response, {backlog: e})
    }
})

router.post('/list', async (request, response) => {
    try {
        const { userID } = request.body
        const listaFavoritos = await User.findById(userID)
        if(listaFavoritos){
            WRITE_DATA(response, listaFavoritos.favoritos)
        }else{
            NOT_FOUND(response, 'Usuario no encontrado')
        }
    } catch (e) {
        SERVER_ERROR(response)
    }
})

router.post('/remove', async (request, response) => {
    try {
        // console.log('remove', request.body)
        const { userID, productID } = request.body
        await User.findByIdAndUpdate(userID, { $pull: { favoritos: { $in: [productID] } } })
        WRITE_OK(response)
    } catch(e){
        SERVER_ERROR(response, {backlog: e})
    }
})

export default router