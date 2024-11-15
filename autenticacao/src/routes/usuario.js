const router = require("express").Router()
const usuarioSchema = require("../schemas/usuario")
const encriptador = require("../services/encriptador")
const { Usuario } = require("../models/index")
const jwt = require("jsonwebtoken")

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

router.post('/gerarToken', async (req, res) => {
    const {email, senha} = req.body

    if(!email || !senha){
        return res.status(403).send({
            mensagem: "Usuário ou senha inválidos",
            sucesso: false
        })
    }

    const usuario = await Usuario.findOne({
        where: {
            email: email
        }
    })

    // se a variável usuário for algum valor vazio (null, undefined)
    if(!usuario){
        return res.status(403).send({
            mensagem: "Usuário ou senha inválidos",
            sucesso: false
        })
    }

    const senhaValida = await encriptador.comparar(senha, usuario.senha)

    if(!senhaValida){
        return res.status(403).send({
            mensagem: "Usuário ou senha inválidos",
            sucesso: false
        })
    }

    const payload = {
        dados: {
            email: usuario.email,
            nome: usuario.nome
        }
    }

    const token = jwt.sign(payload, process.env.KEY, {
        algorithm: 'HS256',
        expiresIn: 60*20 // 20 minutos
    })

    return res.status(200).send({
        sucesso: true,
        token: token
    })
})

router.post('/validarToken', async (req, res) => {
    const {token} = req.body

    try{
        const decodificado = jwt.verify(token, process.env.KEY)

        return res.send({
            sucesso: true,
            mensagem: "Token Válido",
            dados: decodificado
        })
    }catch(err){
        return res.status(401).send({
            sucesso: false,
            mensagem: err.message
        })
    }
})

module.exports = router