import cron from "node-cron";
import db from '../database/conexion.js';

/**
 * Cron Job: selecciona una nueva trivia cada día a medianoche (00:00)
 */
export const iniciarTriviaCron = () => {
  console.log("⏰ Cron job de Trivia configurado...");
// Ejecuta cada 30 segundos para prueba
// cron.schedule("*/30 * * * * *", async () => { ... });
  // Ejecuta todos los días a medianoche
  cron.schedule("*/30 * * * * *", async () => {
    try {
      console.log("🎯 Ejecutando actualización de Trivia del día...");

      // Obtener una pregunta aleatoria
      const [pregunta] = await db.query(`
        SELECT id_pregunta 
        FROM preguntas 
        WHERE estado_pregunta = 'activo'
        ORDER BY RAND()
        LIMIT 1;
      `);

      if (!pregunta.length) {
        console.warn("⚠️ No se encontraron preguntas activas para la trivia.");
        return;
      }

      const idPregunta = pregunta[0].id_pregunta;

      // Insertar la trivia si no existe para hoy
      await db.query(
        `INSERT INTO trivia_dia (id_pregunta,fecha_trivia)
         VALUES (?, CURDATE())
         ON DUPLICATE KEY UPDATE id_pregunta = VALUES(id_pregunta);`,
        [idPregunta]
      );

      console.log(`✅ Trivia del día actualizada con id_pregunta = ${idPregunta}`);
    } catch (error) {
      console.error("❌ Error en el cron de trivia:", error.message);
    }
  });
};
