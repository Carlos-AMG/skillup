import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import passport from "passport";

const prisma = new PrismaClient();

passport.use(
  "student-local",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const student = await prisma.student.findUnique({ where: { email } });

      if (!student) {
        return done(null, false, { message: "Email no registrado" });
      }

      const isValidPassword = await bcrypt.compare(password, student.password);

      if (!isValidPassword) {
        return done(null, false, { message: "Contraseña incorrecta" });
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
  "company-local",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const company = await prisma.company.findUnique({ where: { email } });

      if (!company) {
        return done(null, false, { message: "Email no registrado" });
      }

      const isValidPassword = await bcrypt.compare(password, company.password);

      if (!isValidPassword) {
        return done(null, false, { message: "Contraseña incorrecta" });
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
