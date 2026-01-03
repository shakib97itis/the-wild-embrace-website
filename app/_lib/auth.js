import {ca} from 'date-fns/locale';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

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
  },
};

export const {
  auth,
  handlers: {GET, POST},
} = NextAuth(authConfig);
