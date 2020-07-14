import express from 'express'
import fileUpload from 'express-fileupload'

const app = express()

app.use(fileUpload())

app.post('/', async (req, res) => {
    if (req.files) {
        let file = req.files.archivo
        file.mv('uploads/img.jpg', (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err
                })
            }
            return res.status(200).json({ 
                status: 'OK', 
                msg: 'imagen subida correctamente' 
            })
        })
    }
})

export default app