
import express from 'express';
const router = express.Router();
import cuestionariosController from '../controllers/cuestionariosController.js';
import authMiddleware from '../middleware/authMiddleware.js';
router.get('/', cuestionariosController.obtenerCuestionarios);
router.get('/:id', authMiddleware,cuestionariosController.obtenerCuestionarioPorId);
router.get('/:id/opciones', authMiddleware,cuestionariosController.obtenerCuestionarioCompleto);
// router.post("/", controller.NvoUsuario);
router.post("/register", cuestionariosController.RegistrarCuestionario);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
export default router;