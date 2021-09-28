import withSession from '../../../lib/session';
import { fetchUsers, findUser } from '../../../lib/api';

export default withSession(async (req: any, res: any) => {
  const { email, password } = await req.body;
  try {
    const users = fetchUsers();
    const user = findUser(email, password, users);
    if (user.length === 0) throw 'Incorrect login details provided';
    req.session.set('user', { ...user[0], isLoggedIn: true });
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});
