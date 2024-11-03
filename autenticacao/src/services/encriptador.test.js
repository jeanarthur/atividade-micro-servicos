const encriptador = require("./encriptador")

const senha = "12345"
let hash = ""

beforeAll(async () => {
    hash = await encriptador.encriptar(senha)
})

test("Senha correta", async () => {
    const resultado = await encriptador.comparar(senha, hash)
    expect(resultado).toBe(true)
})

test("Senha incorreta", async () => {
    const senhaIncorreta = "123"
    const resultado = await encriptador.comparar(senhaIncorreta, hash)
    expect(resultado).toBe(false)
})

test("Hash incorreto", async () => {
    const hashIncorreto = await encriptador.encriptar("123")
    const resultado = await encriptador.comparar(senha, hashIncorreto)
    expect(resultado).toBe(false)
})