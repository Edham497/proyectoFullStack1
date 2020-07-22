import express from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'

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
                        favoritos: user.favoritos
                    }
                })
            } else {
                response.status(401).json({
                    status: "AUTH_REJECTED",
                    error: 'correo o contraseña incorrectos'
                })
            }
        } else {
            response.status(404).json({
                status: "NOT_FOUND",
                error: 'El usuario no existe'
            })
        }
    } catch (e) {
        console.log(e)
        response.status(500).json({
            status: "SERVER_ERROR",
            error: 'Error de servidor',
        })
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
                response.status(400).json({
                    status: "AUTH_REJECTED",
                    error: 'correo o contraseña incorrectos'
                })
            }
        }
    } catch (e) {
        response.status(500).json({
            status: "SERVER_ERROR",
            error: 'Error de servidor',
        })
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