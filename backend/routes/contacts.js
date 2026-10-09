const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// GET /api/contacts?search=text  -> list all contacts (optional search)
router.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search && search.trim()) {
      const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter = { $or: [{ name: regex }, { phone: regex }, { email: regex }] };
    }
    const contacts = await Contact.find(filter).sort({ name: 1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

// GET /api/contacts/:id -> single contact
router.get("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

// POST /api/contacts -> create contact
router.post("/", async (req, res, next) => {
  try {
    const { name, phone, email, address } = req.body;
    const contact = await Contact.create({ name, phone, email, address });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

// PUT /api/contacts/:id -> update contact
router.put("/:id", async (req, res, next) => {
  try {
    const { name, phone, email, address } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, address },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/contacts/:id -> delete contact
router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully", id: req.params.id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
