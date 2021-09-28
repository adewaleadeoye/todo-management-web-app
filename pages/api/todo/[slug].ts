import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTodo, fetchTodos, updateTodo } from '../../../lib/api';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug;
  try {
    if (req.method === 'DELETE') {
      const todoDeleted = deleteTodo(slug);
      if (todoDeleted) {
        const todos = fetchTodos();
        return res.status(200).json(todos);
      } else {
        throw 'The Todo item could not be deleted';
      }
    } else if (req.method === 'PUT') {
      const todo = req.body.todo;
      const todos = updateTodo(todo);
      return res.status(200).json(todos);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
