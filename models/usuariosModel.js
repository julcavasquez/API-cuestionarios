import db from '../database/conexion.js';

const Usuarios = {

      getAll : async () => {
        const [rows] = await db.query(`select u.id_usuario,concat(u.nombres," ",u.apellidos) as nombres,
                u.email,u.rol,u.estado
                from usuarios u
                where u.estado != 'eliminado'`);
          return rows;
      },

      crearUsu : async (name, fullname, email,hashedClave,rol) => {
            console.log("mi nombre"+fullname);
            const [result] = await db.query(
                  `INSERT INTO usuarios (nombres,apellidos,email,clave,rol) VALUES (?, ?, ?, ?, ?)`,
                  [name,fullname,email,hashedClave,rol]
            );
            return { id_usu: result.insertId, name, fullname, email,hashedClave,rol };
      },

      findByEmail : async (email) => {
            const [rows] = await db.query(`SELECT * FROM usuarios WHERE email = ? LIMIT 1`, [email]);
            return rows[0];
      },

      

      
};
export default Usuarios;