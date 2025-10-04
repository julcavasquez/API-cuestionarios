// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
import Cuestionarios from '../models/cuestionariosModel.js';


const cuestionariosController = {
    obtenerCuestionarios : async (req, res) => {
        try {
          const results = await Cuestionarios.getAll();
          res.json(results);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    },

    obtenerCuestionarioPorId : async (req, res) => {
      const id = req.params.id;
      try{
            const result = await Cuestionarios.getCuestionarioId(id);
            console.log(result);
            if(result.length === 0){
                return res.status(404).json({ message: 'Cuestionario no encontrado' });
            }else{
                res.json(result[0]);
            }
        } catch (err){
            res.status(500).json({ error: err.message });
        }
},
    obtenerCuestionarioCompleto : async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await Cuestionarios.getOpcionesPregunta(id);
    console.log(rows);
    // // Agrupar datos
    // const cuestionario = {
    //   id_cuestionario: rows[0]?.id_cuestionario,
    //   titulo_cuestionario: rows[0]?.titulo_cuestionario,
    //   descripcion_cuestionario: rows[0]?.descripcion_cuestionario,
    //   preguntas: []
    // };

    // let preguntasMap = {};

    // rows.forEach(r => {
    //   if (!preguntasMap[r.id_pregunta]) {
    //     preguntasMap[r.id_pregunta] = {
    //       id_pregunta: r.id_pregunta,
    //       enunciado_pregunta: r.enunciado_pregunta,
    //       tipo_pregunta: r.tipo_pregunta,
    //       feedback_pregunta: r.feedback_pregunta,
    //       opciones: []
    //     };
    //     cuestionario.preguntas.push(preguntasMap[r.id_pregunta]);
    //   }

    //   if (r.id_opcion) {
    //     preguntasMap[r.id_pregunta].opciones.push({
    //       id_opcion: r.id_opcion,
    //       texto_opcion: r.texto_opcion,
    //       es_correcta: r.es_correcta
    //     });
    //   }
    // });

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
RegistrarCuestionario : async (req, res) => {
   try {
      const {titulo_cuestionario,descripcion_cuestionario,id_tema,id_usu } = req.body;
      // 1. Encriptar password con bcrypt
      console.log(req.body);
      if (!titulo_cuestionario || !descripcion_cuestionario || !id_tema || !id_usu) {
          return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      
      // crear usuario
      const newTema = await Cuestionarios.creaCuestionario(
        titulo_cuestionario,
        descripcion_cuestionario,
        id_tema,
        id_usu
      );

      // No devolver el hash en la respuesta
      return res.status(201).json({
        message: 'Cuestionario registrado'});

      

  } catch (err) {
     console.error('Error register cuestionario:', err);
     return res.status(500).json({ message: 'Error al crear Cuestionario', error: err.message });
  }
},
}

export default cuestionariosController




