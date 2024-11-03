const router = require("express").Router()
const usuarioSchema = require("../schemas/usuario")
const encriptador = require("../services/encriptador")
const { Usuario } = require("../models/index")

router.post("/cadastrar", async (req, res) => {
    const usuarioDados = req.body
    const validacao = usuarioSchema.safeParse(usuarioDados)

    if (validacao.success) {

        try {
            validacao.data.senha = await encriptador.encriptar(validacao.data.senha)
        } catch (err) {
            res.status(400).send({
                mensagem: err.message,
                sucesso: false,
                id: null
            })
        }

        const usuario = await Usuario.create(validacao.data)
        res.status(201).send({
            mensagem: "Usuário cadastrado com sucesso",
            sucesso: true,
            id: usuario.id
        })
    } else {
        res.status(400).send({
            mensagem: validacao.error.format(),
            sucesso: false,
            id: null
        })
    }

})

module.exports = router