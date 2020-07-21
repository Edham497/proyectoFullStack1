import express from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'

import { NOT_FOUND, AUTH_REJECTED, DUPLICATED, SERVER_ERROR, WRITE_JSON } from '../models/ResponseHandler'

const router = express.Router()

router.get('/', async (request, response) => {
    try {
        const listaUsuarios = await User.find({})
        if (listaUsuarios.length < 2)
            WRITE_JSON(response, listaUsuarios[0])
        else
            WRITE_JSON(response, listaUsuarios)
    } catch (e) {
        SERVER_ERROR(response)
    }
})

router.post('/find', async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email })
        if (user) {
            response.status(200).json({
                status: "OK",
                usr_data: {
                    rol: user.rol,
                    nombre: user.nombre,
                    direccion: user.direccion,
                    telefono: user.telefono,
                    email: user.email,
                    createdAt: user.createdAt
                }
            })
        } else {
            NOT_FOUND(response, 'El usuario no existe')
        }
    } catch (e) {
        SERVER_ERROR(response)
    }
})

router.post('/add', async (request, response) => {
    try {
        request.body.password = await bcrypt.hash(request.body.password, 10)
        const user = new User(request.body)
        await user.save()
        WRITE_JSON(response, { status: 'OK' })
    } catch (e) {
        if (e.code == 11000)
            DUPLICATED(response, 'Usuario, Correo o Telefono ya existe')
        else
            SERVER_ERROR(response)
    }
})

router.put('/edit', async (request, response) => {
    const { userToChange, data } = request.body
    const res = await User.updateOne({ email: userToChange }, { $set: data })
    WRITE_JSON(response, { status: 'OK', backlog: JSON.stringify(res) })
})

// router.delete('/delete', async(request, response) => {
//     const useroToDelete = request.body
//     const res = await User.findByIdAndDelete({ _id: request.body._id });
// })

router.post('/login', async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email })
        if (user) {
            if (await bcrypt.compare(request.body.password, user.password)) {
                response.status(200).json({
                    status: "OK",
                    usr_data: {
                        rol: user.rol,
                        nombre: user.nombre,
                        direccion: user.direccion,
                        telefono: user.telefono,
                        email: user.email,
                        createdAt: user.createdAt
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