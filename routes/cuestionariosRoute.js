
import express from 'express';
const router = express.Router();
import cuestionariosController from '../controllers/cuestionariosController.js';

router.get('/', cuestionariosController.obtenerCuestionarios);
router.get('/:id', cuestionariosController.obtenerCuestionarioPorId);
router.get('/:id/completo', cuestionariosController.obtenerCuestionarioCompleto);
// router.post("/", controller.NvoUsuario);
router.post("/register", cuestionariosController.RegistrarCuestionario);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
export default router;