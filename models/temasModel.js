//const db = require('../database/conexion');
import db from '../database/conexion.js';
const Temas = {

      getAll : async () => {
        const [rows] = await db.query("SELECT * FROM temas");
          return rows;
      },

      creaTema : async (nombre_tema,descripcion_tema) => {
            console.log("mi nombre"+nombre_tema);
            const [result] = await db.query(
                  `INSERT INTO temas (nom_tema,descripcion_tema) 
                    VALUES (?,?);`,
                  [nombre_tema,descripcion_tema]
            );
            return { id_tema: result.insertId};
      },

      getAllTemasCantidad : async () => {
        const [rows] = await db.query(`SELECT 
                        t.id_tema,
                        t.nom_tema,
                        t.descripcion_tema,
                        t.estado_tema,
                        COUNT(p.id_pregunta) AS total_preguntas
                        FROM temas t
                        LEFT JOIN preguntas p ON t.id_tema = p.id_tema
                        WHERE t.estado_tema != 'eliminado' AND p.estado_pregunta != 'eliminado'
                        GROUP BY t.id_tema, t.nom_tema`);
          return rows;
      },


};

export default Temas;