import express from 'express';
const router = express.Router();
//const controller = require('../controllers/preguntasController');
import preguntasController from '../controllers/preguntasController.js';
// const authMiddleware = require("../middleware/authMiddleware");

// Guardar preguntas
router.post('/register', preguntasController.guardarPreguntas);
// router.post("/", controller.NvoUsuario);
// router.post("/login", controller.login);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
export default router;