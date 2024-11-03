const bcrypt = require("bcrypt")

const encriptar = (senha) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) 
                reject(err)

            bcrypt.hash(senha, salt, (err, hash) => {
                if (err)
                    reject(err)
                
                resolve(hash)
            })
        })
    })
}

const comparar = (senha, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(senha, hash, (err, ehIgual) => {
            if (err)
                reject(err)

            resolve(ehIgual)
        })
    })
}

module.exports = {
    encriptar,
    comparar
}