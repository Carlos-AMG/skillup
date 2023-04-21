import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/student.js';
import companyRoutes from './routes/company.js'
import authRouter from './routes/auth.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Habilitar Pug

app.set('view engine','pug')
app.set('views','./views')

//Carpeta publica
app.use(express.static(path.join(__dirname, 'public')));


app.use("/", authRouter);
// app.get('/',authRouter)

app.use('/student',studentRoutes)
app.get('/student',studentRoutes);

app.use('/company',companyRoutes)
app.get('/company',companyRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
