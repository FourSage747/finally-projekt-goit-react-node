const express = require("express")
const authenticate = require("../helpers/authenticate.js")
const {
  getAllContacts,
  createContact,
} = require("../controllers/contactsControllers.js")

// const isValidId = require("../helpers/validateBody.js")

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

// contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

// contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post("/", authenticate, createContact);

// contactsRouter.put("/:id", authenticate, isValidId, updateContact);

// contactsRouter.patch("/:id/favorite", authenticate, isValidId, updateFavorite);

module.exports = contactsRouter;
