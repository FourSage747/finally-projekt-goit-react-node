const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
// const gravatar = require("gravatar")
// const path = require("path")
// const fs = require("fs/promises")
// const Jimp = require("jimp")
const dotenv = require("dotenv")

dotenv.config()


const {SECRET_KEY} = process.env


const HttpError = require("../helpers/HttpError")
const {
    registerSchema,
    loginSchema,
} = require("../schemas/authSchemas")

const register = async(req, res, next) => {
    try {
        const {error} = registerSchema.validate(req.body)
        const {email, password} = req.body
        if(error){
            throw HttpError(400, error.message)
        }
        const user = await User.findOne({email})
        if(user){
            throw HttpError(409, "Email in use")
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({...req.body, password: hashPassword})
        res.status(201).json({
            user: {
                email: newUser.email,
            }
        })
    }
    catch(error) {
        next(error)
    }
}

const login = async(req, res, next) => {
    try {
        const {error} = loginSchema.validate(req.body)
        const {email, password} = req.body
        if(error){
            throw HttpError(400, error.message)
        }
        const user = await User.findOne({email})
        if(!user){
            throw HttpError(401, "Email is wrong")
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            throw HttpError(401, "Password is wrong")
        }
        
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
        await User.findByIdAndUpdate(user._id, {token})
        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        })
    }
    catch(error) {
        next(error)
    }
}

const logout = async(req, res, next) => {
    try {
        const {_id} = req.user
        await User.findByIdAndUpdate(_id, {token: ""})
        res.status(204).json()
    }
    catch(error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
    logout,
}