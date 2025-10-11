// const Temas = require('../models/temasModel');
import Usuarios from '../models/usuariosModel.js';
import bcrypt from 'bcrypt';
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
import jwt  from 'jsonwebtoken';
const JWT_SECRET = "03071593";
const usuariosController = {
  obtenerUsuarios : async (req, res) => {
   try {
    const results = await Usuarios.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

RegistrarUsuario : async (req, res) => {
   try {
      const {name,fullname,email, password, rol } = req.body;
      // 1. Encriptar password con bcrypt
      const hashedClave = await bcrypt.hash(password, 10);
      console.log(req.body);
      if (!name || !fullname || !email || !password || !rol) {
          return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      // validar formato de email sencillo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido' });
      }

      // comprobar si el email ya existe
      const existing = await Usuarios.findByEmail(email.toLowerCase());
      if (existing) {
        return res.status(409).json({ message: 'El correo ya está registrado' });
      }

      // crear usuario
      const newUser = await Usuarios.crearUsu(
        name,
        fullname,
        email.toLowerCase(),
        hashedClave,
        rol
      );

      // No devolver el hash en la respuesta
      return res.status(201).json({
        message: 'Usuario registrado',
        user: { id_usu: newUser.id_usuario, nombre: newUser.name, email: newUser.email, rol: newUser.rol }
      });

      

  } catch (err) {
     console.error('Error register user:', err);
     return res.status(500).json({ message: 'Error al crear usuario', error: err.message });
  }
},

// clave secreta para firmar el token (puede ir en .env)


login : async (req, res) => {
  try {
    const { correo, password } = req.body;
    //console.log(correo);
    // buscar usuario por email
    const user = await Usuarios.findByEmail(correo);
    console.log("usuarios"+user);
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
     console.log("hola x aqui",user);
    // comparar contraseña
    const isMatch = await bcrypt.compare(password, user.clave);
    if (!isMatch) {
      console.log("contraseña incorrecta");
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // generar token
    const token = jwt.sign({ id: user.id_usuario, nom_usu: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(201).json({ message: "Login exitososs", token, userId: user.id_usuario,rol:user.rol,nombres:user.nombres+' '+user.apellidos });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}


}

export default usuariosController
