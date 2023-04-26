import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      if (!email || !password) {
        return done(null, false, { msg: 'Mandatory fields' });
      }

      const student = await prisma.student.findUnique({ where: { email } });

      if (!student) {
        return done(null, false, { msg: 'Incorrect email' });
      }

      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return done(null, false, { msg: 'Incorrect password.' });
      }
      return done(null, student);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((student, done) => {
  done(null, student.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const student = await prisma.student.findUnique({ where: { id } });

    done(null, student);
  } catch (error) {
    done(error);
  }
});
export default passport;
