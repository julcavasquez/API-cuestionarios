import db from '../database/conexion.js';
const Trivia = {
        getTriviaDia : async () => {
        const [rows] = await db.query(`SELECT t.id_trivia, p.id_pregunta, p.enunciado_pregunta, p.tipo_pregunta, 
             p.feedback_pregunta, o.id_opcion, o.texto_opcion, o.es_correcta
            FROM trivia_dia t
            JOIN preguntas p ON t.id_pregunta = p.id_pregunta
            JOIN opciones o ON p.id_pregunta = o.id_pregunta
            WHERE t.fecha_trivia = CURDATE()`);
          return rows;
      },

       getVerificarSiRespondio : async (idUsuario) => {
        const [rows] = await db.query(`SELECT r.id_opcion, r.es_correcta
         FROM trivia_respuestas r
         JOIN trivia_dia t ON r.id_trivia = t.id_trivia
         WHERE r.id_usuario = ? AND t.fecha_trivia = CURDATE()`,
        [idUsuario]);
          return rows;
      },

}

export default Trivia;