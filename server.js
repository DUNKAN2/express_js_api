import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/router.js'

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`API started on port ${PORT} ...`)
})