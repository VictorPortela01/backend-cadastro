const { body } = require('express-validator')

// Função para validar CPF
function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "") // remove pontos e traços

    if (!cpf || cpf.length !== 11) return false

    // Elimina CPFs inválidos conhecidos
    if (/^(\d)\1{10}$/.test(cpf)) return false

    let soma = 0
    let resto

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(9, 10))) return false

    soma = 0
    // Segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(10, 11))) return false

    return true
}

const userCreateValidation = () => {
    return [
        body("name")
            .trim()
            .escape()
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres"),
        body("email")
            .trim()
            .isString()
            .withMessage("O E-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({ min: 5 })
            .withMessage("A senha precisa ter no mínimo 5 caracteres"),
        body("confirmPassword")
            .isString()
            .withMessage("A confirmação da senha é obrigatória")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas não são iguais")
                }
                return true
            }),
        body("phone")
            .notEmpty().withMessage("O número de telefone")
            .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/).withMessage('Formato inválido. Use (xx) xxxxx-xxxx'),
        body("cpf")
            .notEmpty().withMessage("O CPF é obrigatório.")
            .isString()
            .custom((value) => {
                if (!isValidCPF(value)) {
                    throw new Error("CPF inválido")
                }
                return true
            }),
    ]
}

const loginValidation = () => {
    return [
        body("email")
            .isString().withMessage("O e-mail é obrigatório")
            .isEmail().withMessage("Insira um E-mail válido."),
        body("password")
            .isString().withMessage("A senha é obrigatória")
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation

}

