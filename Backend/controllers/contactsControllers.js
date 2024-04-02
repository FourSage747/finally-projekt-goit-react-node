const {Contact, Shopping} = require("../models/contacts")
// const Shopping = require("../models/contacts")

const HttpError = require("../helpers/HttpError")
// const {
//     createContactSchema,
//     updateContactSchema,
//     updateFavoriteSchema
// } = require("../schemas/contactsSchemas")

const getAllContacts = async (req, res, next) => {
    try {
        // const {_id: owner} = req.user
        // const {page = 1, limit = 20} = req.query
        // const skip = (page - 1) * limit
        const result = await Contact.find()
        res.json(result)
    }
    catch(error) {
        next(error)
    }
};

const createContact = async (req, res, next) => {
    try {
        // const { _id: ownerId } = req.user;
        const result = await Shopping.create({ ...req.body});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getAllContacts,
    createContact,
}