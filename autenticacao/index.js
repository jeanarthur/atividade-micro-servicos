require('dotenv').config()

const express = require("express")
const usuarioRouter = require("./src/routes/usuario")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(usuarioRouter)

app.get("/", (req, res)=> {
    res.send("Rodando")
})

app.listen(PORT, () => {
    console.info("Servidor rodando")
})