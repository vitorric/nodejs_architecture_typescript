// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';

// // const { getUserByEmailRepository } from '../../../repositories/user');
// // const { encrypt, decryptLoginUser } from '../../../utils/crypto');

// passport.use(
//   'user',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       try {
//         const passwordDecrypt = decryptLoginUser({
//           ciphertext: password,
//           nonce: req.body.buffer,
//         });

//         // get the user given the email
//         const user = await getUserByEmailRepository(email);

//         // If not, handle it
//         if (!user) {
//           return done(null, null);
//         }

//         // Check if the password is corret
//         const encryptedPassword = encrypt(passwordDecrypt);
//         const isMatch = encryptedPassword === user.password;

//         // If not, handle it
//         if (!isMatch) {
//           return done(null, null);
//         }

//         if (user.delete || !user.status) {
//           return done(null, false);
//         }

//         // Otherwise, return the cliente
//         done(null, user);
//       } catch (error) {
//         done(error, false);
//       }
//     }
//   )
// );

// export default passport;
