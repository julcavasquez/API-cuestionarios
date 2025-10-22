//const Preguntas = require('../models/preguntasModel');
import Preguntas from '../models/preguntasModel.js';

const preguntasController = {
guardarPreguntas : async (req, res) => {
  try {
    const { preguntas } = req.body;
    console.log(req.body);
    if (preguntas.length === 0) {
      return res.status(400).json({ message: "Faltan datos para guardar" });
    }

    for (const p of preguntas) {
      // Guardar la pregunta
      const preguntaId = await Preguntas.crearPregunta(p.id_tema, p.enunciado,p.feedback,p.tipo);

      // Guardar sus opciones
      for (const op of p.opciones) {
        await Preguntas.crearOpcion(
          preguntaId,
          op.texto,
          op.es_correcta
        );
      }
    }

    res.json({ message: "✅ Preguntas guardadas correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al guardar preguntas", error });
  }
},

obtenerPreguntas : async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Preguntas.obtenerPorCuestionario(id);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al obtener preguntas", error });
  }
},

 listPpreguntas : async (req, res) => {
   try {
    const results = await Preguntas.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

obtenerPreguntasxConfig : async (req, res) => {
  try {
    const seleccion = req.body;    
    console.log(seleccion);
    let preguntasFinal = [];

    for (const item of seleccion) {
      const [rows] = await Preguntas.getPreguntasxConfig(item.id_tema,item.cantidad);
       console.log([rows]);

      // 🔹 Agrupar filas en estructura {pregunta, opciones:[]}
      const preguntasMap = {};

      rows.forEach(r => {
        if (!preguntasMap[r.id_pregunta]) {
          preguntasMap[r.id_pregunta] = {
            id_pregunta: r.id_pregunta,
            id_tema: r.id_tema,
            enunciado_pregunta: r.enunciado_pregunta,
            tipo_pregunta: r.tipo_pregunta,
            feedback_pregunta: r.feedback_pregunta,
            puntaje_pregunta: r.puntaje_pregunta,
            opciones: []
          };
        }
        preguntasMap[r.id_pregunta].opciones.push({
          id_opcion: r.id_opcion,
          texto_opcion: r.texto_opcion,
          es_correcta: r.es_correcta
        });
      });

      preguntasFinal = preguntasFinal.concat(Object.values(preguntasMap));
    }

    console.log(preguntasFinal);
   
    res.json(preguntasFinal);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
},

eliminarPregunta : async (req, res) => {
  try {
     const { id } = req.params;

    const pregunta = await Preguntas.getById(id);

    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    // Cambiar estado
    await Preguntas.eliminar(id);

    res.json({
      message: "✅ Pregunta marcada como eliminada correctamente",
      id_pregunta: id
    });
  } catch (error) {
    console.error("❌ Error al eliminar pregunta:", error);
    res.status(500).json({ message: "Error al eliminar pregunta" });
  }
},

updateEnunciadoPregunta : async (req, res) => {
  try {
    
    const { id } = req.params;
    const { enunciado_pregunta } = req.body;

    console.log(id);
    console.log(enunciado_pregunta);
    const pregunta = await Preguntas.getById(id);



    if (!pregunta) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }

    // Cambiar estado
    await Preguntas.updateEnunciado(id,enunciado_pregunta);

    res.json({
      message: "✅ Enunciado actualizado correctamente",
      id_pregunta: id
    });
  } catch (error) {
    console.error("❌ Error al actualziar pregunta:", error);
    res.status(500).json({ message: "Error al actualizar pregunta" });
  }
},

}

export default preguntasController