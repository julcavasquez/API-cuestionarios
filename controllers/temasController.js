const Temas = require('../models/temasModel');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

exports.obtenerTemas = async (req, res) => {
   try {
    const results = await Temas.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


