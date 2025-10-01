const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET

// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    })
}

// Register user and sign in 
const register = async (req, res) => {

    const { name, email, password, phone, cpf } = req.body

    try {
        // Check if
        const user = await User.findOne({ email })

        if (user) {
            res.status(409).json({ errors: ["Por favor, utilize outro e-mail"] })
            return
        }

        // Generate password hash
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        // Create user 
        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
            phone,
            cpf
        })

        // If user was created succesfully, return the token
        if (!newUser) {
            res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] })
            return
        }

        res.status(201).json({
            _id: newUser._id,
            token: generateToken(newUser._id)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: ["Houve um erro interno no servidor. Por favor, tente novamente mais tarde."] });
    }


}

// Sign in user
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        // Check if user exists
        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado"] })
            return
        }

        // Check if password matches
        if (!(await bcrypt.compare(password, user.password))) {
            res.status(422).json({ errors: ["A senha inválida."] })
            return;
        }

        // Return user with token
        res.status(201).json({
            _id: user._id,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Ocorreu um erro no servidor, tente novamente mais tarde."] });
    }
}

// Get current logged in user 
const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json(user)
}

module.exports = {
    register,
    login,
    getCurrentUser
}