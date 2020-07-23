import express from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import { AUTH_REJECTED, SERVER_ERROR, NOT_FOUND } from '../models/ResponseHandler'

const router = express.Router()


router.post('/login', async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email })
        if (user) {
            if (await bcrypt.compare(request.body.password, user.password)) {
                response.status(200).json({
                    status: "OK",
                    usr_data: {
                        token: user._id,
                        rol: user.rol,
                        nombre: user.nombre,
                        direccion: user.direccion,
                        telefono: user.telefono,
                        email: user.email,
                        createdAt: user.createdAt,
                        favoritos: user.favoritos,
                        carrito: user.carrito,
                    }
                })
            } else {
                AUTH_REJECTED(response)
            }
        } else {
            NOT_FOUND(response)
        }
    } catch (e) {
        SERVER_ERROR(response)
    }
})

router.post('/verify', async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email })
        if (user) {
            if (await bcrypt.compare(request.body.password, user.password)) {
                response.status(200).json({
                    status: "OK"
                })
            } else {
                AUTH_REJECTED(resposne)
            }
        }
    } catch (e) {
        SERVER_ERROR(response)
    }
})

router.post('/changePassword', async (request, response) => {
    const { userToChange, data } = request.body
    console.log(userToChange, data)
    const newPassword = await bcrypt.hash(data, 10)
    const res = await User.updateOne({ email: userToChange }, { $set: { password: newPassword } })
    response.status(200).json({ status: 'OK' })
})

export default router