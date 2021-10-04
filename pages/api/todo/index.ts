import { fetchTodos, findTodo, saveTodos } from '../../../lib/api';
import { NextApiRequest, NextApiResponse } from 'next';
import verifyNextAuthCsrfToken from '../../../lib/csrf';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todo = req.body.todo;

    const csrfToken: any = req.headers['x-csrf-token'];
    const isCsrfValid = verifyNextAuthCsrfToken(req, csrfToken);
    if (!isCsrfValid)
      return res.status(403).json({ error: 'Operation is forbidden' });

    const todos = fetchTodos();
    const multipleTodos = findTodo(todo?.slug, todos);

    if (multipleTodos?.length === 0) {
      todos.push(todo);
      saveTodos(todos);
      res.status(200).json(todos);
    } else {
      throw 'The Todo item could not be added';
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
