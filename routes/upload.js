import express from 'express'
import fileUpload from 'express-fileupload'

const app = express()

app.use(fileUpload())

app.post('/', async (req, res) => {
    if (req.files) {
        let exts = ['png', 'jpg', 'jpeg', 'gif']
        let file = req.files.archivo
        let extension = file.name.split('.')
        let ext = extension[extension.length - 1]

        if(exts.indexOf(ext) < 0){
            return res.status(500).json({
                status: 'error',
                error: 'extension no valida'
            })
        }

        file.mv(`uploads/img.${ext}`, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err
                })
            }
            return res.status(200).json({ 
                status: 'OK',
                file: `${Date.now()}.${ext}`, 
                msg: 'imagen subida correctamente' 
            })
        })
    }
})

export default app