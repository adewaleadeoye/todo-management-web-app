// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

const withSession = (handler) => {
  return withIronSession(handler, {
    password: process.env.NEXT_PUBLIC_CSRF_SECRET, //SECRET_COOKIE_PASSWORD,
    cookieName: 'todo-management-app',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
};

export default withSession;
