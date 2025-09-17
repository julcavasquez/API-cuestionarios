import express from 'express';
const router = express.Router();
// const controller = require('../controllers/temasController');
// const authMiddleware = require("../middleware/authMiddleware");
import TemasController from '../controllers/temasController.js';
router.get('/', TemasController.obtenerTemas);
//router.get('/:id', controller.obtenerUsuarioPorId);
// router.post("/", controller.NvoUsuario);
// router.post("/login", controller.login);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
export default router;