import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/student.js';
import companyRoutes from './routes/company.js'
import authRouter from './routes/auth.js';
import session from 'express-session';
import passport from './config/passport.js';
import flash from 'connect-flash';
import adminRouter from './routes/admin.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'some-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  next();
});

//Habilitar Pug
app.set('view engine','pug')
app.set('views','./views')

//Carpeta publica
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res) => res.render("layout/main"))

app.use("/", authRouter);

app.use('/students',studentRoutes)

app.use('/companies',companyRoutes)

app.use("/admin", adminRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
