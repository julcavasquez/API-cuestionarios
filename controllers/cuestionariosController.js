const Cuestionarios = require('../models/cuestionariosModel');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

exports.obtenerCuestionarios = async (req, res) => {
   try {
    const results = await Cuestionarios.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerCuestionarioPorId = async (req, res) => {
  const id = req.params.id;
  try{
        const result = await Cuestionarios.getCuestionarioId(id);
        console.log(id);
        if(result.length === 0){
            return res.status(404).json({ message: 'Cuestionario no encontrado' });
        }else{
            res.json(result[0]);
        }
    } catch (err){
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerCuestionarioCompleto = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await Cuestionarios.getCuestionarioCompleto(id);

    // Agrupar datos
    const cuestionario = {
      id_cuestionario: rows[0]?.id_cuestionario,
      titulo_cuestionario: rows[0]?.titulo_cuestionario,
      descripcion_cuestionario: rows[0]?.descripcion_cuestionario,
      preguntas: []
    };

    let preguntasMap = {};

    rows.forEach(r => {
      if (!preguntasMap[r.id_pregunta]) {
        preguntasMap[r.id_pregunta] = {
          id_pregunta: r.id_pregunta,
          enunciado_pregunta: r.enunciado_pregunta,
          tipo_pregunta: r.tipo_pregunta,
          feedback_pregunta: r.feedback_pregunta,
          opciones: []
        };
        cuestionario.preguntas.push(preguntasMap[r.id_pregunta]);
      }

      if (r.id_opcion) {
        preguntasMap[r.id_pregunta].opciones.push({
          id_opcion: r.id_opcion,
          texto_opcion: r.texto_opcion,
          es_correcta: r.es_correcta
        });
      }
    });

    res.json(cuestionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



