const usuarioSchema = require("./usuario")

test("Usuário válido", () => {
    const usuario = {
        nome: "Nomesvaldo",
        email: "emailvalido@gmail.com",
        senha: "123456"
    }

    const resultado = usuarioSchema.safeParse(usuario)
    expect(resultado.success).toBe(true)
})

test("Usuário inválido (nome -> Campo obrigatório)", () => {
    const usuario = {
        email: "emailvalido@gmail.com",
        senha: "123456"
    }

    const resultado = usuarioSchema.safeParse(usuario)
    expect(resultado.success).toBe(false)

    const erros = resultado.error.format();
    expect(erros.nome?._errors).toContain("Campo obrigatório")
})

test("Usuário inválido (nome -> Mínimo 3 caracteres)", () => {
    const usuario = {
        nome: "ay",
        email: "emailvalido@gmail.com",
        senha: "123456"
    }

    const resultado = usuarioSchema.safeParse(usuario)
    expect(resultado.success).toBe(false)

    const erros = resultado.error.format();
    expect(erros.nome?._errors).toContain("Mínimo 3 caracteres")
})

test("Usuário inválido (email -> Campo obrigatório)", () => {
    const usuario = {
        nome: "Nomesvaldo",
        senha: "123456"
    }

    const resultado = usuarioSchema.safeParse(usuario)
    expect(resultado.success).toBe(false)

    const erros = resultado.error.format();
    expect(erros.email?._errors).toContain("Campo obrigatório")
})

test("Usuário inválido (email)", () => {
    const usuario = {
        nome: "Nomesvaldo",
        email: "emailinvalidogmail.com",
        senha: "123456"
    }

    const resultado = usuarioSchema.safeParse(usuario)
    expect(resultado.success).toBe(false)

    const erros = resultado.error.format();
    expect(erros.email?._errors).toContain("Email inválido")
})

test("Usuário inválido (senha -> Campo obrigatório)", () => {
    const usuario = {
        nome: "Nomesvaldo",
        email: "emailvalido@gmail.com"
    }

    const resultado = usuarioSchema.safeParse(usuario)
    expect(resultado.success).toBe(false)

    const erros = resultado.error.format();
    expect(erros.senha?._errors).toContain("Campo obrigatório")
})

test("Usuário inválido (senha -> Mínimo 6 caracteres)", () => {
    const usuario = {
        nome: "Nomesvaldo",
        email: "emailvalido@gmail.com",
        senha: "ab"
    }

    const resultado = usuarioSchema.safeParse(usuario)
    expect(resultado.success).toBe(false)

    const erros = resultado.error.format();
    expect(erros.senha?._errors).toContain("Mínimo 6 caracteres")
})