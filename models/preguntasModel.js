const db = require('../database/conexion');

const Preguntas = {

      // Insertar una pregunta
  async crearPregunta(idCuestionario, enunciado,feedback,tipo) {
    const [result] = await db.query(
      "INSERT INTO preguntas (id_cuestionario,enunciado_pregunta,feedback_pregunta,tipo_pregunta) VALUES (?, ?, ?, ?)",
      [idCuestionario, enunciado,feedback,tipo]
    );
    return result.insertId;
  },

  // Insertar opciones de una pregunta
  async crearOpcion(idPregunta, texto_opcion, esCorrecta) {
    await db.query(
      "INSERT INTO opciones (id_pregunta, texto_opcion, es_correcta) VALUES (?, ?, ?)",
      [idPregunta, texto_opcion, esCorrecta]
    );
  },

};

module.exports = Preguntas;

