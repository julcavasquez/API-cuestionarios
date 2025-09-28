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
},

RegistrarTema : async (req, res) => {
   try {
      const {nombre_tema,descripcion_tema } = req.body;
      // 1. Encriptar password con bcrypt
      console.log(req.body);
      if (!nombre_tema || !descripcion_tema) {
          return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      
      // crear usuario
      const newTema = await Temas.creaTema(
        nombre_tema,
        descripcion_tema
      );

      // No devolver el hash en la respuesta
      return res.status(201).json({
        message: 'Tema registrado'});

      

  } catch (err) {
     console.error('Error register tema:', err);
     return res.status(500).json({ message: 'Error al crear Tema', error: err.message });
  }
},
}

export default temasController


