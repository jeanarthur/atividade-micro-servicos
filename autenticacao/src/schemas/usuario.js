const {z} = require("zod")

const usuarioSchema = z.object({
    nome: z.string({message: "Campo obrigatório"}).min(3, "Mínimo 3 caracteres"),
    email: z.string({message: "Campo obrigatório"}).email("Email inválido"),
    senha: z.string({message: "Campo obrigatório"}).min(6, "Mínimo 6 caracteres"),
})

module.exports = usuarioSchema