import express from 'express';
const router = express.Router();
//const controller = require('../controllers/preguntasController');
import preguntasController from '../controllers/preguntasController.js';
// const authMiddleware = require("../middleware/authMiddleware");
import authMiddleware from '../middleware/authMiddleware.js';
// Guardar preguntas
router.post('/register', preguntasController.guardarPreguntas);
router.get('/', preguntasController.listPpreguntas);
router.post('/configuracion', preguntasController.obtenerPreguntasxConfig);
// ✅ Marcar como eliminada
router.put("/eliminar/:id", authMiddleware, preguntasController.eliminarPregunta);
// router.post("/", controller.NvoUsuario);
// router.post("/login", controller.login);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
export default router;