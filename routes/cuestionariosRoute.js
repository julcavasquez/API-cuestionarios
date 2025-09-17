const express = require('express');
const router = express.Router();
const controller = require('../controllers/cuestionariosController');
// const authMiddleware = require("../middleware/authMiddleware");

router.get('/', controller.obtenerCuestionarios);
router.get('/:id', controller.obtenerCuestionarioPorId);
router.get('/:id/completo', controller.obtenerCuestionarioCompleto);
// router.post("/", controller.NvoUsuario);
// router.post("/login", controller.login);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
module.exports = router;