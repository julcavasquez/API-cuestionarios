// const Temas = require('../models/temasModel');
import Temas from '../models/temasModel.js';
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const temasController = {
  obtenerCompetencias : async (req, res) => {
   try {
    const results = await Temas.getAllCompetencias();
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

obtenerTemasCantidadPreguntas : async (req, res) => {
   try {
    const results = await Temas.getAllTemasCantidad();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

  obtenerDetalleCompe: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Temas.getAllSubCompetencias(id);
      res.json(data);
    } catch (error) {
      console.error('Error obteniendo detalle de competencia:', error);
      res.status(500).json({ message: 'Error al obtener detalle de competencia', error });
    }
  },

   obtenerSubCompexCompe: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Temas.getAllSubCompetenciasxCompe(id);
      res.json(data);
    } catch (error) {
      console.error('Error obteniendo Sub Competencias', error);
      res.status(500).json({ message: 'Error al obtener Sub Competencias', error });
    }
  },

  obtenerTemasxSubCompe: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Temas.getAllTemasxSubCompe(id);
      res.json(data);
    } catch (error) {
      console.error('Error obteniendo Temas x Sub Competencias', error);
      res.status(500).json({ message: 'Error al obtener Temas x Sub Competencias', error });
    }
  },

}

export default temasController


