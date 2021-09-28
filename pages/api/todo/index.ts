import { fetchTodos, findTodo, saveTodos } from '../../../lib/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { csrf } from '../../../lib/csrf';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todo = req.body.todo;
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
