import TodoType from '../types/todo';

export const addTodoItem = async (todo: TodoType) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo: { ...todo } }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/todo`,
    requestOptions
  );

  if (!response.ok) {
    throw new Error('Add Todo Failed ');
  }

  return await response.json();
};

export const updateTodoItem = async (todo: TodoType) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo: { ...todo } }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/todo/${todo.slug}`,
    requestOptions
  );

  if (!response.ok) {
    throw new Error('Todo Update Failed');
  }

  return await response.json();
};

export const deleteTodoItem = async (slug: string) => {
  const requestOptions = {
    method: 'DELETE',
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/todo/${slug}`,
    requestOptions
  );

  if (!response.ok) {
    throw new Error('Delete Failed ');
  }

  return await response.json();
};
