// const express = require('express');
// const cors = require('cors');
const app = express();
// const path = require('path');
// const temasRoute = require('./routes/temasRoute');
// const cuestionariosRoute = require('./routes/cuestionariosRoute');
// const preguntasRoute = require('./routes/preguntasRoute');

import express from 'express';
import cors from 'cors';
import temasRoute from './routes/temasRoute.js';
//import { cuestionariosRoute } from './routes/cuestionariosRoute';
//import { preguntasRoute } from './routes/preguntasRoute';
app.use(cors());
app.use(express.json());


// Rutas

app.use('/api/temas', temasRoute);
//app.use('/api/cuestionarios', cuestionariosRoute);
//app.use('/api/preguntas', preguntasRoute);

export default app;