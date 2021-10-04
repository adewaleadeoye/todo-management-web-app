import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import type { NextApiRequest } from 'next';
import { loginUser } from '../../../services/userService';
import UserType from '../../../types/user';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: UserType, req: NextApiRequest) {
        const response = await loginUser(
          credentials.email,
          credentials.password
        );

        // Return null if user data could not be retrieved
        if (response?.error) {
          return null;
        }

        // If no error and we have user data, return it
        return response;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
