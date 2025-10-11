//const db = require('../database/conexion');
import db from '../database/conexion.js';
const Preguntas = {

      // Insertar una pregunta
  async crearPregunta(id_tema, enunciado,feedback,tipo) {
    const [result] = await db.query(
      "INSERT INTO preguntas (id_tema,enunciado_pregunta,feedback_pregunta,tipo_pregunta) VALUES (?, ?, ?, ?)",
      [id_tema, enunciado,feedback,tipo]
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

  //LISTAR PPREGUNTAS
  getAll : async () => {
        const [rows] = await db.query(`SELECT p.id_pregunta,p.id_tema,p.enunciado_pregunta,
                    t.nom_tema,p.estado_pregunta FROM preguntas p
                    INNER JOIN temas t ON t.id_tema = p.id_tema
                      WHERE p.estado_pregunta <> 'eliminado'
                      ORDER BY p.id_pregunta`);
          return rows;
      },
    
  //LISTAR PREGUNTAS DEPENDIENDO DE LA CONFIGRUACION
  getPreguntasxConfig : async (id_tema,cantidad) => {
        const [rows] = await db.query(`SELECT 
  p.id_pregunta,
  p.id_tema,
  p.enunciado_pregunta,
  p.tipo_pregunta,
  p.feedback_pregunta,
  p.puntaje_pregunta,
  o.id_opcion,
  o.texto_opcion,
  o.es_correcta
FROM (
  SELECT * 
  FROM preguntas 
  WHERE id_tema = ? AND estado_pregunta !='eliminado'
  ORDER BY RAND() 
  LIMIT ?
) AS p
INNER JOIN opciones o ON p.id_pregunta = o.id_pregunta`,
                  [id_tema, cantidad]);
          return [rows];
      },

      // Obtener una pregunta específica
  getById: async (id_pregunta) => {
    const [rows] = await db.query(`SELECT * FROM preguntas WHERE id_pregunta = ?`, 
      [id_pregunta]);
    return rows[0];
  },

  // Cambiar estado a eliminado
  eliminar: async (id_pregunta) => {
    const [result] = await db.query(`
      UPDATE preguntas 
      SET estado_pregunta = 'eliminado' 
      WHERE id_pregunta = ?
    `, [id_pregunta]);
    return result;
  },

};

export default Preguntas;

