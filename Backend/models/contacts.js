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
}, { versionKey: false })

contactSchema.post("save", (error, data, next)=>{
    error.status = 400
    next()
})

const Contact = model("ptoducts", contactSchema)

module.exports = Contact;