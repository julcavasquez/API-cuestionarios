import db from '../database/conexion.js';
const Cuestionarios = {

      getAll : async () => {
        const [rows] = await db.query(`SELECT c.id_cuestionario,c.titulo_cuestionario,
            c.descripcion_cuestionario,t.cod_tema,
            t.nom_tema,c.estado_cuestionario FROM cuestionarios c INNER JOIN
            temas t ON c.id_tema=t.id_tema
            WHERE c.estado_cuestionario != 'eliminado'`);
          return rows;
      },

      getCuestionarioId: async (id) => {
        const [rows] = await db.query(`SELECT p.id_pregunta,p.id_tema,p.enunciado_pregunta,p.feedback_pregunta,
			      t.descripcion_tema,p.estado_pregunta,p.tipo_pregunta FROM temas t INNER JOIN
            preguntas p ON p.id_tema=t.id_tema
            WHERE p.id_pregunta = ? AND p.estado_pregunta != 'eliminado'`,[id]);
          return rows;
      },

      getOpcionesPregunta: async (id) => {
        const [rows] = await db.query(
          `SELECT o.id_opcion,o.texto_opcion,o.es_correcta
            FROM  temas t 
            INNER JOIN preguntas p ON t.id_tema = p.id_tema
            INNER JOIN opciones o ON o.id_pregunta = p.id_pregunta
            WHERE p.id_pregunta = ? AND p.estado_pregunta != 'eliminado'
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