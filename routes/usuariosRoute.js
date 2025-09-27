import express from 'express';
const router = express.Router();
// const controller = require('../controllers/temasController');
// const authMiddleware = require("../middleware/authMiddleware");
import usuariosController from '../controllers/usuariosController.js';
router.get('/', usuariosController.obtenerUsuarios);
router.post('/register', usuariosController.RegistrarUsuario);

//router.get('/:id', controller.obtenerUsuarioPorId);
// router.post("/", controller.NvoUsuario);
router.post("/login", usuariosController.login);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
export default router;