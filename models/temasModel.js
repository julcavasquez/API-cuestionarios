//const db = require('../database/conexion');
import db from '../database/conexion.js';
const Temas = {

      getAllCompetencias : async () => {
        const [rows] = await db.query("SELECT * FROM competencias");
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
                        t.cod_tema,
                        t.descripcion_tema,
                        t.estado_tema,
                        COUNT(p.id_pregunta) AS total_preguntas
                        FROM temas t
                        LEFT JOIN preguntas p ON t.id_tema = p.id_tema
                        WHERE t.estado_tema != 'eliminado' AND p.estado_pregunta != 'eliminado'
                        GROUP BY t.id_tema, t.cod_tema`);
          return rows;
      },

      

      getAllSubCompetencias: async (id_competencia) => {
      const [rows] = await db.query(`
            SELECT 
            c.id_competencia,
            c.nom_competencia,
            sc.id_sub_compe,
            sc.cod_sub_compe,
            sc.descripcion_sub_compe,
            t.id_tema,
            t.cod_tema,
            t.descripcion_tema,
            COUNT(p.id_pregunta) AS total_preguntas
            FROM competencias c
            JOIN sub_competencias sc ON sc.id_competencia = c.id_competencia
            JOIN temas t ON t.id_sub_compe = sc.id_sub_compe
            LEFT JOIN preguntas p ON p.id_tema = t.id_tema
            WHERE c.id_competencia = ?
            AND c.estado_competencia = 'activo'
            AND sc.estado_sub_compe = 'activo'
            AND t.estado_tema = 'activo'
            GROUP BY 
            c.id_competencia,
            sc.id_sub_compe,
            t.id_tema
            ORDER BY 
                  CAST(SUBSTRING_INDEX(sc.cod_sub_compe, '.', 1) AS UNSIGNED),
			CAST(SUBSTRING_INDEX(sc.cod_sub_compe, '.', -1) AS UNSIGNED),
			CAST(SUBSTRING_INDEX(t.cod_tema, '.', -1) AS UNSIGNED);`, [id_competencia]);
      return rows;
      },

      getAllSubCompetenciasxCompe: async (id_competencia) => {
      const [rows] = await db.query(`
            SELECT id_sub_compe, cod_sub_compe, descripcion_sub_compe 
            FROM sub_competencias 
            WHERE id_competencia = ? AND estado_sub_compe = 'activo';`, [id_competencia]);
      return rows;
      },

      getAllTemasxSubCompe: async (idSub) => {
      const [rows] = await db.query(`
            SELECT id_tema, cod_tema, descripcion_tema 
            FROM temas 
            WHERE id_sub_compe = ? AND estado_tema = 'activo';`, [idSub]);
      return rows;
      }


};

export default Temas;