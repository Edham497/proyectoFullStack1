import express from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.get('/', async (request, response) => {
    try{
        const listaUsuarios = await User.find({})
        if (listaUsuarios.length < 2)
            response.status(200).json(listaUsuarios[0])
        else
            response.status(200).json(listaUsuarios)
    }catch(e){
        response.status(500).json({ status: 'Ocurrió un error' });
    }
})

router.post('/add', async (request, response) => {
    try {
        request.body.password = await bcrypt.hash(request.body.password, 10)
        const user = new User(request.body)
        await user.save()
        response.status(200).json({ status: 'OK' })
    } catch (e) {
        response.status(500).json({ status: 'Ocurrió un error' });
    }
})

router.put('/edit', async (request, response) => {
    const { userToChange, data } = request.body
    const res = await User.updateOne({ _id: userToChange }, { $set: data })
    response.status(200).json({ status: 'OK', backlog: JSON.stringify(res) })
})

// router.delete('/delete', async(request, response) => {
//     const useroToDelete = request.body
//     const res = await User.findByIdAndDelete({ _id: request.body._id });
// })

router.post('/login', async (request, response) => {
    try{
        const user = await User.findOne({email: request.body.email})
        if(user){
            if(await bcrypt.compare(request.body.password, user.password)){
                response.status(200).json({
                    status: "OK",
                    usr_data: {
                        rol: user.rol,
                        nombre: user.nombre,
                        direccion: user.direccion,
                        telefono: user.telefono,
                        email: user.email
                    }
                })
            }else{
                response.status(400).json({
                    status: "AUTH_REJECTED",
                    error: 'correo o contraseña incorrectos'
                })
            }
        }else{
            response.status(404).json({
                status: "NOT_FOUND",
                error: 'El usuario no existe'
            })
        }
    }catch(e){
        console.log(e)
        response.status(500).json({
            status: "SERVER_ERROR",
            error: 'Error de servidor',
        })
    }
})

export default router