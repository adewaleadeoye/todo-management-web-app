import { createHash } from 'crypto';
import { NextApiRequest } from 'next';

/**
 * Verify that the token you want to check matches the token in the next-auth cookie
 *
 * Note this verify check has been created based on the code within next-auth: ^3.1.0 future
 * versions might differ
 *
 * @param req
 * @param tokenToCheck
 * @return boolean
 */
const verifyNextAuthCsrfToken = (req: NextApiRequest, tokenToCheck: string) => {
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const csrfMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

  const apiMethod: any = req.method;

  if (!csrfMethods.includes(apiMethod)) {
    // we dont need to check the CSRF if it's not within the method.
    return true;
  }

  try {
    const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://');
    const csrfProp = `${useSecureCookies ? '__Host-' : ''}next-auth.csrf-token`;

    if (req.cookies[csrfProp]) {
      const cookieValue = req.cookies[csrfProp];
      const cookieSplitKey = cookieValue.match('|') ? '|' : '%7C';

      const [csrfTokenValue, csrfTokenHash] = cookieValue.split(cookieSplitKey);

      const generatedHash = createHash('sha256')
        .update(`${tokenToCheck}${secret}`)
        .digest('hex');

      if (csrfTokenHash === generatedHash) {
        // If hash matches then we trust the CSRF token value
        if (csrfTokenValue === tokenToCheck) return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default verifyNextAuthCsrfToken;
