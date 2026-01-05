import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import {createGuest, getGuest} from './data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized: ({auth, req}) => {
      return !!auth?.user;
    },
    signIn: async ({user}) => {
      try {
        const guest = await getGuest(user.email);
        if (!guest) {
          const newGuest = {
            fullName: user.name,
            email: user.email,
          };
          await createGuest(newGuest);
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    session: async ({session, user}) => {
      const guest = await getGuest(session.user.email);
      session.user.id = guest.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: {GET, POST},
} = NextAuth(authConfig);
