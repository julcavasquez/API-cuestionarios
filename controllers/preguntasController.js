const Preguntas = require('../models/preguntasModel');

exports.guardarPreguntas = async (req, res) => {
  try {
    const { cuestionarioId, preguntas } = req.body;

    if (!cuestionarioId || !preguntas || preguntas.length === 0) {
      return res.status(400).json({ message: "Faltan datos para guardar" });
    }

    for (const p of preguntas) {
      // Guardar la pregunta
      const preguntaId = await Preguntas.crearPregunta(cuestionarioId, p.enunciado,p.feedback,p.tipo);

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
};

exports.obtenerPreguntas = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Preguntas.obtenerPorCuestionario(id);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al obtener preguntas", error });
  }
};
