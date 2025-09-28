import db from '../database/conexion.js';
const Cuestionarios = {

      getAll : async () => {
        const [rows] = await db.query(`SELECT c.id_cuestionario,c.titulo_cuestionario,
            c.descripcion_cuestionario,
            t.nom_tema,c.estado_cuestionario FROM cuestionarios c INNER JOIN
            temas t ON c.id_tema=t.id_tema
            WHERE c.estado_cuestionario != 'eliminado'`);
          return rows;
      },

      getCuestionarioId: async (id) => {
        const [rows] = await db.query(`SELECT c.id_cuestionario,c.titulo_cuestionario,
            c.descripcion_cuestionario,c.tiene_preguntas,
            t.nom_tema,c.estado_cuestionario FROM cuestionarios c INNER JOIN
            temas t ON c.id_tema=t.id_tema
            WHERE c.id_cuestionario = ? AND c.estado_cuestionario != 'eliminado'`,[id]);
          return rows;
      },

      getCuestionarioCompleto: async (id) => {
        const [rows] = await db.query(
          `SELECT c.id_cuestionario,c.titulo_cuestionario,
            c.descripcion_cuestionario,
            t.nom_tema,c.estado_cuestionario,
            p.id_pregunta,p.enunciado_pregunta,p.feedback_pregunta,p.tipo_pregunta,
            o.id_opcion,o.texto_opcion,o.es_correcta
            FROM cuestionarios c 
            INNER JOIN temas t ON c.id_tema=t.id_tema
            INNER JOIN preguntas p ON p.id_cuestionario = c.id_cuestionario
            INNER JOIN opciones o ON o.id_pregunta = p.id_pregunta
            WHERE c.id_cuestionario = ? AND c.estado_cuestionario != 'eliminado'
            ORDER BY p.id_pregunta,o.id_opcion;`,
          [id]
        );
        return rows;
      },

      creaCuestionario : async (titulo_cuestionario,descripcion_cuestionario,id_tema,id_usu) => {
            console.log("mi nombre"+titulo_cuestionario);
            const [result] = await db.query(
                  `INSERT INTO cuestionarios (titulo_cuestionario, descripcion_cuestionario,
                    id_tema,id_usu) 
                    VALUES(?,?,?,?);;`,
                  [titulo_cuestionario,descripcion_cuestionario,id_tema,id_usu]
            );
            return { id_cuestionario: result.insertId};
      },


};
export default Cuestionarios;