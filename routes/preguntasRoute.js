const express = require('express');
const router = express.Router();
const controller = require('../controllers/preguntasController');
// const authMiddleware = require("../middleware/authMiddleware");

// Guardar preguntas
router.post('/register', controller.guardarPreguntas);
// router.post("/", controller.NvoUsuario);
// router.post("/login", controller.login);
// // Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
module.exports = router;