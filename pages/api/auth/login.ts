// import withSession from '../../../lib/session';
import { fetchUsers, findUser } from '../../../lib/api';

const handler = async (req: any, res: any) => {
  const { email, password } = await req.body;
  try {
    const users = fetchUsers();
    const user = findUser(email, password, users);
    if (user.length === 0) throw 'Incorrect login details provided';
    const { ['password']: omitted, ...rest } = user[0]; //remove password
    res.status(200).json({ ...rest, isLoggedIn: true });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
