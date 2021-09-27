import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTodo, fetchTodos, updateTodo } from '../../../lib/api';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug;
  if (req.method === 'DELETE') {
    try {
      const todoDeleted = deleteTodo(slug);
      if (todoDeleted) {
        const todos = fetchTodos();
        return res.status(200).json(todos);
      }
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        data: { message: 'Could not delete todo', error },
      });
    }
  } else if (req.method === 'PUT') {
    try {
      const todo = req.body.todo;
      const todos = updateTodo(todo);
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        data: { message: 'Could not delete todo', error },
      });
    }
  }
};

export default handler;
