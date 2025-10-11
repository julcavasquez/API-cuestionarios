import Trivia from '../models/triviaModel.js';

const triviaController = {

    obtenerTriviaDelDia : async (req, res) => {
    try {
        const idUsuario = req.user?.id; // viene del token JWT
        const triviaData = await Trivia.getTriviaDia();
       
        if (!triviaData.length) {
        return res.status(404).json({ message: "No hay trivia para hoy" });
        }

        const trivia = {
        id_trivia: triviaData[0].id_trivia,
        id_pregunta: triviaData[0].id_pregunta,
        enunciado_pregunta: triviaData[0].enunciado_pregunta,
        tipo_pregunta: triviaData[0].tipo_pregunta,
        feedback_pregunta: triviaData[0].feedback_pregunta,
        opciones: triviaData.map(o => ({
            id_opcion: o.id_opcion,
            texto_opcion: o.texto_opcion,
            es_correcta: !!o.es_correcta,
        })),
        yaRespondida: false,
        opcionSeleccionada: null,
        correcta: null
        };

        // ✅ Verificar si ya respondió
        if (idUsuario) {
        const resp = await Trivia.getVerificarSiRespondio(idUsuario);

        if (resp.length) {
            trivia.yaRespondida = true;
            trivia.opcionSeleccionada = resp[0].id_opcion;
            trivia.correcta = resp[0].es_correcta;
        }
        }

        res.json(trivia);
    } catch (error) {
        console.error("❌ Error al obtener trivia:", error);
        res.status(500).json({ message: "Error al obtener trivia del día" });
    }
    },

}

export default triviaController
