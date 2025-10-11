import express from "express";
import triviaController from "../controllers/triviaController.js";
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/dia", authMiddleware, triviaController.obtenerTriviaDelDia);
//router.post("/responder", authMiddleware);

export default router;