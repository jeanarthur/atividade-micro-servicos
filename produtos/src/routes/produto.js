const express = require("express")
const router = express.Router()
const Produto = require("../models/produto")
// /produtos

router.post("/", async (req, res) => {
    const dados = req.body

    try{
        const novoProduto = new Produto(dados)
        const produtoSalvo = await novoProduto.save()

        res.status(201).send(produtoSalvo)
    }catch(err){
        res.status(500).send({ mensagem: "Erro ao criar produto"})
    }
})

router.get("/", async (req, res) => {
    try{
        const produtoEncontrado = await Produto.find()
        if(!produtoEncontrado){
            return res.status(404).send("Nenhum produto não encontrado")
        }

        res.send(produtoEncontrado)
    }catch(err){
        res.status(500).send({ mensagem: "Erro ao listar produtos"})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params
        const produtoEncontrado = await Produto.findById(id)
        if(!produtoEncontrado){
            return res.status(404).send("Produto não encontrado")
        }

        res.send(produtoEncontrado)
    }catch(err){
        res.status(500).send({ mensagem: "Erro ao retornar produto"})
    }
})

router.patch("/:id", async (req, res) => {
    const dados = req.body

    try{
        const {id} = req.params
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, dados)
        if(!produtoAtualizado){
            return res.status(404).send("Produto não encontrado")
        }

        res.send("Produto atualizado com sucesso")
    }catch(err){
        res.status(500).send({ mensagem: "Erro ao atualizar produto"})
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const {id} = req.params
        const produtoExcluido = await Produto.findByIdAndDelete(id)
        if(!produtoExcluido){
            return res.status(404).send("Produto não encontrado")
        }

        res.send("Produto deletado com sucesso")
    }catch(err){
        res.status(500).send({ mensagem: "Erro ao deletar produto"})
    }
})

module.exports = router