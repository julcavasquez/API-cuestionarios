const db = require('../database/conexion');

const Temas = {

      getAll : async () => {
        const [rows] = await db.query("SELECT * FROM temas");
          return rows;
      }

};

module.exports = Temas;