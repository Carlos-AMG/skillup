import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import passport from "passport";

const prisma = new PrismaClient();

passport.use(
  "students-local",
  new LocalStrategy({ usernameField: "email", passReqToCallback: true}, async (req,email, password, done) => {
    try { 
      const student = await prisma.student.findUnique({ where: { email } });

      if (!student) {
        return done(null, false,  req.flash('error', 'Email no registrado'));
      }

      const isValidPassword = await bcrypt.compare(password, student.password);

      if (!isValidPassword) {
        return done(null, false, req.flash('error', 'Contraseña incorrecta'));
      }

      const user = {
        ...student,
        userType: "student",
      };

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  "companies-local",
  new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req,email, password, done) => {
    try {
      const company = await prisma.company.findUnique({ where: { email } });

      if (!company) {
        return done(null, false, req.flash('error', 'Email no registrado'));
      }

      const isValidPassword = await bcrypt.compare(password, company.password);

      if (!isValidPassword) {
        return done(null, false, req.flash('error', 'Contraseña incorrecta'));
      }

      if(!company.verified){
        return done(null, false, req.flash('error', 'Account not verified'));
      }
      const user = {
        ...company,
        userType: "company",
      };

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, userType: user.userType });
});

passport.deserializeUser(async ({ id, userType }, done) => {
  try {
    const user =
      userType === "student"
        ? await prisma.student.findUnique({ where: { id } })
        : await prisma.company.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
