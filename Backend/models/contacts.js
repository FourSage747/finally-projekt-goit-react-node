const {Schema, model} = require("mongoose");

const contactSchema = new Schema({   
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    dosage: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    price: {
        type: Number,
    },
    availability: {
        type: Boolean,
    },
    imageURL: {
        type: String,
    }
}, { versionKey: false })

contactSchema.post("save", (error, data, next)=>{
    error.status = 400
    next()
})

const shoppingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    order: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ]
}, { versionKey: false });

shoppingSchema.post("save", (error, data, next)=>{
    error.status = 400
    next()
})

const Contact = model("ptoducts", contactSchema)
const Shopping = model("shopping", shoppingSchema)

module.exports = {
    Contact,
    Shopping
};