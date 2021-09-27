import { fetchTodos, findTodo, saveTodos } from '../../../lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todo = req.body.todo;
    const todos = fetchTodos();

    const multipleTodos = findTodo(todo?.slug, todos);

    if (multipleTodos?.length === 0) {
      todos.push(todo);
      saveTodos(todos);
      res.status(200).json(todos);
    }
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      data: { message: 'Could not create todo', error },
    });
  }
};

export default handler;
