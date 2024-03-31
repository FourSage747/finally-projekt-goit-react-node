const {Schema, model} = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    token: {
        type: String,
        default: ""
    },
}, { versionKey: false, timestamps: true })

userSchema.post("save", (error, data, next)=>{
    const {name, code} = error
    const status = (name === 'MongoServerError' && code === 11000) ? 409 : 400
    error.status = status
    next()
})

const User = model("user", userSchema)

module.exports = User;