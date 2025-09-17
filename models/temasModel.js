//const db = require('../database/conexion');
import db from '../database/conexion.js';
const Temas = {

      getAll : async () => {
        const [rows] = await db.query("SELECT * FROM temas");
          return rows;
      }

};

export default Temas;