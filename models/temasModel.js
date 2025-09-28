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


};

export default Temas;