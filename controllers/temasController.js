// const Temas = require('../models/temasModel');
import Temas from '../models/temasModel.js';
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const temasController = {
  obtenerTemas : async (req, res) => {
   try {
    const results = await Temas.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
}

export default temasController


